"use client";

import { useGameStore } from "@/store/useGameStore";
import { motion } from "framer-motion";
import { User, Zap, Terminal, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { user, xp, lang, story, currentLevel } = useGameStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-sans">
        <Navbar />
        <div className="text-center mt-32">
          <h1 className="text-2xl text-gray-400">You must be logged in to view your profile.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 flex items-center gap-4">
            <button 
              onClick={() => window.history.back()} 
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter">
                OPERATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">DATA</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-lg">
                Review your global experience and active parameters on the LogicLynx network.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Card */}
            <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shadow-lg shadow-purple-500/10">
                  <User className="w-8 h-8 text-white/80" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight">{user.name}</h2>
                  <div className="text-sm font-mono text-gray-500 mt-1 uppercase">
                    Status: <span className="text-cyan-400">{user.isGuest ? 'GUEST PROTOCOL' : 'VERIFIED'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold tracking-wide text-gray-300">TOTAL XP</span>
                  </div>
                  <span className="text-2xl font-black text-white">{xp}</span>
                </div>
              </div>
            </div>

            {/* Current Mission Vector */}
            <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
                <Terminal className="w-5 h-5 text-purple-400" />
                Active Vector
              </h3>

              {lang && story ? (
                <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 uppercase font-mono mb-1">LANGUAGE</div>
                        <div className="font-bold text-lg uppercase text-cyan-400">{lang}</div>
                     </div>
                     <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 uppercase font-mono mb-1">STORY MODE</div>
                        <div className="font-bold text-lg uppercase text-purple-400">{story}</div>
                     </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-500 rounded-r-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 font-medium">Clearance Level</span>
                      <span className="font-black text-2xl font-mono text-white">{currentLevel}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-black/20 rounded-xl border border-white/5 border-dashed">
                   <Sparkles className="w-8 h-8 text-gray-600 mb-3" />
                   <div className="text-gray-500 text-sm uppercase tracking-widest text-center">NO ACTIVE<br/>MISSION VECTOR</div>
                </div>
              )}
            </div>

          </div>
        </motion.div>

      </main>
    </div>
  );
}
