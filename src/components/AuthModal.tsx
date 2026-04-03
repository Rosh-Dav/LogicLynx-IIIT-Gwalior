"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const { story, setUser } = useGameStore();

  const handleGuestLogin = () => {
    setUser({ id: "guest-" + Date.now(), name: "Traveler", isGuest: true });
    onClose();
    if (story) {
      router.push("/language");
    } else {
      router.push("/story-selection");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-6"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mt-2">
              <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Welcome, Traveler</h2>
              <p className="text-sm text-gray-400 font-sans">How would you like to begin?</p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <button 
                onClick={handleGuestLogin}
                className="w-full py-4 px-6 rounded-2xl border border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 transition-colors text-purple-400 font-bold text-sm tracking-widest font-sans uppercase shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              >
                CONTINUE AS GUEST
              </button>

              <button 
                onClick={handleGuestLogin} // For mock purposes, normal auth flow would differ
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:opacity-90 transition-opacity text-white font-bold text-sm tracking-widest font-sans uppercase shadow-lg shadow-purple-500/20"
              >
                SIGN UP
              </button>

              <button 
                onClick={handleGuestLogin} // For mock purposes
                className="w-full py-4 px-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-gray-400 font-bold text-sm tracking-widest font-sans uppercase"
              >
                LOGIN
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
