"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AvatarProps {
  storyType: "cyberpunk" | "fantasy";
  isSpeaking: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const AVATAR_URLS = {
  cyberpunk: "/avatars/handler.png",
  fantasy: "/avatars/archmage.png",
};

const SIZE_MAP = {
  sm: "w-14 h-14",
  md: "w-20 h-20",
  lg: "w-28 h-28",
};

export default function Avatar({
  storyType,
  isSpeaking,
  size = "md",
  onClick,
}: AvatarProps) {
  const isCyber = storyType === "cyberpunk";
  const glowColor = isCyber
    ? "rgba(6,182,212,0.6)"
    : "rgba(168,85,247,0.6)";
  const ringColor = isCyber ? "border-cyan-400" : "border-purple-400";
  const sizeClass = SIZE_MAP[size];

  return (
    <div
      className={`relative flex-shrink-0 ${sizeClass} cursor-pointer`}
      onClick={onClick}
      title={isSpeaking ? "Speaking..." : "Click to replay"}
    >
      {/* Outer pulsing ring — only visible when speaking */}
      <AnimatePresence>
        {isSpeaking && (
          <>
            {/* Ring 1 */}
            <motion.div
              key="ring1"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              className={`absolute inset-0 rounded-full border-2 ${ringColor} pointer-events-none`}
            />
            {/* Ring 2 (offset) */}
            <motion.div
              key="ring2"
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
              className={`absolute inset-0 rounded-full border ${ringColor} pointer-events-none`}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main avatar container */}
      <motion.div
        animate={
          isSpeaking
            ? {
                scale: [1, 1.04, 1, 1.04, 1],
                boxShadow: [
                  `0 0 0px ${glowColor}`,
                  `0 0 24px ${glowColor}`,
                  `0 0 8px ${glowColor}`,
                  `0 0 24px ${glowColor}`,
                  `0 0 0px ${glowColor}`,
                ],
              }
            : { scale: 1, boxShadow: `0 0 0px ${glowColor}` }
        }
        transition={
          isSpeaking
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
        <img
          src={AVATAR_URLS[storyType]}
          alt={isCyber ? "AI Handler" : "Archmage Tutor"}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Speaking indicator dot */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${
              isCyber ? "bg-cyan-400" : "bg-purple-400"
            }`}
          >
            {/* Inner wave bars */}
            <div className="flex items-end gap-[2px] h-2.5 px-0.5">
              {[0.2, 0.5, 0.1].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay, ease: "easeInOut" }}
                  className="w-[3px] bg-black rounded-full origin-bottom"
                  style={{ height: "80%" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
