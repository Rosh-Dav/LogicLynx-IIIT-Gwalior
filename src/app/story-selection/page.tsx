"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import Navbar from "@/components/Navbar";
import { Sparkles, Zap } from "lucide-react";

export default function StorySelectionPage() {
  const router = useRouter();
  const { setStory } = useGameStore();

  const handleSelect = (story: "cyberpunk" | "fantasy") => {
    setStory(story);
    router.push("/language");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <Navbar />
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black" />


      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">UNIVERSE</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm tracking-widest uppercase">
          Your path dictates the syntax.
        </p>
      </motion.div>

      <div className="z-10 flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        
        {/* Fantasy Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("fantasy")}
          className="flex-1 relative group cursor-pointer overflow-hidden rounded-3xl border border-purple-500/20 bg-black/40 backdrop-blur-sm"
        >
          <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
            <img src="/fantasy-bg.jpg" alt="Fantasy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative p-10 h-[400px] flex flex-col justify-end">
            <div className="absolute top-8 right-8 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/40">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors">Fantasy</h2>
            <p className="text-purple-200/60 text-sm">Weave spells using ancient arcane logic. The leylines await your command.</p>
          </div>
          
          {/* Hover Glow */}
          <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-3xl transition-all duration-300 shadow-[inset_0_0_0_rgba(168,85,247,0)] group-hover:shadow-[inset_0_0_40px_rgba(168,85,247,0.3)]" />
        </motion.div>

        {/* Cyberpunk Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect("cyberpunk")}
          className="flex-1 relative group cursor-pointer overflow-hidden rounded-3xl border border-cyan-500/20 bg-black/40 backdrop-blur-sm"
        >
          <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
            <img src="/cyberpunk-bg.jpg" alt="Cyberpunk" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative p-10 h-[400px] flex flex-col justify-end">
            <div className="absolute top-8 right-8 w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/40">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">Cyberpunk</h2>
            <p className="text-cyan-200/60 text-sm">Hack terminals and bypass physical security in a neon-drenched dystopia.</p>
          </div>

          {/* Hover Glow */}
          <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-3xl transition-all duration-300 shadow-[inset_0_0_0_rgba(6,182,212,0)] group-hover:shadow-[inset_0_0_40px_rgba(6,182,212,0.3)]" />
        </motion.div>

      </div>
    </div>
  );
}
