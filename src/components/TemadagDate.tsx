"use client";

import { useEffect, useState } from "react";
import { hasPassed } from "@/lib/temadag-dates";

/**
 * One date box on /zink-temadag. The server decides "passed" at render time,
 * but a cached page can be days old when it is served — the first visitor after
 * a quiet spell gets the stale copy while it regenerates. Re-checking in the
 * browser means a date flips to "held" on the day after, whatever the cache.
 */
export function TemadagDate({
  date,
  initialPassed,
  pastLabel,
}: {
  date: string;
  initialPassed: boolean;
  pastLabel: string;
}) {
  const [passed, setPassed] = useState(initialPassed);

  useEffect(() => {
    setPassed(hasPassed(date));
  }, [date]);

  return (
    <div
      className={`relative border-2 px-10 py-8 sm:px-14 sm:py-10 ${
        passed ? "border-zinc-700 bg-zinc-900/30" : "border-ember bg-zinc-900/60"
      }`}
    >
      <span
        className={`text-4xl sm:text-6xl font-bold font-[family-name:var(--font-mono)] tracking-tight ${
          passed ? "text-zinc-500 line-through decoration-2" : "text-white"
        }`}
      >
        {date}
      </span>
      {passed && (
        <span className="mt-3 block text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
          {pastLabel}
        </span>
      )}
    </div>
  );
}
