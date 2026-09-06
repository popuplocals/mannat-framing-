"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { GALLERY_PHOTOS, SITE_VIDEOS } from "@/lib/gallery";
import Lightbox, { type LightboxItem } from "@/components/projects/Lightbox";

const videoItems: LightboxItem[] = SITE_VIDEOS.map((v, i) => ({ kind: "video", src: v.src, poster: v.poster, w: v.w, h: v.h, alt: `Mannat Framing site video ${i + 1}` }));
const photoItems: LightboxItem[] = GALLERY_PHOTOS.map((p) => ({ kind: "image", src: p.src, w: p.w, h: p.h, alt: p.alt }));
const allItems: LightboxItem[] = [...videoItems, ...photoItems];

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
);

/** Hover-to-preview video card: poster until hovered, then the clip plays muted; click opens the lightbox. */
function VideoCard({ v, index, onOpen }: { v: (typeof SITE_VIDEOS)[number]; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const landscape = v.w >= v.h;

  const start = () => {
    const el = ref.current;
    if (!el) return;
    el.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
  };

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      aria-label={`Play site video ${index + 1}`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, ease: EASE, delay: (index % 4) * 0.08 }}
      className={`group relative block w-full cursor-pointer overflow-hidden bg-charcoal text-left transition-shadow duration-[450ms] ease-spring hover:shadow-lift ${
        landscape ? "aspect-video" : "aspect-[9/16]"
      }`}
    >
      <Image src={v.poster} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className={`object-cover transition-[opacity,transform] duration-[600ms] ease-spring group-hover:scale-[1.04] ${playing ? "opacity-0" : "opacity-100"}`} />
      <video
        ref={ref}
        src={v.src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-spring ${playing ? "opacity-100" : "opacity-0"}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.75)_0%,rgba(13,13,13,0)_45%)]" />
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/45 px-2.5 py-[5px] font-mono text-[10px] tracking-[1.5px] text-gold backdrop-blur-[6px]">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold animate-subtle-pulse" />
        {v.seconds}s
      </span>
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-warm-white/30 bg-black/40 text-warm-white backdrop-blur-[6px] transition-[background-color,border-color,color,transform] duration-300 ease-spring group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
        <PlayIcon />
      </span>
      <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[12px] text-warm-white">
        <span className="font-heading font-bold">Site clip {String(index + 1).padStart(2, "0")}</span>
        <span className="text-concrete">{landscape ? "Wide" : "Vertical"}</span>
      </span>
    </motion.button>
  );
}

/** Videos grid + full photo gallery, sharing one lightbox. */
export default function SiteMedia() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* SITE VIDEOS */}
      <section id="videos" className="border-t border-gold/15 bg-black px-5 py-[100px] md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, ease: EASE }} className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-medium tracking-[2.5px] text-gold">SITE FOOTAGE</span>
              <h2 className="m-0 mt-4 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-warm-white">
                Straight from <span className="text-gold">our job sites.</span>
              </h2>
            </div>
            <p className="m-0 max-w-[420px] text-sm leading-[1.7] text-concrete">Hover to preview, tap to watch. Short clips of framing, forming and site work as it happens across the Lower Mainland.</p>
          </motion.div>
          {/* Vertical clips in one row, wide clips in the next — true aspect ratios, no gaps */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SITE_VIDEOS.map((v, i) => (v.h > v.w ? <VideoCard key={v.src} v={v} index={i} onOpen={() => setOpenIndex(i)} /> : null))}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SITE_VIDEOS.map((v, i) => (v.w >= v.h ? <VideoCard key={v.src} v={v} index={i} onOpen={() => setOpenIndex(i)} /> : null))}
          </div>
        </div>
      </section>

      {/* FULL PHOTO GALLERY */}
      <section id="gallery" className="bg-surface px-5 py-[100px] md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, ease: EASE }} className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-medium tracking-[2.5px] text-accent">FULL GALLERY</span>
              <h2 className="m-0 mt-4 font-heading text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] text-ink">
                Every site. <span className="text-accent">Every stage.</span>
              </h2>
            </div>
            <p className="m-0 max-w-[420px] text-sm leading-[1.7] text-ink-2">
              {GALLERY_PHOTOS.length} photos from foundations and formwork to trusses and handover. Tap any photo to view it full size.
            </p>
          </motion.div>
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {GALLERY_PHOTOS.map((p, i) => (
              <motion.button
                key={p.src}
                type="button"
                onClick={() => setOpenIndex(SITE_VIDEOS.length + i)}
                aria-label={`Open ${p.alt}`}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
                className="group relative block w-full cursor-pointer overflow-hidden bg-charcoal transition-shadow duration-[450ms] ease-spring hover:shadow-lift"
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
              >
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-[600ms] ease-spring group-hover:scale-[1.05]" />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.55)_0%,rgba(13,13,13,0)_50%)] opacity-0 transition-opacity duration-[400ms] ease-spring group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] tracking-[1.5px] text-gold opacity-0 transition-[opacity,transform] duration-[400ms] ease-spring translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
                  {String(i + 1).padStart(2, "0")} / {String(GALLERY_PHOTOS.length).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox items={allItems} index={openIndex} onClose={() => setOpenIndex(null)} onIndex={setOpenIndex} />
    </>
  );
}
