"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { themes } from "@/themes/themeConfig";
import { useVoice } from "@/hooks/useVoice";
import { useTypewriter } from "@/hooks/useTypewriter";
import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";
import { Play, Volume2, VolumeX } from "lucide-react";

const WELCOME_LINES: Record<string, (name: string) => string> = {
  cyberpunk: (name) =>
    `Initializing connection, ${name}. I am your handler. The megacorp firewall is live — your mission is to crack the core logic before their security traces you back. Choose your node. I will guide you through every exploit.`,
  fantasy: (name) =>
    `Greetings, ${name}. I am your archmage guide. The ancient tomes await you. Each trial will test your mastery of the arcane syntax. Focus your mana, and the leylines shall speak through you.`,
};

export default function MissionBriefingPage() {
  const router = useRouter();
  const { story, lang, user } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const { speak, stop, isSpeaking } = useVoice();
  // Store speak in a ref so auto-play effect never has stale deps
  const speakRef = useRef(speak);
  speakRef.current = speak;

  useEffect(() => { setMounted(true); }, []);

  const isCyber = story === "cyberpunk";
  const name = user?.name || (isCyber ? "NetRunner" : "Traveler");
  const storyType = (story ?? "cyberpunk") as "cyberpunk" | "fantasy";
  const line = (story && WELCOME_LINES[story]?.(name)) ?? "";

  // Typewriter kicks in after card animation (500ms delay)
  const { displayedText, isDone } = useTypewriter(line, 24, 500);

  // ── AUTO-SPEAK: fires once when page is ready ─────────────────────────────
  useEffect(() => {
    if (!mounted || !story || !line) return;
    // 700ms lets the entry animation finish before voice starts
    const timer = setTimeout(() => {
      speakRef.current(line, storyType);
    }, 700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, story]); // intentionally minimal deps

  if (!mounted) return <div className="min-h-screen bg-black" />;
  if (!story || !lang) { router.push("/"); return null; }

  const themeVars = themes[story as keyof typeof themes];

  return (
    <div
      className={`min-h-screen ${themeVars.background} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}
    >
      <Navbar />
      
      {/* Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src={isCyber ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg"}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-${isCyber ? "cyan" : "purple"}-900/40`} />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`z-10 relative max-w-4xl w-full ${themeVars.card} border ${themeVars.border} rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl ${themeVars.glow}`}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar — click to replay */}
          <Avatar
            storyType={storyType}
            isSpeaking={isSpeaking}
            size="lg"
            onClick={() => isSpeaking ? stop() : speak(line, storyType)}
          />

          <div className="flex-1">
            <div className={`text-xs uppercase tracking-widest font-bold mb-2 ${isCyber ? "text-cyan-400" : "text-purple-400"}`}>
              {isCyber ? "INCOMING TRANSMISSION" : "ARCANE MESSENGER"} • {lang.toUpperCase()}
            </div>

            <h1 className={`text-4xl font-black mb-1 tracking-tight ${themeVars.headingColor}`}>
              Welcome, {name}
            </h1>
            <p className="text-gray-500 text-xs tracking-widest uppercase mb-6">
              {isCyber ? "System Initializing..." : "The Leylines Awaken..."}
            </p>

            {/* Typewriter dialogue box */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-5 relative shadow-inner min-h-[110px]">
              {/* Speech bubble notch */}
              <div className="absolute -left-3 top-8 w-0 h-0 border-[6px] border-transparent border-r-white/10 border-r-black/40" />
              <p className="text-base leading-relaxed text-gray-200 italic font-serif">
                &ldquo;{displayedText}
                {!isDone && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.55, repeat: Infinity }}
                    className={`inline-block w-[2px] h-[1em] ml-0.5 align-middle ${isCyber ? "bg-cyan-400" : "bg-purple-400"}`}
                  />
                )}
                {isDone && "\u201d"}
              </p>
            </div>

            {/* Voice control */}
            <button
              onClick={() => isSpeaking ? stop() : speak(line, storyType)}
              className={`mb-6 flex items-center gap-2 text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-xl border transition-all duration-200 ${
                isSpeaking
                  ? isCyber
                    ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                    : "border-purple-400 text-purple-400 bg-purple-400/10"
                  : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
              }`}
            >
              {isSpeaking ? <><VolumeX className="w-3.5 h-3.5" /> Stop Voice</> : <><Volume2 className="w-3.5 h-3.5" /> Replay Voice</>}
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { stop(); router.push("/map"); }}
              className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-3 bg-gradient-to-r ${themeVars.gradient} text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              Open Level Map <Play className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
