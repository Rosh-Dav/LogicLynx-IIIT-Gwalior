"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { missionsData, Mission } from "@/data/missions";
import { themes } from "@/themes/themeConfig";
import CodeEditor from "@/components/game/CodeEditor";
import DialoguePanel from "@/components/game/DialoguePanel";
import StoryPhase from "@/components/game/StoryPhase";
import Terminal, { TerminalOutput } from "@/components/game/Terminal";
import { Play, Sparkles, ChevronRight } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import Avatar from "@/components/Avatar";
export default function GamePage() {
  const router = useRouter();
  const { story, lang, currentLevel } = useGameStore();
  const { speak } = useVoice();
  
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gamePhase, setGamePhase] = useState<"story" | "coding">("story");

  useEffect(() => {
    setMounted(true);
  }, []);

  const [mission, setMission] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load Static Mission Data (Backend-less Mode)
  useEffect(() => {
    function loadMission() {
      if (!story || !lang) return;
      setLoading(true);
      try {
        // Find mission by language -> story -> level index
        const languageMissions = missionsData[lang as keyof typeof missionsData];
        if (languageMissions) {
          const storyMissions = languageMissions[story as keyof typeof languageMissions];
          if (storyMissions) {
            const activeMission = storyMissions.find(m => m.id === currentLevel) || storyMissions[0];
            setMission(activeMission);
            setCode(activeMission.startingCode);
          }
        }
      } catch (error) {
        console.error("Failed to load mission:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMission();
  }, [story, lang, currentLevel]);

  if (!mounted || loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <div className="font-black tracking-[0.3em] text-white/40 text-xs animate-pulse">SYNCHRONIZING WITH DATABASE...</div>
      </div>
    );
  }
  
  if (!story || !lang) {
    router.push("/");
    return null;
  }

  const themeVars = story ? themes[story as keyof typeof themes] : themes.cyberpunk;

  const handleNextLevel = () => {
    // Return to menu or handle progression
    router.push("/");
  };

  if (gamePhase === "story") {
    return (
      <StoryPhase 
        mission={mission} 
        storyType={story as "cyberpunk" | "fantasy"}
        onComplete={() => setGamePhase("coding")} 
      />
    );
  }

  const handleRunCode = () => {
    if (!mission) return;
    setOutput([{ type: "info", message: "Executing procedure..." }]);
    setShowSuccess(false);
    
    // Very dummy execution logic
    setTimeout(() => {
      // Check if user wrote expected output somewhere
      if (code.includes(mission.expectedOutput || "1010")) {
        setOutput(prev => [...prev, { type: "success", message: "Successfully executed without errors!" }]);
        
        // Speak the success line
        if (mission.successLine) {
          speak(mission.successLine, story as "cyberpunk" | "fantasy");
        }

        setTimeout(() => setShowSuccess(true), 800);
      } else {
        setOutput(prev => [...prev, { type: "error", message: "ReferenceError: Expected value not found. Did you initialize it to the correct value?" }]);
        
        // Speak the error/hint line
        if (mission.errorLine) {
          speak(mission.errorLine, story as "cyberpunk" | "fantasy");
        }
      }
    }, 1000);
  };

  return (
    <div className={`h-screen max-h-screen overflow-hidden bg-black text-white flex flex-col p-2 lg:p-4 gap-4 font-sans relative`}>
      
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <img 
          src={story === "cyberpunk" ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg"} 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br from-black via-black/80 to-${story === "cyberpunk" ? "cyan" : "purple"}-900/20`} />
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full z-10 relative">
        
        {/* Left Column (Story & Dialogue) */}
        <div className="w-full lg:w-[40%] flex flex-col h-full max-h-full">
          <DialoguePanel mission={mission} />
        </div>

        {/* Right Column (Editor & Output) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4 h-full max-h-full">
          
          {/* Top Navbar for Editor */}
          <div className={`h-14 rounded-2xl border ${themeVars.border} bg-black/40 backdrop-blur-md flex items-center justify-between px-4`}>
             <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
               <span className="w-3 h-3 rounded-full bg-red-500/80" />
               <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
               <span className="w-3 h-3 rounded-full bg-green-500/80" />
               <span className="ml-2">main.{lang === "python" ? "py" : "c"}</span>
             </div>
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRunCode}
                className={`py-1.5 px-4 bg-gradient-to-r ${themeVars.gradient} rounded-lg text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg hover:${themeVars.glow} transition-shadow`}
             >
               <Play className="w-3.5 h-3.5" /> Execute
             </motion.button>
          </div>

          {/* Editor Container */}
          <div className="flex-1 relative min-h-[300px]">
            <CodeEditor code={code} onChange={val => setCode(val || "")} language={lang || "python"} />
          </div>

          {/* Terminal Container */}
          <div className="h-[25vh]">
            <Terminal output={output} />
          </div>

        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`bg-[#0a0a10] border ${themeVars.border} p-10 rounded-3xl max-w-lg w-full text-center shadow-2xl relative overflow-hidden`}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-gradient-to-b ${themeVars.gradient} opacity-5 blur-[100px] pointer-events-none`} />
              
              <div className="flex flex-col items-center gap-4 mb-8">
                <Avatar 
                  storyType={story as "cyberpunk" | "fantasy"} 
                  isSpeaking={false} 
                  size="lg" 
                />
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Mission Complete!</h2>
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${story === "cyberpunk" ? "text-cyan-400" : "text-purple-400"}`}>
                    {story === "cyberpunk" ? "THE HANDLER" : "ARCHMAGE VORDRID"}
                  </div>
                  <p className="text-gray-400 font-sans px-4">
                    {mission.successLine || "Outstanding sequence execution. You've successfully resolved the logical dependencies."}
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextLevel}
                className={`w-full py-4 bg-gradient-to-r ${themeVars.gradient} text-white font-bold font-sans tracking-widest text-sm uppercase rounded-xl flex items-center justify-center gap-2`}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
