"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-[22px] font-sans font-black tracking-widest flex items-center">
          <span className="text-[#a855f7]">LOGIC</span>
          <span className="text-[#06b6d4]">LYNX</span>
        </Link>
        
        <div className="hidden md:flex gap-12 items-center font-sans font-bold text-[11px] tracking-[0.2em] uppercase text-gray-400">
          <Link href="#features" className="hover:text-white transition-colors relative group">
            FEATURES
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#stories" className="hover:text-white transition-colors relative group">
            STORIES
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="#start" className="hover:text-white transition-colors relative group mr-4">
            START
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:opacity-90 transition-all text-white font-bold text-xs shadow-lg">
            PLAY NOW
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
