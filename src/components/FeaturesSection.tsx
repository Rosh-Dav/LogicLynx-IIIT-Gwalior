"use client";

import { motion } from "framer-motion";
import { Terminal, Lightbulb, Zap, Swords } from "lucide-react";
import { FadeInScroll } from "./FadeInScroll";

export default function FeaturesSection() {
  const features = [
    {
      title: "Learn Python & C",
      description: "Master real-world programming languages through immersive storytelling instead of dry tutorials.",
      icon: <Terminal className="w-8 h-8 text-cyan-400" />,
      glowColor: "hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] border-cyan-400/20 hover:border-cyan-400/50",
      iconBg: "bg-cyan-400/10"
    },
    {
      title: "Gamified Levels",
      description: "Progress through distinct zones. Defeat bosses by finding logic errors and deploying optimized functions.",
      icon: <Swords className="w-8 h-8 text-purple-400" />,
      glowColor: "hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] border-purple-400/20 hover:border-purple-400/50",
      iconBg: "bg-purple-400/10"
    },
    {
      title: "Real-time Execution",
      description: "See the effects of your code instantly. An integrated compiler runs your logic against the game world.",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      glowColor: "hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] border-yellow-400/20 hover:border-yellow-400/50",
      iconBg: "bg-yellow-400/10"
    },
    {
      title: "XP & Progression",
      description: "Earn experience points for clean code. Unlock new abilities, terminal skins, and lore entries.",
      icon: <Lightbulb className="w-8 h-8 text-green-400" />,
      glowColor: "hover:shadow-[0_0_40px_rgba(74,222,128,0.4)] border-green-400/20 hover:border-green-400/50",
      iconBg: "bg-green-400/10"
    }
  ];

  return (
    <section id="features" className="relative w-full py-32 bg-[#050505] overflow-hidden z-10 border-t border-white/5">
      
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 to-transparent blur-[80px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <FadeInScroll className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-cyber uppercase tracking-widest text-white mb-6 drop-shadow-sm">
            Core Mechanics
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto opacity-70" />
        </FadeInScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white/[0.02] backdrop-blur-3xl p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${feature.glowColor}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-inner ${feature.iconBg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-fantasy text-white mb-4 tracking-wider transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 font-sans leading-relaxed text-sm">
                {feature.description}
              </p>
              
              {/* Subtle hover gradient sweep inside card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
