"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Mission } from "@/data/missions";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useVoice } from "@/hooks/useVoice";
import { ChevronRight, Forward, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface StoryPhaseProps {
  mission: Mission;
  storyType: "cyberpunk" | "fantasy";
  onComplete: () => void;
}

export default function StoryPhase({ mission, storyType, onComplete }: StoryPhaseProps) {
  return (
    <StoryNodeViewer 
      mission={mission} 
      storyType={storyType} 
      onComplete={onComplete} 
    />
  );
}

// Extracted to handle key change per node index
function StoryNodeViewer({ mission, storyType, onComplete }: StoryPhaseProps) {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const node = mission.storyNodes[currentNodeIndex];
  
  if (!node) {
    onComplete();
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <StoryScreen 
        key={currentNodeIndex}
        text={node.text}
        bgImage={node.bgImage || (storyType === "cyberpunk" ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg")}
        storyType={storyType}
        characterName={node.characterName}
        characterImage={node.characterImage}
        onNext={() => {
          if (currentNodeIndex < mission.storyNodes.length - 1) {
            setCurrentNodeIndex(prev => prev + 1);
          } else {
            onComplete();
          }
        }}
        isLastNode={currentNodeIndex === mission.storyNodes.length - 1}
      />
    </AnimatePresence>
  );
}

function StoryScreen({ 
  text, 
  bgImage, 
  storyType, 
  characterName,
  characterImage,
  onNext, 
  isLastNode 
}: { 
  text: string; 
  bgImage: string; 
  storyType: string;
  characterName?: string;
  characterImage?: string;
  onNext: () => void;
  isLastNode: boolean;
}) {
  const isCyber = storyType === "cyberpunk";
  const { displayedText, isDone } = useTypewriter(text, 30);
  const { speak, stop, isSpeaking } = useVoice();
  const router = useRouter();

  useEffect(() => {
    speak(text, storyType as any);
    return () => {
      stop();
    };
  }, [text, storyType, speak, stop]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12 overflow-hidden bg-black"
    >
      {/* Route out to map */}
      <button 
        onClick={() => router.push("/map")}
        className="absolute top-6 right-6 z-[60] bg-black/50 hover:bg-white/20 border border-white/20 p-2 rounded-xl text-white/50 hover:text-white transition-all backdrop-blur-md"
      >
        <X className="w-6 h-6" />
      </button>
      {/* Background Image with animated scale */}
      <motion.div 
        initial={{ scale: 1.1, x: -20 }}
        animate={{ scale: 1.15, x: 20 }}
        transition={{ 
          duration: 20, 
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <img 
          src={bgImage} 
          alt="Story background" 
          className="w-full h-full object-cover"
        />
        {/* Lighter cinematic vignettes for better background visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col justify-end h-full pb-4 lg:pb-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", damping: 25 }}
          className={`backdrop-blur-xl border ${isCyber ? "border-cyan-500/20 bg-black/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]" : "border-purple-500/20 bg-[#0c051a]/30 shadow-[0_0_40px_rgba(168,85,247,0.1)]"} rounded-3xl p-5 lg:p-6 relative overflow-hidden`}
        >
          {/* Decorative accents */}
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isCyber ? "from-transparent via-cyan-500 to-transparent" : "from-transparent via-purple-500 to-transparent"} opacity-50`} />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          {/* Dialogue Content */}
          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            {/* Character Avatar */}
            <AnimatePresence>
              {characterImage && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="flex-shrink-0 relative group mt-1"
                >
                  <div className={`w-20 h-20 lg:w-28 lg:h-28 ${isCyber ? "drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"}`}>
                    <img src={characterImage} alt={characterName} className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 min-h-[80px]">
              {/* Character Name Label */}
              <AnimatePresence>
                {characterName && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-2 inline-block"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-sm ${
                      isCyber 
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                    }`}>
                      {characterName}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dialogue Text - More compact */}
              <p className="text-sm lg:text-base text-gray-100 font-medium leading-relaxed font-sans tracking-wide">
                {displayedText}
                {!isDone && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle ${isCyber ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "bg-purple-400 shadow-[0_0_10px_#c084fc]"}`}
                  />
                )}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-end items-center mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                isDone 
                  ? isCyber
                    ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : "bg-purple-500 text-white hover:bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10"
              }`}
            >
              {isLastNode ? (
                <>
                  <Sparkles className="w-5 h-5" /> BEGIN MISSION
                </>
              ) : (
                <>
                  NEXT <Forward className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
