"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { Mission } from "@/data/missions";
import { BookOpen, CheckCircle2, Shield, ChevronRight, Zap } from "lucide-react";

interface MissionBriefingProps {
  mission: Mission;
  onStart: () => void;
}

type Tab = "explanation" | "tasks" | "rules";

const tabConfig = [
  { id: "explanation" as Tab, label: "Concepts", icon: BookOpen, emoji: "🧠" },
  { id: "tasks" as Tab, label: "Your Tasks", icon: CheckCircle2, emoji: "⚔️" },
  { id: "rules" as Tab, label: "Rules", icon: Shield, emoji: "⚠️" },
];

export default function MissionBriefing({ mission, onStart }: MissionBriefingProps) {
  const { story, lang } = useGameStore();
  const [activeTab, setActiveTab] = useState<Tab>("explanation");

  const isCyber = story === "cyberpunk";
  const isCLang = lang === "c";
  const briefing = mission.briefing;

  const bgImage = story === "cyberpunk" ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg";
  const accentColor = isCyber ? "cyan" : "purple";

  const tabBorder = isCyber ? "border-cyan-500/40" : "border-purple-500/40";
  const tabActive = isCyber
    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
    : "bg-purple-500/20 border-purple-400 text-purple-300";
  const tabInactive = "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5";
  const textAccent = isCyber ? "text-cyan-400" : "text-purple-400";
  const bgAccent = isCyber ? "bg-cyan-500/10" : "bg-purple-500/10";
  const borderAccent = isCyber ? "border-cyan-500/30" : "border-purple-500/30";
  const gradientBar = isCyber ? "from-cyan-500 to-blue-500" : "from-purple-500 to-pink-500";
  const gradientBtn = isCyber
    ? "from-cyan-500 to-blue-600 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
    : "from-purple-500 to-pink-600 shadow-[0_0_30px_rgba(168,85,247,0.5)]";
  const glowDiv = isCyber
    ? "bg-cyan-500/10"
    : "bg-purple-500/10";

  const inlineCode = isCyber
    ? "font-mono text-cyan-300 bg-cyan-500/15 px-1.5 py-0.5 rounded text-xs"
    : "font-mono text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded text-xs";

  const renderText = (text: string) =>
    text.replace(/`([^`]+)`/g, `<code class="${inlineCode}">$1</code>`);

  return (
    <div className="h-screen w-screen relative flex flex-col overflow-hidden bg-[#060610]">
      {/* Full background */}
      <div className="absolute inset-0">
        <motion.img
          src={bgImage}
          alt="bg"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          style={{ opacity: 0.25 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${isCyber ? "bg-cyan-400" : "bg-purple-400"}`}
          style={{ left: `${8 + i * 16}%`, top: `${15 + (i % 4) * 20}%`, opacity: 0.3 }}
          animate={{ y: [-15, 15, -15], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full max-w-3xl mx-auto w-full px-4 py-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgAccent} border ${borderAccent} mb-3`}>
            <Zap className={`w-3.5 h-3.5 ${textAccent}`} />
            <span className={`text-[11px] font-black uppercase tracking-[0.25em] ${textAccent}`}>
              {isCyber ? "Mission Briefing" : "Arcane Brief"}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            {mission.title}
          </h1>
          <p className={`text-sm mt-1 ${textAccent} font-mono opacity-80 uppercase tracking-wider`}>
            Language: {isCLang ? "C" : "Python"}  •  {isCyber ? "Cyberpunk Mode" : "Fantasy Mode"}
          </p>

          {/* Overview pill */}
          {briefing?.overview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`mt-4 p-4 rounded-2xl border ${borderAccent} ${bgAccent} backdrop-blur-sm`}
            >
              <p className="text-gray-200 text-sm leading-relaxed">{briefing.overview}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-4"
        >
          {tabConfig.map((tab) => {
            const hasContent =
              tab.id === "explanation" ? !!briefing?.explanation?.length :
              tab.id === "tasks" ? !!briefing?.tasks?.length :
              !!briefing?.rules?.length;
            if (!hasContent) return null;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                  activeTab === tab.id ? tabActive : tabInactive
                }`}
              >
                <span>{tab.emoji}</span> {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab accent line */}
        <div className={`h-px w-full bg-gradient-to-r from-transparent ${isCyber ? "via-cyan-500/50" : "via-purple-500/50"} to-transparent mb-4`} />

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 pr-1">
          <AnimatePresence mode="wait">
            {activeTab === "explanation" && briefing?.explanation && (
              <motion.div
                key="explanation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4"
              >
                {briefing.explanation.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`p-4 rounded-2xl border ${borderAccent} ${bgAccent} backdrop-blur-sm`}
                  >
                    <div className={`text-sm font-black ${textAccent} mb-1.5`}>{item.concept}</div>
                    <p
                      className="text-gray-300 text-xs leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderText(typeof item.detail === 'string' ? item.detail : '') }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "tasks" && briefing?.tasks && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pb-4"
              >
                {briefing.tasks.map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex gap-3 items-start p-4 rounded-2xl border ${borderAccent} ${bgAccent} backdrop-blur-sm`}
                  >
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${gradientBar} flex items-center justify-center text-xs font-black text-white shadow-lg`}>
                      {i + 1}
                    </span>
                    <span
                      className="text-gray-200 text-sm leading-relaxed pt-0.5"
                      dangerouslySetInnerHTML={{ __html: renderText(task) }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "rules" && briefing?.rules && (
              <motion.div
                key="rules"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pb-4"
              >
                {briefing.rules.map((rule, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 items-start p-4 rounded-2xl border border-amber-500/30 bg-amber-500/8 backdrop-blur-sm"
                  >
                    <span className="flex-shrink-0 text-amber-400 text-base mt-0.5">⚠</span>
                    <span
                      className="text-amber-100/90 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderText(typeof rule === 'string' ? rule : '') }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className={`w-full py-4 bg-gradient-to-r ${gradientBtn} text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl flex items-center justify-center gap-3`}
          >
            {isCyber ? "⚡ Initialize Mission" : "🔮 Begin the Spell"}
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
