"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  // Random generate particles for fantasy
  const [fantasyParticles, setFantasyParticles] = useState([...Array(15)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 2 + Math.random() * 4,
  })));

  // Cyberpunk scanlines/particles
  const [cyberParticles, setCyberParticles] = useState([...Array(10)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 2,
    height: 10 + Math.random() * 40,
  })));

  return (
    <section className="relative w-full h-screen overflow-hidden flex text-white font-sans bg-black">
      
      {/* LEFT SIDE - FANTASY */}
      <motion.div 
        className="relative h-full overflow-hidden"
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{ flex: hoveredSide === "left" ? 6 : (hoveredSide === "right" ? 4 : 5) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ scale: hoveredSide === "left" ? 1.08 : 1.05 }}
          initial={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/fantasy-bg.jpg"
            alt="Fantasy Background"
            className="absolute inset-0 w-full h-full object-cover object-right opacity-80"
          />
        </motion.div>
        
        {/* Floating Fantasy Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {fantasyParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
              className="absolute bg-purple-300 rounded-full blur-[1px] shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"
              style={{ left: `${p.left}%`, width: p.size, height: p.size }}
            />
          ))}
        </div>

        {/* Shifting Gradient Overlay */}
        <motion.div 
          animate={{ opacity: hoveredSide === "left" ? 0.6 : 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-black/40 to-transparent mix-blend-multiply" 
        />
        
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-900/60 to-transparent pointer-events-none" />
      </motion.div>

      {/* RIGHT SIDE - CYBERPUNK */}
      <motion.div 
        className="relative h-full overflow-hidden"
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{ flex: hoveredSide === "right" ? 6 : (hoveredSide === "left" ? 4 : 5) }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ scale: hoveredSide === "right" ? 1.08 : 1.05 }}
          initial={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/cyberpunk-bg.jpg"
            alt="Cyberpunk Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
          />
        </motion.div>

        {/* Cyberpunk Digital Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {cyberParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: "-20vh", opacity: 0 }}
              animate={{ y: "120vh", opacity: [0, 0.8, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
              className="absolute bg-cyan-400 w-[2px] shadow-[0_0_8px_rgba(6,182,212,0.8)]"
              style={{ left: `${p.left}%`, height: p.height }}
            />
          ))}
        </div>
        
        {/* Shifting Cyberpunk Overlay */}
        <motion.div 
          animate={{ opacity: hoveredSide === "right" ? 0.6 : 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-bl from-cyan-900 via-black/40 to-transparent mix-blend-multiply" 
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />
      </motion.div>

      {/* CENTER OVERLAY (CHOICE) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none pb-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center flex flex-col items-center relative"
        >
          {/* Subtle glow behind title */}
          <motion.div 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-white/5 blur-[50px] rounded-full"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xs md:text-sm uppercase font-sans tracking-[0.3em] text-gray-300 mb-6 drop-shadow-md"
          >
            CODING ISN&apos;T JUST LOGIC...
          </motion.p>

          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-sans font-black tracking-tighter leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Choose Your
          </h1>
          <motion.h1 
            animate={{ opacity: [0.9, 1, 0.85, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-sans font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] pt-2 pb-6 relative"
          >
            Path
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-lg md:text-xl font-sans mt-2 text-gray-300 drop-shadow-md"
          >
            it&apos;s <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 2 }} className="font-bold text-white">power.</motion.span>
          </motion.p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-8 mt-12 px-4 pointer-events-auto">
          {/* Fantasy Button */}
          <motion.button 
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-[#a855f7]/30 bg-black/40 text-[#a855f7] hover:bg-[#a855f7]/10 font-sans font-bold tracking-widest text-sm rounded-2xl backdrop-blur-md transition-all duration-300"
          >
            ✦ ENTER FANTASY
          </motion.button>

          {/* Cyberpunk Button */}
          <motion.button 
            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-[#06b6d4]/30 bg-black/40 text-[#06b6d4] hover:bg-[#06b6d4]/10 font-sans font-bold tracking-widest text-sm rounded-2xl backdrop-blur-md transition-all duration-300"
          >
            ⚡ ENTER CYBERPUNK
          </motion.button>
        </div>

      </div>

    </section>
  );
}
