"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, AlertCircle, CheckCircle2 } from "lucide-react";

export type TerminalOutput = {
  type: "info" | "success" | "error";
  message: string;
};

interface TerminalProps {
  output: TerminalOutput[];
}

export default function Terminal({ output }: TerminalProps) {
  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
        <TerminalIcon className="w-4 h-4 text-gray-500" />
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Output Console</span>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-2">
        {output.length === 0 ? (
          <div className="text-gray-600 italic">Waiting for execution...</div>
        ) : (
          <AnimatePresence initial={false}>
            {output.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-2 ${
                  line.type === "error" ? "text-red-400" :
                  line.type === "success" ? "text-green-400" :
                  "text-gray-300"
                }`}
              >
                <div className="mt-0.5">
                  {line.type === "error" && <AlertCircle className="w-4 h-4" />}
                  {line.type === "success" && <CheckCircle2 className="w-4 h-4" />}
                  {line.type === "info" && <span className="text-gray-500">{">"}</span>}
                </div>
                <div className="flex-1 whitespace-pre-wrap leading-relaxed">
                  {line.message}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
