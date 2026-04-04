"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

const ACHIEVEMENTS: Record<string, { title: string; desc: string }> = {
  'first-blood': { title: "FIRST BLOOD", desc: "Completed your first code execution." },
  'polyglot': { title: "POLYGLOT", desc: "Mastered multiple programming syntaxes." },
  'streak-3': { title: "CONSISTENCY", desc: "Maintained a 3-day hack streak." },
};

export default function AchievementToast() {
  const { newAchievement, clearNotification } = useGameStore();

  useEffect(() => {
    if (newAchievement) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement, clearNotification]);

  const achievement = newAchievement ? ACHIEVEMENTS[newAchievement] : null;

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-[200] max-w-xs w-full"
        >
          <div className="bg-[#111111] border border-yellow-500/30 rounded-2xl p-5 shadow-2xl shadow-yellow-500/10 flex gap-4 items-start relative overflow-hidden group">
            {/* Animated Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
               <Trophy className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="flex-1">
              <h4 className="text-yellow-500 font-black text-xs tracking-[0.2em] mb-1">ACHIEVEMENT UNLOCKED</h4>
              <p className="text-white font-bold text-sm mb-1 leading-tight">{achievement.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{achievement.desc}</p>
            </div>

            <button 
              onClick={clearNotification}
              className="text-gray-600 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
