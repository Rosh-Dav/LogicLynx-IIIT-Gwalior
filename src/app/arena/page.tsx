"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Swords, Plus, LogIn } from "lucide-react";

export default function ArenaLobby() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/arena/${code}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) {
      router.push(`/arena/${roomCode.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500/30">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-24 flex flex-col items-center justify-center min-h-[80vh]">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
            <Swords className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            LOGICLYNX <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ARENA</span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Zero-XP competitive multiplayer. Challenge other operatives to real-time coding trivia generated dynamically by AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Create Room */}
            <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-red-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 relative z-10 text-white">Create Lobby</h2>
              <p className="text-gray-500 text-sm mb-6 relative z-10">Spawn a new instance and invite competitors.</p>
              
              <button 
                onClick={createRoom}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold tracking-widest text-sm uppercase rounded-xl flex items-center justify-center gap-2 transition-colors relative z-10"
              >
                <Plus className="w-4 h-4" /> Initialize Match
              </button>
            </div>

            {/* Join Room */}
            <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-orange-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 relative z-10 text-white">Join Match</h2>
              <p className="text-gray-500 text-sm mb-6 relative z-10">Enter an active lobby code to connect.</p>
              
              <form onSubmit={joinRoom} className="space-y-4 relative z-10">
                <input 
                  type="text" 
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="LOBBY CODE" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 uppercase text-center font-mono tracking-widest text-lg"
                  maxLength={6}
                />
                <button 
                  type="submit"
                  disabled={!roomCode.trim()}
                  className="w-full py-4 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold tracking-widest text-sm uppercase rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogIn className="w-4 h-4" /> Connect
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
