"use client";

import { useEffect, useState } from "react";

/**
 * Reveals `text` character by character at `speed` ms per character.
 * Returns { displayedText, isDone }.
 * Restarts automatically whenever `text` changes.
 */
export function useTypewriter(text: string, speed = 28, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    let current = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const start = () => {
      const tick = () => {
        current += 1;
        setDisplayedText(text.slice(0, current));
        if (current < text.length) {
          timeoutId = setTimeout(tick, speed);
        } else {
          setIsDone(true);
        }
      };
      timeoutId = setTimeout(tick, speed);
    };

    const delayId = setTimeout(start, startDelay);

    return () => {
      clearTimeout(delayId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isDone };
}
