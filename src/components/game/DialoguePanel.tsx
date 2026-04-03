"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { themes } from "@/themes/themeConfig";
import { useGameStore } from "@/store/useGameStore";
import { Mission } from "@/data/missions";
import { useVoice } from "@/hooks/useVoice";
import { useTypewriter } from "@/hooks/useTypewriter";
import Avatar from "@/components/Avatar";
import { Volume2, VolumeX, Lightbulb } from "lucide-react";

interface DialoguePanelProps {
  mission: Mission;
}

export default function DialoguePanel({ mission }: DialoguePanelProps) {
  const { story } = useGameStore();
  const themeVars = story ? themes[story as keyof typeof themes] : themes.cyberpunk;
  const { speak, stop, isSpeaking } = useVoice();
  const speakRef = useRef(speak);
  speakRef.current = speak;

  const isCyber = story === "cyberpunk";
  const storyType = (story ?? "cyberpunk") as "cyberpunk" | "fantasy";

  const fullDialogueText = mission.tutorial ? `${mission.tutorial}\n\n${mission.story}` : mission.story;

  // Typewriter for mission story text
  const { displayedText, isDone } = useTypewriter(fullDialogueText, 22, 300);

  // ── AUTO-SPEAK the mission story when panel mounts or mission changes ────
  useEffect(() => {
    const timer = setTimeout(() => {
      speakRef.current(fullDialogueText.replace(/\n/g, ' '), storyType);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission.id]); // re-triggers when player moves to next mission

  const toggle = (textToSpeak: string) => {
    isSpeaking ? stop() : speak(textToSpeak.replace(/\n/g, ' '), storyType);
  };

  return (
    <div className={`w-full h-full flex flex-col ${themeVars.background} overflow-hidden rounded-2xl border ${themeVars.border} backdrop-blur-md`}>

      {/* ── Header ── */}
      <div className="p-5 border-b border-white/5 flex items-center gap-4 bg-black/40 flex-shrink-0">
        <Avatar
          storyType={storyType}
          isSpeaking={isSpeaking}
          size="sm"
          onClick={() => toggle(fullDialogueText)}
        />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Current Mission</div>
          <h2 className={`text-lg font-black tracking-tight truncate ${themeVars.headingColor}`}>
            {mission.title}
          </h2>
        </div>

        {/* Mute/unmute toggle */}
        <button
          onClick={() => toggle(fullDialogueText)}
          title={isSpeaking ? "Stop Voice" : "Read Story"}
          className={`flex-shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
            isSpeaking
              ? isCyber
                ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                : "border-purple-400 text-purple-400 bg-purple-400/10"
              : "border-white/10 text-gray-500 hover:text-white hover:border-white/30"
          }`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5 custom-scrollbar">

        {/* Story with typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-black/40 border border-white/10 rounded-2xl p-5 min-h-[90px]"
        >
          {/* Speech bubble notch */}
          <div className="absolute -top-3 left-8 w-0 h-0 border-[6px] border-transparent border-b-white/10 border-b-black/40" />
          <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
            {displayedText}
            {!isDone && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className={`inline-block w-[2px] h-[0.85em] ml-0.5 align-middle ${isCyber ? "bg-cyan-400" : "bg-purple-400"}`}
              />
            )}
          </p>
          <button
            onClick={() => toggle(fullDialogueText)}
            className={`mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold transition-colors ${
              isSpeaking
                ? isCyber ? "text-cyan-400" : "text-purple-400"
                : isCyber ? "text-cyan-700 hover:text-cyan-400" : "text-purple-700 hover:text-purple-400"
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            {isSpeaking ? "Stop" : "Read Aloud"}
          </button>
        </motion.div>

        {/* Objective */}
        <div className={`p-5 rounded-2xl border ${themeVars.border} bg-white/[0.02]`}>
          <div className="text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${themeVars.gradient}`} />
              Objective
            </div>
            <button
              onClick={() => speak(`Your objective: ${mission.objective}`, storyType)}
              title="Read objective"
              className={`transition-colors ${isCyber ? "text-cyan-700 hover:text-cyan-400" : "text-purple-700 hover:text-purple-400"}`}
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-white font-medium text-sm">{mission.objective}</p>
        </div>

        {/* Hints */}
        {mission.hints.length > 0 && (
          <div className="mt-auto">
            <div className="text-[10px] uppercase tracking-widest font-bold mb-2 flex items-center gap-2 text-gray-500">
              <Lightbulb className="w-3.5 h-3.5" />
              {isCyber ? "System Hints" : "Arcane Hints"}
            </div>
            <div className="space-y-2">
              {mission.hints.map((hint, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 bg-[#111] p-3.5 rounded-xl border border-white/5 group">
                  <p className="text-gray-400 text-xs leading-relaxed flex-1">{hint}</p>
                  <button
                    onClick={() => speak(`Hint: ${hint}`, storyType)}
                    title="Read hint"
                    className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 ${
                      isCyber ? "text-cyan-600 hover:text-cyan-400" : "text-purple-600 hover:text-purple-400"
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
