"use client";

import { useGameStore } from "@/store/useGameStore";
import { motion } from "framer-motion";
import { User, Zap, Terminal, Sparkles, Flame, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const { user, xp, lang, story, currentLevel, streakCount, achievements } = useGameStore();

  const [pythonStats, setPythonStats] = useState({ level: 0, story: '-' });
  const [cStats, setCStats] = useState({ level: 0, story: '-' });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!user || user.isGuest) {
      if (lang === 'python') setPythonStats({ level: currentLevel, story: story || '-' });
      if (lang === 'c') setCStats({ level: currentLevel, story: story || '-' });
      setLoadingStats(false);
      return;
    }

    const fetchProgress = async () => {
      const { data } = await supabase.from('user_progress').select('language, current_level, story').eq('user_id', user.id);
      if (data) {
        const py = data.find((d: any) => d.language === 'python');
        const c = data.find((d: any) => d.language === 'c');
        if (py) setPythonStats({ level: py.current_level, story: py.story });
        if (c) setCStats({ level: c.current_level, story: c.story });
      }
      setLoadingStats(false);
    };
    fetchProgress();
  }, [user, lang, story, currentLevel]);

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
                Review your global experience and language parameters on the LogicLynx network.
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
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-xs tracking-wide text-gray-400 uppercase">TOTAL XP</span>
                  </div>
                  <span className="text-xl font-black text-white">{xp}</span>
                </div>
                
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-bold text-xs tracking-wide text-gray-400 uppercase">STREAK</span>
                  </div>
                  <span className="text-xl font-black text-white">{streakCount}d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Proficiency Vector */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-2xl relative overflow-hidden group flex flex-col">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-wide">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Language Modules
              </h3>

              <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-center">
                {/* Python Row */}
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg uppercase text-blue-400 tracking-tight">PYTHON</div>
                    {pythonStats.level > 0 ? (
                      <div className="text-xs text-gray-500 uppercase font-mono mt-0.5">Mode: {pythonStats.story}</div>
                    ) : (
                      <div className="text-xs text-gray-600 uppercase font-mono mt-0.5">Not Initialized</div>
                    )}
                  </div>
                  {pythonStats.level > 0 ? (
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Max Level</div>
                      <div className="font-black text-2xl font-mono text-white leading-none">{pythonStats.level}</div>
                    </div>
                  ) : (
                    <div className="text-gray-600 font-mono text-sm">--</div>
                  )}
                </div>

                {/* C Row */}
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg uppercase text-indigo-400 tracking-tight">C LANGUAGE</div>
                    {cStats.level > 0 ? (
                      <div className="text-xs text-gray-500 uppercase font-mono mt-0.5">Mode: {cStats.story}</div>
                    ) : (
                      <div className="text-xs text-gray-600 uppercase font-mono mt-0.5">Not Initialized</div>
                    )}
                  </div>
                  {cStats.level > 0 ? (
                    <div className="text-right">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Max Level</div>
                      <div className="font-black text-2xl font-mono text-white leading-none">{cStats.level}</div>
                    </div>
                  ) : (
                    <div className="text-gray-600 font-mono text-sm">--</div>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="md:col-span-2 bg-[#111111] border border-white/5 p-8 rounded-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <h3 className="text-xl font-bold mb-8 flex items-center gap-2 uppercase tracking-wide">
                 <Trophy className="w-5 h-5 text-yellow-500" />
                 Achievements
                 <span className="ml-auto text-[10px] text-gray-600 font-mono tracking-widest">{achievements.length} UNLOCKED</span>
               </h3>

               {achievements.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                   {achievements.map((slug) => (
                     <div key={slug} className="p-4 bg-black/40 rounded-xl border border-yellow-500/10 flex items-center gap-4 group/badge hover:border-yellow-500/30 transition-colors">
                       <div className="w-10 h-10 rounded-lg bg-yellow-500/5 flex items-center justify-center border border-yellow-500/10 group-hover/badge:scale-110 transition-transform">
                         <Trophy className="w-5 h-5 text-yellow-500" />
                       </div>
                       <div>
                         <div className="font-bold text-sm text-white uppercase tracking-tight">{slug.replace(/-/g, ' ')}</div>
                         <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Unlocked</div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center p-12 bg-black/20 rounded-xl border border-white/5 border-dashed">
                    <Trophy className="w-10 h-10 text-white/5 mb-4" />
                    <div className="text-gray-600 text-xs uppercase tracking-[0.3em] text-center">No achievements earned yet.<br/>Complete missions to unlock.</div>
                 </div>
               )}
            </div>

          </div>
        </motion.div>

      </main>
    </div>
  );
}
