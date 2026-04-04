"use client";

import { motion } from "framer-motion";
import { themes } from "@/themes/themeConfig";
import { useGameStore } from "@/store/useGameStore";
import { Mission } from "@/data/missions";
import { useVoice } from "@/hooks/useVoice";
import Avatar from "@/components/Avatar";
import { Volume2, VolumeX, Lightbulb, Target } from "lucide-react";

interface DialoguePanelProps {
  mission: Mission;
}

export default function DialoguePanel({ mission }: DialoguePanelProps) {
  const { story } = useGameStore();
  const themeVars = story ? themes[story as keyof typeof themes] : themes.cyberpunk;
  const { speak, stop, isSpeaking } = useVoice();

  const isCyber = story === "cyberpunk";
  const storyType = (story ?? "cyberpunk") as "cyberpunk" | "fantasy";

  const toggle = (textToSpeak: string) => {
    isSpeaking ? stop() : speak(textToSpeak.replace(/\n/g, ' '), storyType);
  };

  return (
    <div className={`w-full h-full flex flex-col ${themeVars.background} overflow-hidden rounded-2xl border ${themeVars.border} backdrop-blur-md`}>

      {/* ── Header ── */}
      <div className="p-5 border-b border-white/5 flex items-center gap-4 bg-black/40 flex-shrink-0">
        <Avatar
          storyType={storyType}
          isSpeaking={false} // Removed lip sync mapping since no long text is read here
          size="sm"
          onClick={() => {}}
        />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Current Objective</div>
          <h2 className={`text-lg font-black tracking-tight truncate ${themeVars.headingColor}`}>
            {mission.title}
          </h2>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-6 custom-scrollbar">

        {/* Objective */}
        <div className={`p-6 rounded-2xl border ${themeVars.border} bg-black/40 relative overflow-hidden`}>
          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${themeVars.gradient}`} />
          <div className="flex items-center justify-between mb-4">
            <div className={`text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 ${isCyber ? "text-cyan-400" : "text-purple-400"}`}>
              <Target className="w-4 h-4" />
              Primary Directive
            </div>
            <button
              onClick={() => toggle(`Your objective: ${mission.objective}`)}
              title="Read objective"
              className={`transition-colors ${isCyber ? "text-cyan-600 hover:text-cyan-400" : "text-purple-600 hover:text-purple-400"}`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-gray-200 font-medium text-sm leading-relaxed shadow-sm">{mission.objective}</p>
        </div>

        {/* Hints */}
        {mission.hints && mission.hints.length > 0 && (
          <div className="mt-2">
            <div className="text-[10px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2 text-gray-500">
              <Lightbulb className="w-4 h-4" />
              {isCyber ? "System Hints" : "Arcane Hints"}
            </div>
            <div className="space-y-3">
              {mission.hints.map((hint, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{hint}</p>
                  <button
                    onClick={() => toggle(`Hint: ${hint}`)}
                    title="Read hint"
                    className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 ${
                      isCyber ? "text-cyan-600 hover:text-cyan-400" : "text-purple-600 hover:text-purple-400"
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
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
