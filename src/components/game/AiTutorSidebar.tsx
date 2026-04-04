"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { streamTutorChat, ChatMessage } from "@/lib/gemini";

interface AiTutorSidebarProps {
  mission: any;
  code: string;
  language: string;
  storyTheme: string;
}

const QUICK_PROMPTS = [
  "Give me a hint 💡",
  "What's wrong?",
  "Explain this",
  "Show example",
];

export default function AiTutorSidebar({
  mission,
  code,
  language,
  storyTheme,
}: AiTutorSidebarProps) {
  const isCyber = storyTheme === "cyberpunk";

  const greeting = isCyber
    ? `Connection established, netrunner. I'm NEXUS — your AI handler.\n\nMission: "${mission?.title ?? "current"}". Ask about your code, logic, or objectives.`
    : `The leylines are open, young mage. I'm ARCANIS, your arcane tutor.\n\nMission: "${mission?.title ?? "current"}". Ask anything — I guide, I don't conjure for you.`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "ai", text: greeting },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeRef     = useRef(code);
  codeRef.current   = code;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 112)}px`;
  }, [input]);

  // ── Theme tokens — LIGHTER tones ────────────────────────────────────────
  const textAcc   = isCyber ? "text-cyan-300"      : "text-purple-300";
  const bgAcc     = isCyber ? "bg-cyan-500/8"      : "bg-purple-500/8";
  const borderAcc = isCyber ? "border-cyan-500/20" : "border-purple-500/20";
  const gradBtn   = isCyber
    ? "from-cyan-500 to-cyan-600 shadow-cyan-500/25"
    : "from-purple-500 to-purple-600 shadow-purple-500/25";
  const chipHover = isCyber ? "hover:bg-cyan-500/15" : "hover:bg-purple-500/15";
  const dotColor  = isCyber ? "bg-cyan-400" : "bg-purple-400";

  // ── Send (with streaming) ───────────────────────────────────────────────
  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const userMsg: ChatMessage = { role: "user", text: msg };
    const historyForApi = messages.slice(1);

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setError("");
    setLoading(true);

    const aiPlaceholder: ChatMessage = { role: "ai", text: "" };
    setMessages(prev => [...prev, aiPlaceholder]);

    try {
      const missionTask =
        mission?.briefing?.tasks?.[0] ??
        mission?.briefing?.overview ??
        mission?.title ??
        "Complete the coding challenge.";

      await streamTutorChat(
        mission?.title ?? "Current Mission",
        missionTask,
        codeRef.current,
        language,
        storyTheme,
        historyForApi,
        msg,
        (chunk) => {
          setMessages(prev => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.role === "ai") {
              updated[updated.length - 1] = { ...last, text: last.text + chunk };
            }
            return updated;
          });
        }
      );
    } catch (err: any) {
      const errMsg = err?.message ?? "Unknown error";
      setError(errMsg);
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === "ai" && !last.text) {
          updated[updated.length - 1] = {
            role: "ai",
            text: isCyber
              ? "⚠ Signal interference. Check the error below."
              : "⚠ The leylines flicker. Check the error below.",
          };
        }
        return updated;
      });
      console.error("[AiTutor] Gemini error:", errMsg);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, mission, language, storyTheme, isCyber]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([{ role: "ai", text: greeting }]);
    setError("");
  };

  return (
    <div className={`flex flex-col h-full bg-[#0f1019] border ${borderAcc} rounded-2xl overflow-hidden`}>

      {/* ─── Header ────────────────────────────────────────────────────── */}
      <div className={`flex-shrink-0 px-4 py-3 border-b ${borderAcc} bg-[#13141f] flex items-center gap-3`}>
        <div className={`relative w-9 h-9 rounded-xl ${isCyber ? "bg-cyan-500/15" : "bg-purple-500/15"} border ${borderAcc} flex items-center justify-center flex-shrink-0`}>
          <Sparkles className={`w-4 h-4 ${textAcc}`} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#13141f]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-black uppercase tracking-[0.15em] ${textAcc} leading-none`}>
            {isCyber ? "NEXUS AI" : "Arcanis"}
          </p>
          <p className="text-[10px] text-gray-400 leading-none mt-1">
            Gemini 2.5 Flash · Streaming
          </p>
        </div>
        <button
          onClick={clearChat}
          title="Clear conversation"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ─── Messages ──────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isAi = msg.role === "ai";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex gap-2.5 items-start ${isAi ? "" : "flex-row-reverse"}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 ${
                  isAi
                    ? `${isCyber ? "bg-cyan-500/15" : "bg-purple-500/15"} border ${borderAcc}`
                    : "bg-white/10 border border-white/15"
                }`}>
                  {isAi
                    ? <Bot className={`w-3.5 h-3.5 ${textAcc}`} />
                    : <User className="w-3.5 h-3.5 text-gray-300" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] px-3.5 py-2.5 text-[12px] leading-[1.65] whitespace-pre-wrap break-words ${
                  isAi
                    ? `${isCyber ? "bg-cyan-500/8 border-cyan-500/15" : "bg-purple-500/8 border-purple-500/15"} border text-gray-100 rounded-2xl rounded-tl-md`
                    : "bg-white/[0.06] border border-white/10 text-gray-100 rounded-2xl rounded-tr-md"
                }`}>
                  {msg.text || (
                    <span className={`inline-block w-1.5 h-4 ${dotColor} animate-pulse rounded-sm`} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing dots */}
        <AnimatePresence>
          {loading && messages[messages.length - 1]?.text === "" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2.5 items-start"
            >
              <div className={`w-7 h-7 rounded-full ${isCyber ? "bg-cyan-500/15" : "bg-purple-500/15"} border ${borderAcc} flex items-center justify-center`}>
                <Bot className={`w-3.5 h-3.5 ${textAcc}`} />
              </div>
              <div className={`px-4 py-3 rounded-2xl rounded-tl-md ${isCyber ? "bg-cyan-500/8 border-cyan-500/15" : "bg-purple-500/8 border-purple-500/15"} border flex items-center gap-1.5`}>
                {[0, 1, 2].map(j => (
                  <motion.span
                    key={j}
                    className={`block w-1.5 h-1.5 rounded-full ${dotColor}`}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="text-[10px] text-red-300/80 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 font-mono break-all">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ─── Quick prompts ─────────────────────────────────────────────── */}
      <div className={`flex-shrink-0 px-3 py-2 border-t ${borderAcc} bg-[#0d0e17] flex gap-1.5 overflow-x-auto scrollbar-none`}>
        {QUICK_PROMPTS.map(p => (
          <button
            key={p}
            onClick={() => send(p)}
            disabled={loading}
            className={`flex-shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-lg ${isCyber ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" : "bg-purple-500/10 border-purple-500/20 text-purple-300"} border ${chipHover} transition-colors disabled:opacity-30 whitespace-nowrap`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ─── Input area ────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-3 pb-3 pt-2">
        <div className={`flex items-end gap-2.5 rounded-xl border ${borderAcc} bg-[#12131e] p-2.5 transition-all focus-within:bg-[#161724] focus-within:border-${isCyber ? "cyan" : "purple"}-500/40`}>
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={isCyber ? "Message NEXUS..." : "Message Arcanis..."}
            disabled={loading}
            className="flex-1 resize-none bg-transparent text-[12.5px] text-gray-100 placeholder-gray-500 focus:outline-none leading-relaxed min-h-[28px] max-h-28 disabled:opacity-40 font-sans"
          />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${gradBtn} shadow-md flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed transition-opacity`}
          >
            {loading
              ? <Loader2 className="w-4 h-4 text-white animate-spin" />
              : <Send className="w-4 h-4 text-white" />
            }
          </motion.button>
        </div>
        <p className="text-center text-[9px] text-gray-500 mt-1.5 tracking-wider">
          ↵ Send · ⇧↵ New line
        </p>
      </div>
    </div>
  );
}
