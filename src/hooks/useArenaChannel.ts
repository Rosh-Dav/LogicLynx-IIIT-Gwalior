import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ArenaQuestion } from '@/lib/gemini';
import { useGameStore } from '@/store/useGameStore';

export interface ArenaPlayer {
  id: string;
  name: string;
  score: number;
  hasAnsweredCurrent: boolean;
}

export type ArenaState = 'lobby' | 'playing' | 'results';

export function useArenaChannel(roomId: string) {
  const { user } = useGameStore();
  
  const [players, setPlayers] = useState<Record<string, ArenaPlayer>>({});
  const [quizQuestions, setQuizQuestions] = useState<ArenaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState<ArenaState>('lobby');
  const [channel, setChannel] = useState<any>(null);

  // Initialize Channel
  useEffect(() => {
    if (!roomId || !user) return;

    const myId = user.id;
    const myName = user.name || "Unknown Operator";

    const room = supabase.channel(`arena-${roomId}`, {
      config: { broadcast: { ack: false } }
    });

    room.on('broadcast', { event: 'SYNC_PRESENCE' }, (payload) => {
      const { id, name, score } = payload.payload;
      setPlayers((prev) => ({
        ...prev,
        [id]: prev[id] || { id, name, score, hasAnsweredCurrent: false }
      }));
      
      // If we receive a presence request and we are already here, we echo back
      room.send({
        type: 'broadcast',
        event: 'ECHO_PRESENCE',
        payload: { id: myId, name: myName, score: 0 } // Score sync might be out of date if someone joins mid-game, but for now it's fine.
      });
    });

    room.on('broadcast', { event: 'ECHO_PRESENCE' }, (payload) => {
      const { id, name, score } = payload.payload;
      setPlayers((prev) => ({
        ...prev,
        [id]: prev[id] || { id, name, score, hasAnsweredCurrent: false }
      }));
    });

    room.on('broadcast', { event: 'QUIZ_START' }, (payload) => {
      setQuizQuestions(payload.payload.questions);
      setCurrentQuestionIndex(0);
      setGameState('playing');
      setPlayers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach(k => next[k].hasAnsweredCurrent = false);
        return next;
      });
    });

    room.on('broadcast', { event: 'ANSWER_LOCKED' }, (payload) => {
      const { id, isCorrect } = payload.payload;
      // The first correct answer broadcast received wins 10 points
      setPlayers((prev) => {
        const player = prev[id];
        if (!player) return prev;
        
        let newScore = player.score;
        // Check if ANYONE has answered correctly this round
        const alreadyAnsweredCorrectly = Object.values(prev).some(p => p.hasAnsweredCurrent && p.id !== id);
        
        // Very simple logic: first to send a correct answer gets 10 points. 
        if (isCorrect && !alreadyAnsweredCorrectly) {
           newScore += 10;
        }

        return {
          ...prev,
          [id]: { ...player, score: newScore, hasAnsweredCurrent: true }
        };
      });
    });

    room.on('broadcast', { event: 'NEXT_ROUND' }, () => {
      setCurrentQuestionIndex((prev) => prev + 1);
      setPlayers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach(k => next[k].hasAnsweredCurrent = false);
        return next;
      });
    });

    room.on('broadcast', { event: 'END_GAME' }, () => {
      setGameState('results');
    });

    room.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        // Broadcast that we joined
        await room.send({
          type: 'broadcast',
          event: 'SYNC_PRESENCE',
          payload: { id: myId, name: myName, score: 0 }
        });
        
        // Add ourselves locally immediately
        setPlayers((prev) => ({
          ...prev,
          [myId]: { id: myId, name: myName, score: 0, hasAnsweredCurrent: false }
        }));
      }
    });

    setChannel(room);

    return () => {
      supabase.removeChannel(room);
    };
  }, [roomId, user]);

  const emitQuizStart = useCallback((questions: ArenaQuestion[]) => {
    if (!channel) return;
    channel.send({
      type: 'broadcast',
      event: 'QUIZ_START',
      payload: { questions }
    });
    // Update local state directly so the sender doesn't wait
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setGameState('playing');
    setPlayers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach(k => next[k].hasAnsweredCurrent = false);
      return next;
    });
  }, [channel]);

  const emitAnswer = useCallback((isCorrect: boolean) => {
    if (!channel || !user) return;
    channel.send({
      type: 'broadcast',
      event: 'ANSWER_LOCKED',
      payload: { id: user.id, isCorrect }
    });

    setPlayers((prev) => {
        const player = prev[user.id];
        if (!player) return prev;
        let newScore = player.score;
        const alreadyAnsweredCorrectly = Object.values(prev).some(p => p.hasAnsweredCurrent && p.id !== user.id);
        if (isCorrect && !alreadyAnsweredCorrectly) {
           newScore += 10;
        }
        return {
          ...prev,
          [user.id]: { ...player, score: newScore, hasAnsweredCurrent: true }
        };
    });
  }, [channel, user]);

  const emitNextRound = useCallback(() => {
    if (!channel) return;
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      channel.send({ type: 'broadcast', event: 'END_GAME' });
      setGameState('results');
    } else {
      channel.send({ type: 'broadcast', event: 'NEXT_ROUND' });
      setCurrentQuestionIndex((prev) => prev + 1);
      setPlayers((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach(k => next[k].hasAnsweredCurrent = false);
        return next;
      });
    }
  }, [channel, currentQuestionIndex, quizQuestions.length]);

  return {
    players: Object.values(players).sort((a, b) => b.score - a.score),
    gameState,
    quizQuestions,
    currentQuestionIndex,
    emitQuizStart,
    emitAnswer,
    emitNextRound
  };
}
