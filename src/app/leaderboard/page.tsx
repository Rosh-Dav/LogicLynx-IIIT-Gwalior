"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabaseClient";

interface TopPlayer {
  id: string;
  name: string;
  xp: number;
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<TopPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, xp')
        .order('xp', { ascending: false })
        .limit(20);

      if (!error && data) {
        setPlayers(data);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16 relative">
            <button 
              onClick={() => window.history.back()} 
              className="absolute left-0 top-0 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors hidden md:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 mb-6 border border-yellow-500/20">
               <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            
            {/* Mobile back button */}
            <button 
              onClick={() => window.history.back()} 
              className="md:hidden mx-auto mb-4 flex items-center justify-center gap-2 p-2 px-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m15 18-6-6 6-6"/></svg>
              Return
            </button>

            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
              GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">RANKINGS</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              The most elite operatives in the LogicLynx network. Execute code, clear missions, and rise to the top.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden rounded-t-3xl shadow-2xl">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-black/50 border-b border-white/5 font-mono text-xs uppercase tracking-widest text-gray-500 hidden md:grid">
               <div className="col-span-2 text-center">RANK</div>
               <div className="col-span-7">OPERATIVE</div>
               <div className="col-span-3 text-right">TOTAL XP</div>
            </div>

            {loading ? (
               <div className="p-12 text-center text-gray-500 animate-pulse font-mono uppercase tracking-widest">
                  Retrieving network data...
               </div>
            ) : players.length === 0 ? (
               <div className="p-12 text-center text-gray-500 font-mono uppercase tracking-widest">
                  No operatives found on the network.
               </div>
            ) : (
              <div className="divide-y divide-white/5">
                {players.map((player, index) => {
                  const isTop3 = index < 3;
                  const rankStyles = [
                    "text-yellow-400 font-black text-2xl", // 1st
                    "text-gray-300 font-black text-2xl",   // 2nd
                    "text-orange-400 font-black text-2xl", // 3rd
                  ];
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={player.id} 
                      className={`grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors ${isTop3 ? 'bg-white/[0.01]' : ''}`}
                    >
                      <div className="col-span-2 flex items-center justify-center">
                        <span className={`font-mono ${rankStyles[index] || 'text-gray-500 font-bold text-lg'}`}>
                          #{index + 1}
                        </span>
                      </div>
                      
                      <div className="col-span-7">
                        <div className="flex items-center gap-3">
                           {isTop3 && <ChevronUp className={`w-4 h-4 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-orange-400'}`} />}
                           <span className={`font-bold tracking-wide uppercase ${isTop3 ? 'text-white' : 'text-gray-300'}`}>
                             {player.name}
                           </span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-right">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-black font-mono">
                          {player.xp.toLocaleString()} XP
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
