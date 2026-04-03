"use client";

import { useState, useCallback, useEffect, useRef } from "react";

// Maintain a global array of voices
let voices: SpeechSynthesisVoice[] = [];

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  voices = window.speechSynthesis.getVoices();
  
  window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
  };
}

const getVoice = (name: string) => {
  return voices.find((v) => v.name.includes(name));
};

// Module-level global to prevent Chrome garbage collection mid-speech
let _activeUtterance: SpeechSynthesisUtterance | null = null;

export function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      _activeUtterance = null;
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (mountedRef.current) setIsSpeaking(false);
    _activeUtterance = null;
  }, []);

  const speak = useCallback((text: string, type: "cyberpunk" | "fantasy") => {
    if (!text || typeof window !== "undefined" && !("speechSynthesis" in window)) return;

    // Cancel previous speech before new one
    window.speechSynthesis.cancel();
    
    // Resume synthesis engine in case it's paused
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(text);

    if (type === "cyberpunk") {
      utterance.voice = getVoice("US") || voices[0];
      utterance.rate = 1.15;
      utterance.pitch = 0.95;
    } else {
      // Provide a fallback cascade, defaulting to voices[0] if voices[1] does not exist
      const fallbackVoice = voices.length > 1 ? voices[1] : voices[0];
      utterance.voice = getVoice("Female") || getVoice("UK") || fallbackVoice;
      utterance.rate = 0.85;
      utterance.pitch = 1.4;
    }

    // Add onstart and onend events strictly for React state sync
    utterance.onstart = () => {
      if (mountedRef.current) setIsSpeaking(true);
    };

    utterance.onend = () => {
      if (mountedRef.current) setIsSpeaking(false);
      _activeUtterance = null;
    };

    utterance.onerror = () => {
      if (mountedRef.current) setIsSpeaking(false);
      _activeUtterance = null;
    };

    _activeUtterance = utterance;

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak, stop, isSpeaking };
}
