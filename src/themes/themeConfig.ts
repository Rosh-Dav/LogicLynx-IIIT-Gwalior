// Configuration for Cyberpunk and Fantasy themes

export const themes = {
  cyberpunk: {
    background: "bg-[#050510]",
    card: "bg-black/60",
    border: "border-cyan-500/50",
    textPrimary: "text-cyan-400",
    textSecondary: "text-gray-400",
    gradient: "from-blue-600 to-cyan-400",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    headingColor: "text-white",
  },
  fantasy: {
    background: "bg-[#0a0510]",
    card: "bg-black/50",
    border: "border-purple-500/50",
    textPrimary: "text-purple-400",
    textSecondary: "text-gray-400",
    gradient: "from-[#8b5cf6] to-[#d946ef]",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    headingColor: "text-white",
  }
};

export type ThemeName = keyof typeof themes;
