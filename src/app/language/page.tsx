"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { TerminalSquare, Code2, ChevronLeft } from "lucide-react";
import { themes } from "@/themes/themeConfig";
import { useEffect, useState } from "react";

export default function LanguageSelectionPage() {
  const router = useRouter();
  const { setLang, story } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (lang: "python" | "c") => {
    setLang(lang);
    router.push("/mission"); // Goes to the general welcome screen
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const themeVars = story ? themes[story as keyof typeof themes] : themes.cyberpunk;
  const isCyber = story === "cyberpunk";

  return (
    <div className={`min-h-screen ${themeVars.background || 'bg-black'} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
      
      {/* Background Graphic */}
      {story && (
        <div className="absolute inset-0 opacity-20 pointer-events-none fixed">
          <img 
            src={isCyber ? "/cyberpunk-bg.jpg" : "/fantasy-bg.jpg"} 
            alt="background" 
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-${isCyber ? "cyan" : "purple"}-900/40`} />
        </div>
      )}

      {/* Noise/Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold z-20"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="relative z-10 w-full max-w-4xl pt-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 ${themeVars.headingColor || ''}`}
          >
            Select Your Weapon
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 tracking-widest uppercase text-sm font-bold"
          >
            Each language offers a different challenge.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Python Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect("python")}
            className={`flex-1 relative cursor-pointer overflow-hidden rounded-3xl border border-blue-500/20 bg-black/40 backdrop-blur-md p-10 flex flex-col items-center justify-center text-center group ${story ? themeVars.card : ''}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${isCyber ? 'from-cyan-900/10' : 'from-blue-900/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative w-20 h-20 mb-6 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
              <TerminalSquare className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="relative text-3xl font-black text-white mb-4 tracking-tight">Python</h2>
            <p className="relative text-gray-400 text-sm leading-relaxed mb-6">
              Elegant, readable, and highly versatile. Perfect for rapid script deployment and high-level logic manipulation.
            </p>
            
            <div className="absolute inset-0 shadow-[inset_0_0_0_rgba(59,130,246,0)] group-hover:shadow-[inset_0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 pointer-events-none rounded-3xl" />
          </motion.div>

          {/* C Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect("c")}
            className={`flex-1 relative cursor-pointer overflow-hidden rounded-3xl border border-indigo-500/20 bg-black/40 backdrop-blur-md p-10 flex flex-col items-center justify-center text-center group ${story ? themeVars.card : ''}`}
          >
             <div className={`absolute inset-0 bg-gradient-to-b ${isCyber ? 'from-purple-900/10' : 'from-indigo-900/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

             <div className="relative w-20 h-20 mb-6 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
              <Code2 className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="relative text-3xl font-black text-white mb-4 tracking-tight">C Language</h2>
            <p className="relative text-gray-400 text-sm leading-relaxed mb-6">
              Raw, powerful, and low-level. Control memory directly and write blazing-fast logic at the hardware level.
            </p>
            
            <div className="absolute inset-0 shadow-[inset_0_0_0_rgba(99,102,241,0)] group-hover:shadow-[inset_0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 pointer-events-none rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
