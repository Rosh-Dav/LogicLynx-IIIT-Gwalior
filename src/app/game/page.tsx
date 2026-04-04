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
import MissionBriefing from "@/components/game/MissionBriefing";
import Terminal, { TerminalOutput } from "@/components/game/Terminal";
import { Play, Sparkles, ChevronRight } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import Avatar from "@/components/Avatar";
export default function GamePage() {
  const router = useRouter();
  const { story, lang, currentLevel, setLevel } = useGameStore();
  const { speak } = useVoice();
  
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gamePhase, setGamePhase] = useState<"story" | "briefing" | "coding">("story");

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
        const languageMissions = missionsData[lang as keyof typeof missionsData];
        if (languageMissions) {
          const storyMissions = languageMissions[story as keyof typeof languageMissions] as any;
          if (storyMissions) {
            const activeMission = storyMissions.find((m: any) => m.id === currentLevel) || storyMissions[0];
            setMission(activeMission);
            if (activeMission) setCode(activeMission.startingCode);
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
    const languageMissions = missionsData[lang as keyof typeof missionsData];
    if (languageMissions) {
      const storyMissions = languageMissions[story as keyof typeof languageMissions];
      if (storyMissions) {
        const nextMission = storyMissions.find(m => m.id === currentLevel + 1);
        if (nextMission) {
          setLevel(currentLevel + 1);
          setShowSuccess(false);
          setOutput([]);
          setGamePhase("story");
          return;
        }
      }
    }
    router.push("/");
  };

  if (loading || !mission) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`w-10 h-10 border-4 ${story === "cyberpunk" ? "border-cyan-500/30 border-t-cyan-500" : "border-purple-500/30 border-t-purple-500"} rounded-full`}
        />
      </div>
    );
  }

  if (gamePhase === "story") {
    return (
      <StoryPhase 
        mission={mission} 
        storyType={story as "cyberpunk" | "fantasy"}
        onComplete={() => setGamePhase("briefing")} 
      />
    );
  }

  if (gamePhase === "briefing") {
    return (
      <MissionBriefing
        mission={mission}
        onStart={() => setGamePhase("coding")}
      />
    );
  }

  const handleRunCode = () => {
    if (!mission) return;
    setOutput([{ type: "info", message: "Executing procedure..." }]);
    setShowSuccess(false);
    
    setTimeout(() => {
      // Strip comments to prevent bypassing validation via comments
      const cleanCode = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");
      
      // Check for basic program structure if in C
      const isC = lang === "c";
      const hasBasicStructure = !isC || (
        (/int\s+main\s*\(/.test(cleanCode) || /void\s+main\s*\(/.test(cleanCode)) &&
        (/#include\s+<stdio\.h>/.test(cleanCode) || /#include\s+<iostream>/.test(cleanCode))
      );

      const stringsRequired = mission.validationStrings || [];
      const hasRequiredContent = stringsRequired.length > 0 
        ? stringsRequired.every((str: string) => {
            // Special check for printf to ensure it's not actually a 'print' call from another language
            if (str === "printf") {
               return cleanCode.includes("printf(");
            }
            return cleanCode.includes(str);
          }) 
        : cleanCode.includes(mission.expectedOutput || "1010");

      if (hasRequiredContent && hasBasicStructure) {
        setOutput(prev => [...prev, { type: "success", message: "Successfully executed without errors!" }]);
        if (mission.successLine) {
          speak(mission.successLine, story as "cyberpunk" | "fantasy");
        }
        setTimeout(() => setShowSuccess(true), 800);
      } else {
        const errorMsg = !hasBasicStructure 
          ? "Validation Error: Basic C program structure missing (main function or #include)." 
          : "Validation Error: Your input does not meet the specified logical requirements.";
        
        setOutput(prev => [...prev, { type: "error", message: errorMsg }]);
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
              
              <div className="flex flex-col items-center gap-4 mb-6">
                {mission?.successImage ? (
                  <motion.img 
                    src={mission.successImage} 
                    alt="Success Graphic" 
                    className="h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <Avatar 
                    storyType={story as "cyberpunk" | "fantasy"} 
                    isSpeaking={false} 
                    size="lg" 
                  />
                )}
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Mission Complete!</h2>
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${story === "cyberpunk" ? "text-cyan-400" : "text-purple-400"}`}>
                    {story === "cyberpunk" ? "THE HANDLER" : "ARCHMAGE VORDRID"}
                  </div>
                  <p className="text-gray-400 font-sans px-4">
                    {mission?.successLine || "Outstanding sequence execution. You've successfully resolved the logical dependencies."}
                  </p>
                </div>
              </div>

              {mission?.whatYouLearned && mission.whatYouLearned.length > 0 && (
                <div className="mb-8 text-left bg-black/40 border border-white/10 rounded-xl p-5 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🧠</span>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">What You Learned</h3>
                  </div>
                  <ul className="space-y-2">
                    {mission.whatYouLearned.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-300">
                        <span className={`flex-shrink-0 ${story === 'cyberpunk' ? 'text-cyan-400' : 'text-purple-400'}`}>▸</span>
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/`([^`]+)`/g, '<code class="text-white bg-white/10 px-1 rounded">$1</code>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
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
