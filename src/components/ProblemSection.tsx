"use client";

import { motion } from "framer-motion";
import { FadeInScroll } from "./FadeInScroll";

export default function ProblemSection() {
  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-black overflow-hidden py-32 z-10">
      
      {/* Background glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeInScroll className="text-center">
          <h2 className="text-3xl md:text-5xl font-cyber text-gray-400 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
            Learning coding feels <span className="text-white font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">boring</span> and <span className="text-red-400 font-bold drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">disconnected</span>.
          </h2>
        </FadeInScroll>
      </div>
    </section>
  );
}
