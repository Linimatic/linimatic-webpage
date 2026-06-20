"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  // Optional CSS object-position (e.g. "20% center") to control which part of
  // a wide image is shown when it is cropped into the tall slot.
  position?: string;
};

/**
 * Shows several service images side by side in a small format. One image at a
 * time is enlarged: each enlarged image is held for 2 seconds, then a short
 * 2-second pause follows where none is enlarged, before the next one grows.
 * Pointing at (or focusing) an image enlarges that one and pauses the cycle.
 */
export function ServiceImageGallery({ images }: { images: GalleryImage[] }) {
  // active is the index of the enlarged image, or -1 during the short pause.
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const lastShownRef = useRef(0);

  useEffect(() => {
    // Hold the cycle while the visitor is pointing at an image.
    if (hovered !== null) return;
    const id = setTimeout(() => {
      setActive((prev) => {
        if (prev === -1) {
          // The pause is over — enlarge the next image in the row.
          const next = (lastShownRef.current + 1) % images.length;
          lastShownRef.current = next;
          return next;
        }
        // An image has been enlarged for 2s — insert a short pause with none enlarged.
        lastShownRef.current = prev;
        return -1;
      });
    }, 2000);
    return () => clearTimeout(id);
  }, [active, hovered, images.length]);

  const current = hovered ?? active;

  return (
    <div className="flex h-full w-full items-center justify-center gap-4 sm:gap-6 px-6 py-16 lg:py-0">
      {images.map((img, i) => {
        const isActive = i === current;
        return (
          <button
            type="button"
            key={img.src}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => {
              // Resume the cycle from the image the visitor last looked at.
              lastShownRef.current = i;
              setActive(i);
              setHovered(null);
            }}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            aria-label={img.alt}
            className={`relative aspect-[3/4] w-24 shrink-0 cursor-pointer overflow-hidden bg-zinc-200 shadow-md transition-all duration-500 ease-out sm:w-28 lg:w-32 ${
              isActive
                ? "z-20 scale-[2.85] opacity-100 shadow-2xl ring-1 ring-ember"
                : "z-0 scale-100 opacity-60"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 40vw, 260px"
              className="object-cover"
              style={img.position ? { objectPosition: img.position } : undefined}
            />
          </button>
        );
      })}
    </div>
  );
}
