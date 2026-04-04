"use client";

import { useState, use } from "react";
import { Copy, Play, Check, X, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useArenaChannel } from "@/hooks/useArenaChannel";
import { generateArenaQuiz } from "@/lib/gemini";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

export default function ArenaMatchRoom({ params }: { params: Promise<{ roomId: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const roomId = unwrappedParams.roomId.toUpperCase();
  const { user } = useGameStore();

  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    players,
    gameState,
    quizQuestions,
    currentQuestionIndex,
    emitQuizStart,
    emitAnswer,
    emitNextRound
  } = useArenaChannel(roomId);

  const copyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startMatch = async () => {
    setGenerating(true);
    setErrorMsg("");
    try {
      const q = await generateArenaQuiz(5);
      emitQuizStart(q);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to generate AI Quiz. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    const q = quizQuestions[currentQuestionIndex];
    if (!q) return;
    const isCorrect = idx === q.correctIndex;
    emitAnswer(isCorrect);
  };

  // If completely unauthenticated, force them to login via layout or redirect
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <h1 className="text-xl text-gray-500">Connecting to Network Identity...</h1>
      </div>
    );
  }

  // --- LOBBY STATE ---
  if (gameState === "lobby") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500/30 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-6 py-32 flex-1 flex flex-col items-center max-w-4xl">

          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              MATCH LOBBY
            </h1>
            <div className="flex items-center justify-center gap-4 bg-[#111111] border border-white/10 p-4 rounded-xl mx-auto w-fit cursor-pointer hover:border-red-500/30 transition-colors" onClick={copyCode}>
              <span className="text-gray-400 font-mono text-sm uppercase">CODE:</span>
              <span className="text-2xl font-black tracking-[0.2em]">{roomId}</span>
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-500 hover:text-white" />}
            </div>
            {errorMsg && <p className="text-red-500 mt-4 text-sm bg-red-500/10 p-2 rounded">{errorMsg}</p>}
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
              <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-white/5 pb-4">
                Connected Operatives ({players.length})
              </h2>
              <div className="space-y-3">
                {players.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5">
                    <span className="font-bold text-white">{p.name} {p.id === user.id && <span className="text-red-500 text-xs ml-2">(YOU)</span>}</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center">
              <p className="text-gray-500 text-center mb-8">
                When all operatives are ready, the host can initialize the Gemini AI dynamic generation matrix.
              </p>
              <button
                onClick={startMatch}
                disabled={generating || players.length < 1}
                className="w-full py-5 bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-white font-black tracking-widest text-sm uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
              >
                {generating ? "GENERATING AI QUIZ..." : <><Play className="w-5 h-5 fill-current" /> Initialize Match</>}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- PLAYING STATE ---
  if (gameState === "playing") {
    const question = quizQuestions[currentQuestionIndex];
    const myPlayerState = players.find(p => p.id === user.id);
    const hasAnswered = myPlayerState?.hasAnsweredCurrent;
    const isHost = players.length > 0 && players[0]?.id === user.id; // Very rough host check just to let someone click Next

    // Who got it?
    const whoAnsweredThisRound = players.filter(p => p.hasAnsweredCurrent);

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500/30 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-6 py-24 flex-1 flex flex-col max-w-5xl">

          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-sm font-mono text-gray-500 uppercase">Live Arena • {roomId}</h1>
              <div className="text-2xl font-black text-red-500">ROUND {currentQuestionIndex + 1}/{quizQuestions.length}</div>
            </div>
            <div className="flex gap-4">
              {players.map(p => (
                <div key={p.id} className="text-right">
                  <div className="text-xs text-gray-500 uppercase">{p.name}</div>
                  <div className="font-mono font-bold text-lg">{p.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#111111] border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-white mb-10 max-w-3xl">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {question.options.map((opt, i) => {
                let btnStyle = "bg-black/50 border-white/10 hover:border-white/30 text-gray-300 hover:text-white";

                // If the round is OVER (someone answered), reveal the right answer automatically
                if (hasAnswered) {
                  const isCorrectAnswer = i === question.correctIndex;
                  if (isCorrectAnswer) {
                    btnStyle = "bg-green-500/20 border-green-500 text-green-400";
                  } else {
                    btnStyle = "bg-red-500/10 border-red-500/20 text-gray-600 opacity-50";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={hasAnswered}
                    onClick={() => handleSelectAnswer(i)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 font-mono text-lg ${btnStyle}`}
                  >
                    <span className="text-xs uppercase opacity-50 mr-4">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5"
              >
                <div>
                  <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Round Status</div>
                  {whoAnsweredThisRound.length > 0 ? (
                    <div className="text-white font-bold">{whoAnsweredThisRound.map(p => p.name).join(", ")} locked in.</div>
                  ) : "Waiting..."}
                </div>

                {/* Any user can advance technically, but styling it for everyone */}
                <button
                  onClick={emitNextRound}
                  className="px-6 py-3 bg-white text-black font-bold tracking-widest text-sm uppercase rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? "Next Round" : "View Results"} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // --- RESULTS STATE ---
  const winner = players[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500/30 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-6 py-32 flex-1 flex flex-col items-center justify-center">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-xl w-full"
        >
          <Award className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-5xl font-black mb-2 uppercase tracking-tighter text-white">MATCH COMPLETE</h1>
          <p className="text-gray-400 text-lg mb-12">Arena simulation terminated. Final telemetry generated.</p>

          <div className="space-y-4 mb-12">
            {players.map((p, idx) => (
              <div key={p.id} className={`flex items-center justify-between p-6 rounded-2xl border ${idx === 0 ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-[#111111] border-white/5'}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-black ${idx === 0 ? 'text-yellow-500' : 'text-gray-500'}`}>#{idx + 1}</span>
                  <span className="text-xl font-bold uppercase">{p.name} {p.id === user?.id && <span className="text-xs text-red-500 ml-2">(YOU)</span>}</span>
                </div>
                <div className="font-mono text-2xl font-bold">{p.score} <span className="text-xs text-gray-500 tracking-widest">PTS</span></div>
              </div>
            ))}
          </div>

          <button
            onClick={() => router.push('/arena')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold tracking-widest text-sm uppercase rounded-xl transition-colors border border-white/20"
          >
            Leave Arena
          </button>
        </motion.div>

      </main>
    </div>
  );
}
