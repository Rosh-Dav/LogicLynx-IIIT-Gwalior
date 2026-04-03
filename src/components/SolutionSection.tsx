"use client";

import { motion } from "framer-motion";
import { FadeInScroll } from "./FadeInScroll";
import MagneticButton from "./MagneticButton";
import { Check } from "lucide-react";

export default function SolutionSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden py-24 z-10">
      
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <FadeInScroll delay={0.1} className="mb-24 text-center">
          <h2 className="text-4xl md:text-5xl font-fantasy text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Write code to progress the story.
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto opacity-50" />
        </FadeInScroll>

        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: STORY PANEL */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <h3 className="text-purple-400 font-cyber tracking-widest text-sm uppercase">Story</h3>
            </div>

            {/* Content Boxes */}
            <div className="flex flex-col gap-6">
              {/* Dialogue Box */}
              <div className="bg-white/[0.02] backdrop-blur-3xl rounded-2xl border border-white/10 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-1">
                <div className="text-gray-400 font-sans text-sm mb-2">Wizard Eldara</div>
                <p className="text-gray-200 font-sans leading-relaxed text-lg">
                  &quot;The ancient gate requires a sorting spell. Arrange these runes by power level to unlock the path.&quot;
                </p>
              </div>

              {/* Objective Box */}
              <div className="bg-white/[0.02] backdrop-blur-3xl rounded-2xl border border-white/10 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-1">
                <div className="text-gray-400 font-sans text-sm mb-2">Quest Objective</div>
                <p className="text-purple-400 font-mono text-base flex items-center gap-2">
                  <span className="opacity-70">&rarr;</span> Implement bubble_sort() to arrange the runes
                </p>
              </div>
            </div>
            
          </motion.div>

          {/* RIGHT: CODE EDITOR PANEL */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-[1.2] flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              <h3 className="text-cyan-400 font-cyber tracking-widest text-sm uppercase">Code Editor</h3>
            </div>

            {/* Editor Box */}
            <div className="bg-[#0c0c0c] rounded-2xl border border-white/10 shadow-[0_8px_40px_rgb(0,0,0,0.5)] flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1">
              
              <div className="p-8 pb-4 bg-[#0c0c0c]/90 flex-1 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                <div className="relative text-[#e6edf3]">
                  <div><span className="text-[#d2a8ff]">def</span> <span className="text-[#a5d6ff]">bubble_sort</span>(runes):</div>
                  <div className="pl-6"><span className="text-[#79c0ff]">n</span> <span className="text-[#ff7b72]">=</span> <span className="text-[#d2a8ff]">len</span>(runes)</div>
                  <div className="pl-6"><span className="text-[#ff7b72]">for</span> i <span className="text-[#ff7b72]">in</span> <span className="text-[#d2a8ff]">range</span>(<span className="text-[#79c0ff]">n</span>):</div>
                  <div className="pl-12"><span className="text-[#ff7b72]">for</span> j <span className="text-[#ff7b72]">in</span> <span className="text-[#d2a8ff]">range</span>(<span className="text-[#79c0ff]">0</span>, <span className="text-[#79c0ff]">n</span><span className="text-[#ff7b72]">-</span>i<span className="text-[#ff7b72]">-</span><span className="text-[#79c0ff]">1</span>):</div>
                  <div className="pl-16"><span className="text-[#ff7b72]">if</span> runes[j] <span className="text-[#ff7b72]">&gt;</span> runes[j<span className="text-[#ff7b72]">+</span><span className="text-[#79c0ff]">1</span>]:</div>
                  <div className="pl-20">runes[j], runes[j<span className="text-[#ff7b72]">+</span><span className="text-[#79c0ff]">1</span>] <span className="text-[#ff7b72]">=</span> runes[j<span className="text-[#ff7b72]">+</span><span className="text-[#79c0ff]">1</span>], runes[j]</div>
                  <div className="pl-6 mt-2"><span className="text-[#ff7b72]">return</span> runes</div>
                </div>
              </div>
              
              {/* Output / Success Area */}
              <div className="px-8 pb-8 flex items-center gap-2 text-cyan-400 font-mono text-sm sm:text-base mt-4">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>All runes sorted! Gate unlocked.</span>
              </div>
              
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
