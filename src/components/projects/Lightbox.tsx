"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export type LightboxItem =
  | { kind: "image"; src: string; w: number; h: number; alt: string }
  | { kind: "video"; src: string; poster: string; w: number; h: number; alt: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/** Full-screen viewer for photos and clips: keyboard arrows/Escape, swipe, and a scroll lock while open. */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const item = open ? items[index] : null;
  const touchX = useRef<number | null>(null);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (step: number) => {
      if (index === null || items.length === 0) return;
      setDir(step);
      onIndex((index + step + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Counter */}
          <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[2px] text-concrete md:left-8 md:top-7">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>

          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/20 bg-black/40 text-warm-white transition-[background-color,border-color,transform] duration-300 ease-spring hover:border-gold hover:bg-gold hover:text-black active:scale-90 md:right-7 md:top-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-warm-white/20 bg-black/40 text-warm-white transition-[background-color,border-color,transform] duration-300 ease-spring hover:border-gold hover:bg-gold hover:text-black active:scale-90 md:left-6 md:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-warm-white/20 bg-black/40 text-warm-white transition-[background-color,border-color,transform] duration-300 ease-spring hover:border-gold hover:bg-gold hover:text-black active:scale-90 md:right-6 md:flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
              </button>
            </>
          )}

          {/* Media */}
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={item.src}
              custom={dir}
              initial={{ opacity: 0, x: 40 * dir, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40 * dir, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full max-w-full items-center justify-center"
              style={{ aspectRatio: `${item.w} / ${item.h}`, width: "min(100%, calc((100vh - 80px) * " + item.w / item.h + "))" }}
            >
              {item.kind === "image" ? (
                <Image src={item.src} alt={item.alt} width={item.w} height={item.h} sizes="100vw" className="h-auto max-h-[calc(100vh-80px)] w-auto max-w-full object-contain shadow-lift" priority />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[calc(100vh-80px)] w-auto max-w-full bg-black shadow-lift"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
