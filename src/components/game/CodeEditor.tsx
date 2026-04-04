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

let isCompletionRegistered = false;

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
          "editor.background": "#00000000",
          "editor.lineHighlightBackground": "#ffffff0a",
          "editorLineNumber.foreground": "#4b5563",
        },
      });
      monaco.editor.setTheme("logiclynx-dark");

      if (!isCompletionRegistered) {
        // Python Autocomplete
        monaco.languages.registerCompletionItemProvider("python", {
          provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            };
            const suggestions: any[] = [
              { label: 'def', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'def ${1:name}(${2:args}):\n\t$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'print', kind: monaco.languages.CompletionItemKind.Function, insertText: 'print($0)', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if ${1:condition}:\n\t$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for ${1:item} in ${2:iterable}:\n\t$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while ${1:condition}:\n\t$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'import', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'import ', range },
              { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return ', range },
              { label: 'range', kind: monaco.languages.CompletionItemKind.Function, insertText: 'range(${1:stop})', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
            ];
            return { suggestions };
          }
        });

        // C Autocomplete
        monaco.languages.registerCompletionItemProvider("c", {
          provideCompletionItems: (model, position) => {
            const word = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            };
            const suggestions: any[] = [
              { label: '#include', kind: monaco.languages.CompletionItemKind.Keyword, insertText: '#include <${1:stdio.h}>\n$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'int main', kind: monaco.languages.CompletionItemKind.Snippet, insertText: 'int main() {\n\t$0\n\treturn 0;\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'printf', kind: monaco.languages.CompletionItemKind.Function, insertText: 'printf("${1:%d}\\n", ${2:var});$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'scanf', kind: monaco.languages.CompletionItemKind.Function, insertText: 'scanf("${1:%d}", &${2:var});$0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if (${1:condition}) {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while (${1:condition}) {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, range },
              { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return ', range },
            ];
            return { suggestions };
          }
        });

        isCompletionRegistered = true;
      }
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
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
}
