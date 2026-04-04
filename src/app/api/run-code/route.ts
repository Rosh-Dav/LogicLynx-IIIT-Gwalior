import { NextRequest, NextResponse } from "next/server";

const GLOT_TOKEN = process.env.NEXT_PUBLIC_GLOT_API_TOKEN;
const GLOT_BASE = "https://glot.io/api/run";

const LANG_MAP: Record<string, { lang: string; fileName: string }> = {
  python: { lang: "python", fileName: "main.py" },
  c:      { lang: "c",      fileName: "main.c"  },
};

export async function POST(req: NextRequest) {
  try {
    const { language, code, testCases } = await req.json();

    if (!code || !language) {
      return NextResponse.json({ error: "Missing language or code" }, { status: 400 });
    }

    const mapped = LANG_MAP[language] ?? LANG_MAP.python;

    // --- LEETCODE STYLE: MULTIPLE STDIN TEST CASES ---
    if (testCases && Array.isArray(testCases) && testCases.length > 0) {
      const results = await Promise.all(testCases.map(async (tc, i) => {
         const res = await fetch(`${GLOT_BASE}/${mapped.lang}/latest`, {
           method: "POST",
           headers: {
             Authorization: `Token ${GLOT_TOKEN}`,
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             files: [{ name: mapped.fileName, content: code }],
             stdin: tc.input || ""
           })
         });
         
         if (!res.ok) {
           return { ...tc, index: i, passed: false, stdout: "", stderr: await res.text(), error: "Compilation Node Failed" };
         }
         
         const data = await res.json();
         const actualOutput = data.stdout || "";
         const hasError = !!(data.stderr?.trim() || data.error?.trim());
         // Simple assertion for now: whether stdout includes the exact expected string
         const passed = !hasError && actualOutput.includes(tc.expectedOutput);
         
         return { 
           ...tc, 
           index: i, 
           passed, 
           stdout: actualOutput, 
           stderr: data.stderr || "", 
           error: data.error || "" 
         };
      }));
      
      return NextResponse.json({ testResults: results });
    }

    // --- LEGACY: SINGLE EXECUTION WITHOUT INPUT ---
    const res = await fetch(`${GLOT_BASE}/${mapped.lang}/latest`, {
      method: "POST",
      headers: {
        Authorization: `Token ${GLOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: [{ name: mapped.fileName, content: code }],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      return NextResponse.json(
        { stdout: "", stderr: "", error: `Glot API ${res.status}: ${text}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { stdout: "", stderr: "", error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
