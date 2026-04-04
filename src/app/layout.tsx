import type { Metadata } from "next";
import { Orbitron, Cinzel } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dual World | Choose Your Path",
  description: "A cinematic game-style landing page.",
};

import AchievementToast from "@/components/AchievementToast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${cinzel.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden font-sans">
        {children}
        <AchievementToast />
      </body>
    </html>
  );
}
