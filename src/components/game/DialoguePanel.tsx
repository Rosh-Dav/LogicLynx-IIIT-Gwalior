"use client";

import { motion } from "framer-motion";
import { themes } from "@/themes/themeConfig";
import { useGameStore } from "@/store/useGameStore";
import { Mission } from "@/data/missions";
import { Info } from "lucide-react";

interface DialoguePanelProps {
  mission: Mission;
}

export default function DialoguePanel({ mission }: DialoguePanelProps) {
  const { story } = useGameStore();
  const themeVars = story ? themes[story as keyof typeof themes] : themes.cyberpunk;

  return (
    <div className={`w-full h-full flex flex-col ${themeVars.background} overflow-hidden rounded-2xl border ${themeVars.border} backdrop-blur-md`}>
      
      {/* Header Info */}
      <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-black/40">
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 bg-white/5">
            <img 
              src={story === "cyberpunk" ? "https://api.dicebear.com/7.x/bottts/svg?seed=handler" : "https://api.dicebear.com/7.x/adventurer/svg?seed=archmage"} 
              alt="Speaker"
              className="w-full h-full object-cover p-1"
            />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-400">Current Mission</div>
          <h2 className={`text-xl font-black tracking-tight ${themeVars.headingColor}`}>{mission.title}</h2>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        
        {/* Story Dialogue Node */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-black/40 border border-white/10 rounded-2xl p-5"
        >
          {/* Internal pointer triangle */}
          <div className="absolute -top-3 left-8 w-0 h-0 border-[6px] border-transparent border-b-white/10 border-b-black/40" />
          <p className="text-gray-300 leading-relaxed font-sans">{mission.story}</p>
        </motion.div>

        {/* Objective Block */}
        <div className={`p-5 rounded-2xl border ${themeVars.border} bg-white/[0.02]`}>
          <div className="text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${themeVars.gradient}`} />
            Objective
          </div>
          <p className="text-white font-medium">{mission.objective}</p>
        </div>

        {/* Hints Block */}
        {mission.hints.length > 0 && (
          <div className="mt-auto">
            <div className="flex items-start gap-3 text-sm text-gray-400 bg-[#111] p-4 rounded-xl border border-white/5">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-300 mb-1 tracking-widest uppercase text-xs">System Hint</strong>
                <ul className="list-disc list-inside space-y-1">
                  {mission.hints.map((hint, idx) => (
                    <li key={idx}>{hint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
