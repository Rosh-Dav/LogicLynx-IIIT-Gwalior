"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Mission } from "@/data/missions";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useVoice } from "@/hooks/useVoice";
import { ChevronRight, Forward, Sparkles } from "lucide-react";

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

  useEffect(() => {
    // Speak on mount
    const timer = setTimeout(() => {
      speak(text, storyType as any);
    }, 500);
    return () => {
      clearTimeout(timer);
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
      {/* Background Image with animated scale */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <img 
          src={bgImage} 
          alt="Story background" 
          className="w-full h-full object-cover"
        />
        {/* Cinematic darkened vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col justify-end h-full pb-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", damping: 20 }}
          className={`backdrop-blur-xl border ${isCyber ? "border-cyan-500/30 bg-black/60 shadow-[0_0_50px_rgba(6,182,212,0.15)]" : "border-purple-500/30 bg-[#1a0f2e]/80 shadow-[0_0_50px_rgba(168,85,247,0.15)]"} rounded-3xl p-8 lg:p-12 relative overflow-hidden`}
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
                  className="flex-shrink-0 relative group"
                >
                  <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border-2 ${isCyber ? "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]"}`}>
                    <img src={characterImage} alt={characterName} className="w-full h-full object-cover" />
                  </div>
                  {/* Decorative corner accents */}
                  <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${isCyber ? "border-cyan-400" : "border-purple-400"}`} />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${isCyber ? "border-cyan-400" : "border-purple-400"}`} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 min-h-[160px]">
              {/* Character Name Label */}
              <AnimatePresence>
                {characterName && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-4 inline-block"
                  >
                    <span className={`text-xs font-black uppercase tracking-[0.3em] px-3 py-1 rounded-md ${
                      isCyber 
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    }`}>
                      {characterName}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dialogue Text */}
              <p className="text-xl lg:text-3xl text-gray-100 font-medium leading-relaxed font-sans tracking-wide shadow-black drop-shadow-md">
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
          <div className="flex justify-end items-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all ${
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
