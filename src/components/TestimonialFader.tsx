"use client";

import { useEffect, useState } from "react";

type Testimonial = { quote: string; author: string; role: string };

const HOLD_MS = 12000;
const FADE_MS = 500;

/**
 * Shows one testimonial at a time, fading out and swapping to the next on
 * an interval. Sequential (not overlapping) so differing quote lengths
 * never need to share layout space at once.
 */
export function TestimonialFader({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(id);
  }, [index, items.length]);

  useEffect(() => {
    if (visible) return;
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setVisible(true);
    }, FADE_MS);
    return () => clearTimeout(id);
  }, [visible, items.length]);

  const current = items[index];

  return (
    <div
      className="max-w-3xl mx-auto text-center transition-opacity ease-in-out"
      style={{ transitionDuration: `${FADE_MS}ms`, opacity: visible ? 1 : 0 }}
    >
      <svg className="h-8 w-8 text-ember/30 mx-auto mb-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
      </svg>
      <blockquote className="text-xl sm:text-2xl font-medium text-zinc-800 leading-snug font-[family-name:var(--font-display)]">
        &ldquo;{current.quote}&rdquo;
      </blockquote>
      <div className="mt-5">
        <div className="text-base font-semibold text-zinc-900">{current.author}</div>
        <div className="text-sm text-zinc-600">{current.role}</div>
      </div>
    </div>
  );
}
