"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FaderItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; durationMs: number };

const HOLD_MS = 5000;
const FADE_MS = 1200;

/**
 * Crossfades between several images (and optionally videos) in the same
 * slot. Renders every item stacked on top of each other and animates
 * opacity, so there is no layout shift and the transition itself has no
 * visible "cut". A video item is held for its own clip length instead of
 * the default HOLD_MS, and is played/paused/rewound as it becomes active.
 */
export function HeroImageFader({
  items,
  holdMs = HOLD_MS,
  fadeMs = FADE_MS,
  // The slot is square so a portrait item (the mould photo) fits without cropping;
  // landscape items therefore leave room above and below. Centre them, so they sit
  // level with the text column beside them instead of riding up against the header.
  fit = "object-contain object-center",
  sizes = "(max-width: 1024px) 100vw, 55vw",
}: {
  items: FaderItem[];
  holdMs?: number;
  fadeMs?: number;
  // Tailwind object-fit/position classes for how each item fills the slot.
  fit?: string;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = items[index];
    const hold = current.type === "video" ? current.durationMs : holdMs;
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, hold);
    return () => clearTimeout(id);
  }, [index, items, holdMs]);

  useEffect(() => {
    items.forEach((item, i) => {
      if (item.type !== "video") return;
      const el = videoRefs.current[i];
      if (!el) return;
      if (i === index) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [index, items]);

  return (
    <>
      {items.map((item, i) => {
        const style = {
          transitionDuration: `${fadeMs}ms`,
          opacity: i === index ? 1 : 0,
        };

        if (item.type === "video") {
          return (
            <video
              key={item.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              playsInline
              preload={i === 0 ? "auto" : "none"}
              aria-label={item.alt}
              className={`absolute inset-0 h-full w-full ${fit} transition-opacity ease-in-out`}
              style={style}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          );
        }

        return (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            priority={i === 0}
            className={`${fit} transition-opacity ease-in-out`}
            style={style}
            sizes={sizes}
          />
        );
      })}
    </>
  );
}
