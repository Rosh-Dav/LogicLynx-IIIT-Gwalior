"use client";

import { motion } from "framer-motion";
import { FadeInScroll } from "./FadeInScroll";

export default function ProblemSection() {
  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-black overflow-hidden py-32 z-10">
      
      {/* Background glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <FadeInScroll className="text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-12">THE PROBLEM</div>
          <h2 className="text-5xl md:text-7xl font-sans text-white max-w-5xl mx-auto leading-[1.1] font-black tracking-tight mb-12">
            Learning coding feels <span className="text-gray-500/80">boring,</span> <br className="hidden md:block" />
            <span className="text-gray-600/80">disconnected,</span> and <span className="text-gray-500/80">repetitive.</span>
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-[#06b6d4] mx-auto opacity-50" />
        </FadeInScroll>
      </div>
    </section>
  );
}
