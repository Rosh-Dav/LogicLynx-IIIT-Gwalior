export interface GlotResult {
  stdout: string;
  stderr: string;
  error:  string;
}

/**
 * Execute code via our server-side proxy at /api/run-code
 * (avoids CORS — the proxy calls Glot.io server-to-server)
 */
export async function runCode(language: string, code: string): Promise<GlotResult> {
  const res = await fetch("/api/run-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, code }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || `Server error ${res.status}`);
  }

  return data as GlotResult;
}
