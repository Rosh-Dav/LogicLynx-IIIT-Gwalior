"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { themes } from "@/themes/themeConfig";
import { Play } from "lucide-react";

export default function MissionBriefingPage() {
  const router = useRouter();
  const { story, lang, user } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;
  
  if (!story || !lang) {
    router.push("/");
    return null;
  }

  const themeVars = themes[story as keyof typeof themes];
  const isCyber = story === "cyberpunk";

  return (
    <div className={`min-h-screen ${themeVars.background} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
      
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src={isCyber ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg"} 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-${isCyber ? "cyan" : "purple"}-900/40`} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`z-10 relative max-w-4xl w-full ${themeVars.card} border ${themeVars.border} rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl ${themeVars.glow}`}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Avatar / Speaker */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0 bg-white/5 relative shadow-xl">
             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <img 
              src={isCyber ? "https://api.dicebear.com/7.x/bottts/svg?seed=handler" : "https://api.dicebear.com/7.x/adventurer/svg?seed=archmage"} 
              alt="Speaker"
              className="w-full h-full object-cover p-2"
            />
          </div>

          <div className="flex-1">
            <div className={`text-xs uppercase tracking-widest font-bold mb-2 ${isCyber ? 'text-cyan-400' : 'text-purple-400'}`}>
              INCOMING TRANSMISSION • {lang.toUpperCase()}
            </div>
            
            <h1 className={`text-4xl font-black mb-2 tracking-tight ${themeVars.headingColor}`}>
              Welcome, {user?.name || "Traveler"}
            </h1>
            <p className="text-gray-400 text-sm tracking-widest uppercase mb-6">
              {isCyber ? 'System Initializing...' : 'The Leylines Awaken...'}
            </p>
            
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-8 relative shadow-inner">
              {/* Little pip indicating dialogue */}
              <div className="absolute -left-3 top-8 w-0 h-0 border-[6px] border-transparent border-r-white/10 border-r-black/40" />
              
              <p className="text-lg leading-relaxed text-gray-200 indent-2 italic font-serif">
                &ldquo;{isCyber 
                  ? "The megacorp's security grid sits before you. You've chosen your weapon well. Now, you must navigate the core nodes, exploiting logic vulnerabilities to dive deeper into their mainframe." 
                  : "The enchanted map reveals the ancient trials before us. Focus your energy and step into the arcane nodes to master the syntax of the ancients."}&rdquo;
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/map")}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-3 transition-all duration-300 bg-gradient-to-r ${themeVars.gradient} text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
            >
              Open Level Map <Play className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
