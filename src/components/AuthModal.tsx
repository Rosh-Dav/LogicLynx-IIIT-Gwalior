"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import { supabase } from "@/lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const { story, setUser } = useGameStore();

  const [mode, setMode] = useState<"options" | "login" | "signup" | "guest">("options");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigatePostAuth = () => {
    onClose();
    if (story) {
      router.push("/language");
    } else {
      router.push("/story-selection");
    }
  };

  const handleGuestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      
      setUser({ 
        id: data.user?.id || "guest-" + Date.now(), 
        name: playerName.trim() || "Traveler", 
        isGuest: true 
      });
      navigatePostAuth();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to enter as guest");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      let authResponse;
      if (mode === "signup") {
        authResponse = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: playerName.trim() || email.split("@")[0], is_guest: false }
          }
        });

        if (authResponse.error) throw authResponse.error;
        
        // Supabase returns session: null if email confirmation is required and not yet verified
        if (!authResponse.data.session) {
          setSuccessMsg("Account created! Please check your email to verify before logging in.");
          setMode("login");
          setLoading(false);
          return;
        }

      } else {
        authResponse = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (authResponse.error) throw authResponse.error;
      }

      // Fetch real XP and profile info after login/signup
      let userXp = 0;
      let userName = authResponse.data.user?.user_metadata?.name || email.split("@")[0];

      if (mode === "login") {
        const { data: profile } = await supabase.from('profiles').select('name, xp').eq('id', authResponse.data.user?.id).single();
        if (profile) {
          userXp = profile.xp || 0;
          if (profile.name) userName = profile.name;
        }
      }

      setUser({ 
        id: authResponse.data.user?.id || "", 
        name: userName, 
        isGuest: false 
      });
      
      // Update local XP store immediately
      useGameStore.getState().addXP(userXp - useGameStore.getState().xp); // ensures delta adjusts to exact DB amount
      
      navigatePostAuth();
    } catch (err: any) {
      if (err.message.includes("Email not confirmed")) {
        setErrorMsg("Email not confirmed. Please check your inbox or disable 'Confirm Email' in your Supabase Auth Settings.");
      } else {
        setErrorMsg(err.message || "Authentication failed");
      }
    } finally {
      setLoading(false);
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
              onClick={() => {
                setMode("options");
                setErrorMsg("");
                setSuccessMsg("");
                onClose();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mt-2">
              <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">
                {mode === "options" ? "Welcome, Traveler" : 
                 mode === "login" ? "System Login" : 
                 mode === "guest" ? "Guest Initialization" : "Initialize Account"}
              </h2>
              <p className="text-sm text-gray-400 font-sans">
                {mode === "options" ? "How would you like to begin?" : 
                 mode === "guest" ? "Enter a codename to track your progress locally." : 
                 "Enter your credentials to proceed."}
              </p>
            </div>

            {errorMsg && (
              <div className="w-full bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center font-sans tracking-wide">
                {errorMsg}
              </div>
            )}
            
             {successMsg && (
              <div className="w-full bg-green-500/10 border border-green-500/50 text-green-400 text-sm p-3 rounded-lg text-center font-sans tracking-wide">
                {successMsg}
              </div>
            )}

            {mode === "options" ? (
              <div className="flex flex-col gap-4 mt-2">
                <button 
                  onClick={() => setMode("guest")}
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl border border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 transition-colors text-purple-400 font-bold text-sm tracking-widest font-sans uppercase shadow-[0_0_15px_rgba(168,85,247,0.1)] disabled:opacity-50"
                >
                  CONTINUE AS GUEST
                </button>

                <button 
                  onClick={() => { setMode("signup"); setSuccessMsg(""); }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:opacity-90 transition-opacity text-white font-bold text-sm tracking-widest font-sans uppercase shadow-lg shadow-purple-500/20"
                >
                  SIGN UP
                </button>

                <button 
                  onClick={() => { setMode("login"); setSuccessMsg(""); }}
                  className="w-full py-4 px-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-gray-400 font-bold text-sm tracking-widest font-sans uppercase"
                >
                  LOGIN
                </button>
              </div>
            ) : mode === "guest" ? (
              <form onSubmit={handleGuestLogin} className="flex flex-col gap-4 mt-2">
                 <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Guest Codename (Optional)" 
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 font-sans"
                  />
                </div>
                
                 <button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-4 px-6 rounded-2xl border border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10 transition-colors text-purple-400 font-bold text-sm tracking-widest font-sans uppercase shadow-[0_0_15px_rgba(168,85,247,0.1)] disabled:opacity-50"
                >
                  {loading ? "INITIALIZING..." : "ENTER NEXUS"}
                </button>

                <button 
                  type="button"
                  onClick={() => setMode("options")}
                  className="text-gray-500 text-sm font-sans hover:text-white transition-colors mt-2"
                >
                  ← Back to options
                </button>
              </form>
            ) : (
              <form onSubmit={handleEmailAuth} className="flex flex-col gap-4 mt-2">
                {mode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Username (Optional)" 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full py-4 pl-12 pr-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 font-sans"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 font-sans"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-4 pl-12 pr-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 font-sans"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:opacity-90 transition-opacity text-white font-bold text-sm tracking-widest font-sans uppercase shadow-lg shadow-purple-500/20 disabled:opacity-50"
                >
                  {loading ? "PROCESSING..." : (mode === "login" ? "LOGIN" : "CREATE ACCOUNT")}
                </button>

                <button 
                  type="button"
                  onClick={() => setMode("options")}
                  className="text-gray-500 text-sm font-sans hover:text-white transition-colors mt-2"
                >
                  ← Back to options
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
