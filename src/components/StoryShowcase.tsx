"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StoryShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} id="stories" className="relative w-full py-32 bg-black overflow-hidden flex flex-col gap-32">
      
      {/* Background Parallax Element */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-0 left-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-cyan-900/40" />
      </motion.div>

      {/* Fantasy Block */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden glass shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-indigo-900 mix-blend-overlay" />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop" 
              alt="Magical Fantasy" 
              className="w-full h-full object-cover opacity-60" 
            />
            {/* Floating particles */}
            <motion.div 
              animate={{ y: [0, -20, 0], scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-purple-400 blur-xl"
            />
            <motion.div 
              animate={{ y: [0, 30, 0], scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-indigo-400 blur-xl"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 space-y-6"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-4xl md:text-6xl font-fantasy font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-600 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          >
            Master Spells <br/> Through Code
          </motion.h2>
          <p className="text-gray-400 text-lg md:text-xl font-sans leading-relaxed">
            In the ancient realm of Aethelgard, grimoires are written in syntax. Loop through element arrays to cast fireballs, and design recursive shields to protect your allies. 
          </p>
          <motion.button 
            whileHover={{ x: 10, textShadow: "0 0 8px rgba(168,85,247,0.8)" }}
            className="text-purple-400 hover:text-purple-300 tracking-wider flex items-center gap-2 uppercase font-cyber text-sm transition-all"
          >
            Explore Fantasy Lore &rarr;
          </motion.button>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div 
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="w-full flex justify-center opacity-30 origin-top"
      >
        <div className="w-px h-24 bg-gradient-to-b from-purple-500 via-gray-500 to-cyan-500" />
      </motion.div>

      {/* Cyberpunk Block */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row-reverse items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden glass shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] border border-cyan-500/20 transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-900 to-cyan-900 mix-blend-overlay opacity-80" />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1000&auto=format&fit=crop" 
              alt="Cyberpunk City" 
              className="w-full h-full object-cover opacity-50 grayscale contrast-125" 
            />
            {/* Scanlines inside image */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
            
            {/* UI overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-4 left-4 font-mono text-cyan-400 text-xs flex flex-col gap-1 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]"
            >
              <span>&gt; SYSTEM BREACH... [OK]</span>
              <span>&gt; ACQUIRING TARGET...</span>
              <span className="w-2 h-4 bg-cyan-400 animate-pulse mt-1 inline-block" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 space-y-6"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-4xl md:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-600 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] glitch-effect" data-text="Hack Systems With Logic"
          >
            Hack Systems <br/> With Logic
          </motion.h2>
          <p className="text-gray-400 text-lg md:text-xl font-sans leading-relaxed">
            In Sector 7, megacorporations control the data. Write advanced algorithms to bypass neural-firewalls, crack secure endpoints, and unravel the conspiracy in the dark net.
          </p>
          <motion.button 
            whileHover={{ x: -10, textShadow: "0 0 8px rgba(6,182,212,0.8)" }}
            className="text-cyan-400 hover:text-cyan-300 tracking-wider flex items-center gap-2 uppercase font-cyber text-sm transition-all"
          >
            &larr; Explore Cyberpunk Lore
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
}
