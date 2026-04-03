"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FadeInScroll } from "./FadeInScroll";
import AuthModal from "./AuthModal";

export default function FinalCTA() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section id="final-cta" className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden py-32 z-10 border-t border-white/5">
      
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <FadeInScroll delay={0.1}>
          
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-sans font-black leading-[1.1] tracking-tight mb-8">
            <div className="text-white">Your journey</div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 pb-2">
              begins now.
            </div>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl font-sans mb-12">
            Choose your world. Write your story. Master the code.
          </p>
          
          <motion.button 
            onClick={() => setIsAuthModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 md:px-12 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-sans font-bold text-sm tracking-widest uppercase rounded-xl transition-shadow shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
          >
            START AS GUEST
          </motion.button>

        </FadeInScroll>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}
