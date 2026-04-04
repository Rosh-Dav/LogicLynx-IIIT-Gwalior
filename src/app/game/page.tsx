"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { missionsData } from "@/data/missions";
import { themes } from "@/themes/themeConfig";
import CodeEditor from "@/components/game/CodeEditor";
import DialoguePanel from "@/components/game/DialoguePanel";
import StoryPhase from "@/components/game/StoryPhase";
import MissionBriefing from "@/components/game/MissionBriefing";
import Terminal, { TerminalOutput } from "@/components/game/Terminal";
import AiTutorSidebar from "@/components/game/AiTutorSidebar";
import { Loader2, Play, ChevronRight, ChevronLeft, Home, X } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";
import Avatar from "@/components/Avatar";
import { runCode } from "@/lib/glot";

export default function GamePage() {
  const router = useRouter();
  const { story, lang, currentLevel, setLevel } = useGameStore();
  const { speak } = useVoice();

  const [mounted, setMounted]         = useState(false);
  const [code, setCode]               = useState("");
  const [output, setOutput]           = useState<TerminalOutput[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isRunning, setIsRunning]     = useState(false);
  const [gamePhase, setGamePhase]     = useState<"story" | "briefing" | "coding">("story");
  const [mission, setMission]         = useState<any | null>(null);
  const [loading, setLoading]         = useState(true);
  const [missionPassed, setMissionPassed] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ── Load mission data ────────────────────────────────────────────────────
  useEffect(() => {
    if (!story || !lang) return;
    setLoading(true);
    try {
      const languageMissions = missionsData[lang as keyof typeof missionsData];
      if (languageMissions) {
        const storyMissions = languageMissions[story as keyof typeof languageMissions] as any;
        if (storyMissions) {
          const activeMission =
            storyMissions.find((m: any) => m.id === currentLevel) || storyMissions[0];
          setMission(activeMission);
          if (activeMission) setCode(activeMission.startingCode);
        }
      }
    } catch (err) {
      console.error("Failed to load mission:", err);
    } finally {
      setLoading(false);
    }
  }, [story, lang, currentLevel]);

  // ── Loading / guard ──────────────────────────────────────────────────────
  if (!mounted || loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <div className="font-black tracking-[0.3em] text-white/40 text-xs animate-pulse">
          SYNCHRONIZING WITH DATABASE...
        </div>
      </div>
    );
  }

  if (!story || !lang) { router.push("/"); return null; }

  const themeVars = themes[story as keyof typeof themes] ?? themes.cyberpunk;
  const isCyber   = story === "cyberpunk";

  // ── Next level ───────────────────────────────────────────────────────────
  const handleNextLevel = () => {
    const languageMissions = missionsData[lang as keyof typeof missionsData];
    if (languageMissions) {
      const storyMissions = languageMissions[story as keyof typeof languageMissions];
      if (storyMissions) {
        const next = storyMissions.find(m => m.id === currentLevel + 1);
        if (next) {
          setLevel(currentLevel + 1);
          setShowSuccess(false);
          setMissionPassed(false);
          setOutput([]);
          setGamePhase("story");
          return;
        }
      }
    }
    router.push("/");
  };

  // ── Real execution via Glot.io ───────────────────────────────────────────
  const handleRunCode = async () => {
    if (!mission || isRunning) return;
    setIsRunning(true);
    setShowSuccess(false);
    setOutput([{
      type: "info",
      message: isCyber ? "⚡ Connecting to execution engine..." : "🔮 Channeling arcane compiler...",
    }]);
    // Add an initial execution status
    setOutput([{ type: "info", message: `Executing ${lang} kernel...` }]);

    try {
      const res = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Safely pass testCases if they exist on the current mission
        body: JSON.stringify({ language: lang, code, testCases: (mission as any).testCases }),
      });

      const result = await res.json();
      
      // ── Test Cases Validation (New LeetCode-style Engine) ───────────────────
      if (result.testResults) {
        const allPassed = result.testResults.every((r: any) => r.passed);
        
        // Map each test result out to the terminal
        const testCaseReadouts = result.testResults.map((r: any, idx: number) => {
          if (r.passed) {
            return { type: "success", message: `[Test Case ${idx + 1}] ✓ Passed ${r.input ? `(Input: ${r.input})` : ''}` };
          } else {
            return { type: "error", message: `[Test Case ${idx + 1}] ✗ Failed ${r.input ? `(Input: ${r.input})` : ''}\n   Expected included string: "${r.expectedOutput.trim()}"\n   Got Output: "${r.stdout.trim() || r.stderr.trim()}"` };
          }
        });

        setOutput(testCaseReadouts);

        if (allPassed) {
          setOutput((prev: any) => [...prev, { type: "success", message: "✓ Mission objectives met! All core systems green." }]);
          
          if (!missionPassed) { // Check missionPassed instead of showSuccess to prevent double trigger when modal opens/closes
            useGameStore.getState().addXP(10);
            useGameStore.getState().unlockNextLevel();
            setMissionPassed(true);
          }

          if (mission.successLine) speak(mission.successLine, story as "cyberpunk" | "fantasy");
          setTimeout(() => setShowSuccess(true), 1200);
        } else {
          if (mission.errorLine) speak(mission.errorLine, story as "cyberpunk" | "fantasy");
        }
        return; // Exit safely
      }

      // ── Validation (Legacy Single Exec Engine) ─────────────────────────────
      const hasError = !!(result.stderr?.trim() || result.error?.trim());
      const actualOutput = result.stdout || "";
      // Strip out //, /* */, and Python # comments
      const cleanCode = code.replace(/\/\/.*|\/\*[\s\S]*?\*\/|#.*/g, "");
      const valStrings: string[] = mission.validationStrings || [];
      const expected: string | undefined = mission.expectedOutput;

      let passed = false;
      if (valStrings.length > 0) {
        passed = !hasError && valStrings.every((s: string) => cleanCode.includes(s));
      } else if (expected) {
        passed = !hasError && actualOutput.includes(expected);
      } else {
        passed = !hasError;
      }

      // Render the single legacy execution output block
      if (hasError) {
        setOutput([{ type: "error", message: result.stderr || result.error }]);
      } else {
        setOutput([{ type: "info", message: actualOutput }]);
      }

      if (passed) {
        setOutput((prev: any) => [
          ...prev,
          { type: "success", message: "✓ All checks passed — mission objectives met!" },
        ]);
        
        // Immediately grant 10 XP if we haven't already hit success
        if (!missionPassed) {
           useGameStore.getState().addXP(10);
           useGameStore.getState().unlockNextLevel();
           setMissionPassed(true);
        }

        if (mission.successLine) speak(mission.successLine, story as "cyberpunk" | "fantasy");
        setTimeout(() => setShowSuccess(true), 800);
      } else {
        if (!hasError)
          setOutput((prev: any) => [
            ...prev,
            { type: "error", message: "✗ Output does not match the mission requirements." },
          ]);
        if (mission.errorLine) speak(mission.errorLine, story as "cyberpunk" | "fantasy");
      }
    } catch (err: any) {
      setOutput([{ type: "error", message: `Execution Error: ${err.message}` }]);
    } finally {
      setIsRunning(false);
    }
  };

  // ── Story / Briefing phases ──────────────────────────────────────────────
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

  // ── Coding Phase: 3-column layout ────────────────────────────────────────
  return (
    <div className="h-screen max-h-screen overflow-hidden bg-black text-white flex flex-col p-2 lg:p-3 gap-3 font-sans relative">

      {/* Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <img
          src={isCyber ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg"}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br from-black via-black/80 to-${isCyber ? "cyan" : "purple"}-900/20`} />
      </div>

      {/* 3-column main layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 h-full z-10 relative overflow-hidden">

        {/* ── Column 1: Dialogue Panel (30%) ──────────────────────────── */}
        <div className="w-full lg:w-[28%] flex flex-col h-full max-h-full">
          <DialoguePanel mission={mission} />
        </div>

        {/* ── Column 2: Editor + Terminal (45%) ───────────────────────── */}
        <div className="w-full lg:w-[44%] flex flex-col gap-3 h-full max-h-full">

          {/* Editor top bar */}
          <div className={`flex-shrink-0 h-12 rounded-2xl border ${themeVars.border} bg-black/40 backdrop-blur-md flex items-center justify-between px-4`}>
            <div className="flex items-center gap-3 text-sm text-gray-400 font-mono">
              <button
                onClick={() => setShowExitWarning(true)}
                className="flex items-center gap-1 hover:text-white transition-colors text-xs"
              >
                <ChevronLeft className="w-4 h-4" /> Exit
              </button>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-1.5 text-xs hidden sm:inline">
                  main.{lang === "python" ? "py" : "c"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {missionPassed && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextLevel}
                  className={`py-1.5 px-3 bg-green-500 hover:bg-green-400 text-black font-black text-[10px] uppercase tracking-widest flex items-center shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-colors rounded-lg`}
                >
                  Next Mission <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRunCode}
                disabled={isRunning}
                className={`py-1.5 px-4 bg-gradient-to-r ${themeVars.gradient} rounded-lg text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isRunning
                  ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running...</>
                  : <><Play className="w-3.5 h-3.5" /> Execute</>
                }
              </motion.button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative min-h-[200px]">
            <CodeEditor code={code} onChange={val => setCode(val || "")} language={lang || "python"} />
          </div>

          {/* Terminal */}
          <div className="h-[22vh] flex-shrink-0">
            <Terminal output={output} />
          </div>
        </div>

        {/* ── Column 3: AI Tutor Sidebar (27%) ────────────────────────── */}
        <div className="w-full lg:w-[28%] flex flex-col h-full max-h-full">
          <AiTutorSidebar
            mission={mission}
            code={code}
            language={lang || "python"}
            storyTheme={story || "cyberpunk"}
          />
        </div>
      </div>

      {/* ── Success Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className={`bg-[#0c0c14] border ${themeVars.border} p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden`}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glow effect */}
              <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-20 ${isCyber ? "bg-cyan-400" : "bg-purple-400"}`} />

              <div className="relative z-10 flex flex-col items-center gap-5">
                {/* Avatar + celebration */}
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Avatar storyType={story as any} size="lg" isSpeaking={false} />
                </motion.div>

                {/* Title */}
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase">
                    Mission Complete!
                  </h2>
                  <p className={`text-xs uppercase tracking-[0.2em] mt-1 font-bold ${isCyber ? "text-cyan-400" : "text-purple-400"}`}>
                    {isCyber ? "⚡ Objective achieved" : "✨ Spell mastered"}
                  </p>
                </div>

                {/* Success message */}
                <p className="text-gray-400 text-sm font-sans leading-relaxed max-w-xs">
                  {mission?.successLine || "Well done! You've completed this challenge."}
                </p>

                {/* XP reward */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isCyber ? "bg-cyan-500/10 border-cyan-500/25" : "bg-purple-500/10 border-purple-500/25"} border`}>
                  <span className="text-lg">⭐</span>
                  <span className={`text-sm font-black ${isCyber ? "text-cyan-300" : "text-purple-300"}`}>
                    +10 XP earned
                  </span>
                </div>

                {/* Two action buttons */}
                <div className="flex flex-col gap-3 w-full mt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextLevel}
                    className={`w-full py-4 bg-gradient-to-r ${themeVars.gradient} text-white font-bold tracking-widest text-sm uppercase rounded-xl flex items-center justify-center gap-2.5 shadow-lg`}
                  >
                    Next Mission <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/map")}
                    className="w-full py-3.5 border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 font-bold tracking-widest text-xs uppercase rounded-xl flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <Home className="w-4 h-4" /> Return to Map
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Exit Warning Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showExitWarning && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111111] border border-red-500/20 p-8 rounded-2xl max-w-sm w-full text-center"
            >
              <button
                onClick={() => setShowExitWarning(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">ABORT MISSION?</h2>
              <p className="text-gray-400 mb-8 text-sm">
                Unsaved parameters will be lost. Terminate current session?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowExitWarning(false)}
                  className="flex-1 py-3 border border-white/10 rounded-xl text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => router.push("/map")}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl uppercase tracking-widest transition-colors"
                >
                  EXIT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
