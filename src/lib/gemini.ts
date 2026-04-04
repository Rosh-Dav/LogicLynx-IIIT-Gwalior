import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

// Models to try in order — if one hits quota, fall back to the next
const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash"];

/** Get the Gemini model instance with a system instruction */
function getModel(systemInstruction: string, modelName?: string) {
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set.");

  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({
    model: modelName || MODELS[0],
    systemInstruction,
  });
}

/** Build system prompt based on story theme + mission context */
function buildSystemPrompt(
  missionTitle: string,
  missionTask: string,
  language: string,
  storyTheme: string
): string {
  const isCyber = storyTheme === "cyberpunk";

  const name = isCyber ? "NEXUS" : "ARCANIS";
  const voice = isCyber
    ? "a no-nonsense AI combat handler and coding tutor. Speak in punchy, hacker-style sentences."
    : "an ancient archmage and coding tutor. Speak in mystical but clear language.";

  return `You are ${name}, ${voice}
You are on a gamified coding platform called LogicLynx.

Current mission: "${missionTitle}"
Objective: ${missionTask}
Language: ${language}

Your rules:
1. NEVER give the complete solution directly. Guide, don't solve.
2. Use progressive hints: first conceptual, then structural, then near-complete.
3. Keep responses concise (2-4 paragraphs max).
4. Be encouraging but not patronizing.
5. If the student's code has a bug, point to the general area without giving the fix.
6. Use code snippets sparingly, and always leave blanks (___) for the student to fill in.
7. Stay in character as ${name} at all times.`;
}

/**
 * Stream a tutor response from Gemini.
 * Calls `onChunk(text)` for each streamed chunk so the UI updates in real-time.
 * Returns the full response text when done.
 */
export async function streamTutorChat(
  missionTitle: string,
  missionTask: string,
  userCode: string,
  language: string,
  storyTheme: string,
  history: ChatMessage[],
  userMessage: string,
  onChunk: (chunk: string) => void
): Promise<string> {
  const systemInstruction = buildSystemPrompt(missionTitle, missionTask, language, storyTheme);

  // Build the user prompt with code context
  let prompt = "";
  if (userCode?.trim()) {
    prompt += `STUDENT'S CURRENT CODE:\n\`\`\`${language}\n${userCode}\n\`\`\`\n\n`;
  }
  if (history.length > 0) {
    prompt += "PREVIOUS CONVERSATION:\n";
    for (const msg of history) {
      prompt += `${msg.role === "user" ? "Student" : "You"}: ${msg.text}\n`;
    }
    prompt += "\n";
  }
  prompt += `STUDENT'S MESSAGE: ${userMessage}`;

  // Try each model in order — fall back on 429 quota errors
  let lastError: any = null;
  for (const modelName of MODELS) {
    try {
      const model = getModel(systemInstruction, modelName);
      const result = await model.generateContentStream(prompt);

      let fullText = "";
      for await (const chunk of result.stream) {
        const text = chunk.text();
        fullText += text;
        onChunk(text);
      }
      return fullText;
    } catch (err: any) {
      lastError = err;
      const is429 = err?.message?.includes("429") || err?.status === 429;
      if (is429) {
        console.warn(`[Gemini] ${modelName} quota exceeded, trying next model...`);
        continue; // try next model
      }
      throw err; // non-quota error, don't retry
    }
  }

  throw lastError ?? new Error("All Gemini models exhausted.");
}

/**
 * Non-streaming version (for simple single-shot use cases like hints).
 */
export async function chatWithAI(
  missionTitle: string,
  missionTask: string,
  userCode: string,
  language: string,
  storyTheme: string,
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  let full = "";
  await streamTutorChat(
    missionTitle,
    missionTask,
    userCode,
    language,
    storyTheme,
    history,
    userMessage,
    (chunk) => { full = chunk; } // not used, we just need final
  );
  return full;
}

export interface ArenaQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

/**
 * Generates an automated trivia quiz using Gemini 2.0 Flash explicitly forced to JSON output.
 */
export async function generateArenaQuiz(count: number = 5): Promise<ArenaQuestion[]> {
  const systemInstruction = "You are an API that returns strictly raw JSON. Output an array of quiz objects. No Markdown backticks, no markdown blocks, no conversational text. You MUST return ONLY valid JSON.";
  const prompt = `Generate ${count} distinct, moderate-difficulty programming trivia questions regarding Python and C strictly.
Include an occasional trick question.
The return must be an array of objects matching this exact signature:
[ { "question": "string", "options": ["A", "B", "C", "D"], "correctIndex": number (0 to 3) } ]`;

  let lastError: any = null;
  for (const modelName of MODELS) {
    try {
      const model = getModel(systemInstruction, modelName);
      const result = await model.generateContent(prompt);
      let text = result.response.text();
      // Safety sanitization against Gemini occasionally adding markdown blocks despite system instructions
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(text) as ArenaQuestion[];
    } catch (err: any) {
      lastError = err;
      const is429 = err?.message?.includes("429") || err?.status === 429;
      if (is429) continue;
      console.error("[Gemini Arena Error] " + err?.message);
      throw err; // Not a quota issue, possibly JSON serialization error on a specific model string
    }
  }

  throw lastError ?? new Error("All Gemini models exhausted or failed to output valid JSON for the Arena.");
}
