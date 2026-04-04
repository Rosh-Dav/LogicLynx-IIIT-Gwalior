"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Check, Lock, Hexagon } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { themes } from "@/themes/themeConfig";
import { missionsData } from "@/data/missions";
import Navbar from "@/components/Navbar";

export default function LevelMapPage() {
  const router = useRouter();
  const { story, lang, currentLevel, highestUnlockedLevel, setLevel } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;
  
  if (!story) {
    router.push("/");
    return null;
  }

  const currentLang = lang || "python";
  const trackLevels = (missionsData as any)[currentLang]?.[story] || [];

  // Format the missions into the level map structure
  const levelsData = trackLevels.map((mission: any) => {
    // Extract concept from "Level X: Concept - Story Title"
    const conceptName = mission.title.includes(':') 
      ? mission.title.split(':')[1]?.split('-')[0]?.trim() || mission.title 
      : mission.title;

    return {
      id: mission.id,
      name: conceptName,
      unlocked: mission.id <= highestUnlockedLevel,
      completed: mission.id < highestUnlockedLevel
    };
  });

  const themeVars = themes[story as keyof typeof themes];
  const isCyber = story === "cyberpunk";

  const handleNodeClick = (levelId: number, unlocked: boolean) => {
    if (unlocked) {
      setLevel(levelId);
      router.push("/game");
    } else {
      console.log("Level Locked");
    }
  };

  return (
    <div className={`min-h-screen ${themeVars.background} text-white relative font-sans overflow-hidden flex flex-col`}>
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none fixed">
        <img 
          src={isCyber ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg"} 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-${isCyber ? "cyan" : "purple"}-900/40`} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20" />

      <Navbar />
      
      {/* Top Navbar */}
      <div className="relative z-20 w-full p-6 pt-24 flex justify-end items-center">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white drop-shadow-md">Your Journey</h1>
        </div>
      </div>

      <div className="flex-1 relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 flex flex-col items-center">
        
        {/* The Node Path Container */}
        <div className="w-full relative py-10 flex flex-col items-center">
          
          {/* Central Line (Draws behind nodes) */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b ${themeVars.gradient} opacity-20 left-1/2 -translate-x-1/2`}
          />

          {levelsData.map((level: any, index: number) => {
            const isLeft = index % 2 === 0;
            return (
              <LevelNode 
                key={level.id}
                level={level}
                isLeft={isLeft}
                isCyber={isCyber}
                themeVars={themeVars}
                onClick={() => handleNodeClick(level.id, level.unlocked)}
                index={index}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}

// --------------------------------------------------------
// Internal Node Component
// --------------------------------------------------------
function LevelNode({ level, isLeft, isCyber, themeVars, onClick, index }: any) {
  
  const [isHovered, setIsHovered] = useState(false);

  // Status mapping
  const isCompleted = level.completed;
  const isUnlocked = level.unlocked && !level.completed;
  const isLocked = !level.unlocked;

  // Determine colors based on status
  let nodeBorder = "border-gray-700/50";
  let nodeBg = "bg-[#111]";
  let iconColor = "text-gray-600";
  let textClass = "text-gray-500";

  if (isCompleted) {
    nodeBorder = isCyber ? "border-cyan-500" : "border-purple-500";
    nodeBg = isCyber ? "bg-cyan-900/40" : "bg-purple-900/40";
    iconColor = isCyber ? "text-cyan-400" : "text-purple-400";
    textClass = "text-gray-200";
  } else if (isUnlocked) {
    nodeBorder = isCyber ? "border-cyan-400/80" : "border-purple-400/80";
    nodeBg = isCyber ? "bg-cyan-950/80" : "bg-purple-950/80";
    iconColor = "text-white";
    textClass = "text-white";
  }

  // Horizontal connector line styling
  const connectorGradient = isCyber 
    ? "from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"
    : "from-purple-500/0 via-purple-500/50 to-purple-500/0";

  return (
    <div className={`w-full flex ${isLeft ? 'justify-start md:pr-[50%]' : 'justify-end md:pl-[50%]'} relative mb-16 px-4 md:px-0 group`}>
      
      {/* Horizontal Connector to Center Line (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r ${connectorGradient} ${isLeft ? 'right-[50%] left-auto w-24' : 'left-[50%] right-auto w-24'}`}
      />

      {/* The Node Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
        whileHover={isLocked ? {} : { scale: 1.05 }}
        whileTap={isLocked ? {} : { scale: 0.95 }}
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          relative z-10 w-full sm:w-[320px] p-4 rounded-2xl border-2 flex items-center gap-4 cursor-pointer backdrop-blur-md transition-all duration-300
          ${nodeBorder} ${nodeBg}
          ${isLocked ? 'pointer-events-none' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'}
          ${isUnlocked && isHovered && !isCyber ? 'shadow-[0_0_30px_rgba(168,85,247,0.4)]' : ''}
          ${isUnlocked && isHovered && isCyber ? 'shadow-[0_0_30px_rgba(6,182,212,0.4)]' : ''}
        `}
      >
        {/* Pulsing glow for unlocked active current level */}
        {isUnlocked && (
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-2xl border-2 pointer-events-none ${isCyber ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]'}`}
          />
        )}

        {/* Icon Circle */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-white/10 shrink-0 bg-black/50 ${iconColor} relative`}>
          {isCompleted && <Check className="w-7 h-7" />}
          {isUnlocked && <Hexagon className="w-7 h-7" />}
          {isLocked && <Lock className="w-6 h-6 opacity-30" />}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
            Node {level.id}
          </span>
          <h3 className={`text-xl font-black tracking-tight ${textClass}`}>
            {level.name}
          </h3>
          
          {/* Status Label */}
          {isLocked && (
            <motion.div 
               animate={isHovered ? { x: [0, -2, 2, -2, 2, 0] } : {}}
               transition={{ duration: 0.3 }}
               className="text-xs text-red-400/80 uppercase tracking-widest mt-1"
            >
              System Locked
            </motion.div>
          )}
          {isUnlocked && <div className="text-xs text-white/50 uppercase tracking-widest mt-1 animate-pulse">Awaiting Access...</div>}
        </div>
      </motion.div>
    </div>
  );
}
