"use client";

import React from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { themes } from "@/themes/themeConfig";
import { useGameStore } from "@/store/useGameStore";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

export default function CodeEditor({ code, onChange, language = "python" }: CodeEditorProps) {
  const { story } = useGameStore();
  const monaco = useMonaco();
  const themeVars = story ? themes[story as keyof typeof themes] : themes.cyberpunk;

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("logiclynx-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6b7280", fontStyle: "italic" },
          { token: "keyword", foreground: story === "fantasy" ? "c084fc" : "22d3ee" }, // purple-400 vs cyan-400
          { token: "string", foreground: "a3e635" },
        ],
        colors: {
          "editor.background": "#00000000", // transparent, let standard bg show through
          "editor.lineHighlightBackground": "#ffffff0a",
          "editorLineNumber.foreground": "#4b5563",
        },
      });
      monaco.editor.setTheme("logiclynx-dark");
    }
  }, [monaco, story]);

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden border ${themeVars.border} bg-[#050505]/80 backdrop-blur-md pb-4 pt-2`}>
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onChange}
        theme="logiclynx-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          fontFamily: "var(--font-mono), monospace",
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
        }}
      />
    </div>
  );
}
