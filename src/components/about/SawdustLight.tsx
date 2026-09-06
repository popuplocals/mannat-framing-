"use client";

import { useEffect, useRef } from "react";

/**
 * "Sawdust in light": warm particles drifting through a faint diagonal light shaft, dimmed
 * wherever they pass behind the section's text. Vanilla canvas on a delta-time RAF loop.
 *
 * Mount as the first child of the section (which must be `position: relative; isolation: isolate`
 * so the `-z-10` canvas sits above the section's CSS grid background and below the content).
 * Listeners attach to the parent section; the canvas is pointer-events: none.
 * Dev aid: `?debugzone=1` outlines the computed quiet zones.
 */

const DUST = "236,206,150";
const SHAFT = "232,200,140";
const SHAFT_HALF = 170;
const ZONE_INSIDE = 0.15; // brief said 0.25; lowered so the grey descriptions keep WCAG AA even where a particle crosses a grid line (4.82:1)
const ZONE_RAMP = 36;
const CURSOR_R = 80, CURSOR_FORCE = 70;

type P = { x: number; y: number; r: number; base: number; vx: number; vy: number; wob: number; sway: number; ph: number; tw: number };
type Rect = { x1: number; y1: number; x2: number; y2: number };

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const countFor = (vw: number) => (vw < 768 ? 40 : vw < 1024 ? 70 : vw < 1280 ? 110 : 170);

export default function SawdustLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const debug = () => /[?&]debugzone=1/.test(window.location.search);

    const st = {
      W: 0, H: 0, dpr: 1, mobile: false,
      zones: [] as Rect[],
      particles: [] as P[],
      cursor: null as { x: number; y: number } | null,
      raf: 0, lastT: 0, onScreen: true, t: 0, running: false,
      frameMs: 0, frameN: 0, avgMs: 0,
    };

    const makeParticle = (randomY = true): P => ({
      x: rnd(0, st.W), y: randomY ? rnd(0, st.H) : -4,
      r: rnd(0.5, 2), base: rnd(0.18, 0.68),
      vx: rnd(6, 18), vy: rnd(2, 9), wob: rnd(4, 8), sway: rnd(0.5, 1.5),
      ph: rnd(0, Math.PI * 2), tw: rnd(0, Math.PI * 2),
    });

    // ---------- quiet zones from the live DOM ----------
    // Text extents (a Range over the contents) rather than block boxes, so a full-width heading
    // or title only claims the space its glyphs actually occupy.
    const textRect = (el: Element) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const b = range.getBoundingClientRect();
      return b.width > 0 && b.height > 0 ? b : el.getBoundingClientRect();
    };
    const union = (els: Element[], base: DOMRect): Rect | null => {
      let r: Rect | null = null;
      for (const el of els) {
        const b = textRect(el);
        if (b.width === 0 && b.height === 0) continue;
        const z = { x1: b.left - base.left, y1: b.top - base.top, x2: b.right - base.left, y2: b.bottom - base.top };
        r = r ? { x1: Math.min(r.x1, z.x1), y1: Math.min(r.y1, z.y1), x2: Math.max(r.x2, z.x2), y2: Math.max(r.y2, z.y2) } : z;
      }
      return r;
    };
    const computeZones = (base: DOMRect) => {
      const h2 = section.querySelector("h2");
      const eyebrow = h2?.previousElementSibling;
      const heading = union([eyebrow, h2].filter(Boolean) as Element[], base);
      const rows = union(
        [...section.querySelectorAll("h3")].flatMap((h3) => [h3, h3.nextElementSibling].filter(Boolean) as Element[]),
        base
      );
      st.zones = [heading, rows].filter(Boolean) as Rect[];
    };
    const zoneFactor = (x: number, y: number) => {
      let f = 1;
      for (const z of st.zones) {
        const dx = Math.max(z.x1 - x, 0, x - z.x2), dy = Math.max(z.y1 - y, 0, y - z.y2);
        const d = dx === 0 && dy === 0 ? 0 : Math.hypot(dx, dy);
        const zf = d === 0 ? ZONE_INSIDE : d >= ZONE_RAMP ? 1 : ZONE_INSIDE + (1 - ZONE_INSIDE) * (d / ZONE_RAMP);
        if (zf < f) f = zf;
      }
      return f;
    };

    // ---------- light shaft ----------
    const shaftTopX = () => st.W * 0.68, shaftBotX = () => st.W * 0.34;
    /** Perpendicular distance from a point to the shaft centreline. */
    const shaftDist = (x: number, y: number) => {
      const ax = shaftTopX(), ay = 0, bx = shaftBotX(), by = st.H;
      const vx = bx - ax, vy = by - ay, len = Math.hypot(vx, vy) || 1;
      return Math.abs((x - ax) * vy - (y - ay) * vx) / len;
    };
    const drawShaft = () => {
      const ax = shaftTopX(), bx = shaftBotX();
      const vx = bx - ax, vy = st.H, len = Math.hypot(vx, vy) || 1;
      const nx = -vy / len, ny = vx / len; // unit normal
      const layers = [[0, 0.035], [-40, 0.025], [40, 0.025], [-80, 0.015], [80, 0.015]] as const;
      ctx.lineWidth = 52; ctx.lineCap = "butt";
      for (const [off, a] of layers) {
        ctx.strokeStyle = `rgba(${SHAFT},${a})`;
        ctx.beginPath();
        ctx.moveTo(ax + nx * off, 0 + ny * off);
        ctx.lineTo(bx + nx * off, st.H + ny * off);
        ctx.stroke();
      }
    };

    // ---------- sizing ----------
    const measure = () => {
      const r = section.getBoundingClientRect();
      st.W = r.width; st.H = r.height;
      st.dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(st.W * st.dpr); canvas.height = Math.round(st.H * st.dpr);
      canvas.style.width = `${st.W}px`; canvas.style.height = `${st.H}px`;
      st.mobile = window.innerWidth < 768;
      computeZones(r);
      const n = countFor(window.innerWidth);
      while (st.particles.length < n) st.particles.push(makeParticle(true));
      if (st.particles.length > n) st.particles.length = n;
      for (const p of st.particles) { p.x = ((p.x % st.W) + st.W) % st.W; p.y = ((p.y % st.H) + st.H) % st.H; }
      if (reduced) { stopLoop(); drawFrame(0); } else startLoop();
    };

    // ---------- frame ----------
    const drawFrame = (dt: number) => {
      const t0 = performance.now();
      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
      ctx.clearRect(0, 0, st.W, st.H);
      drawShaft();
      st.t += dt;
      const useCursor = !reduced && !st.mobile && st.cursor;
      for (const p of st.particles) {
        if (dt > 0) {
          p.ph += dt * 1.5;
          const vx = p.vx + p.wob * Math.sin(p.ph * 0.7);
          const vy = p.vy * (1 + 0.35 * Math.cos(p.ph * 0.4 + p.sway));
          p.x += vx * dt; p.y += vy * dt;
          if (useCursor) {
            const dx = p.x - st.cursor!.x, dy = p.y - st.cursor!.y, d = Math.hypot(dx, dy);
            if (d < CURSOR_R && d > 0.001) { const f = CURSOR_FORCE * (1 - d / CURSOR_R) * dt; p.x += (dx / d) * f; p.y += (dy / d) * f; }
          }
          if (p.x > st.W + 4) p.x = -4;
          if (p.x < -4) p.x = st.W + 4;
          if (p.y > st.H + 4) { p.y = -4; p.x = rnd(0, st.W); }
        }
        // brightness: shaft falloff, twinkle, quiet zones
        const sd = shaftDist(p.x, p.y);
        const edge = clamp((sd - (SHAFT_HALF - 20)) / 60, 0, 1); // soft edge around the 170px half-width
        const bright = 1 - 0.72 * edge;
        const size = p.r * (1.2 - 0.2 * edge);
        const twinkle = 0.65 + 0.35 * Math.sin(p.ph * 2.2 + p.tw);
        const a = p.base * twinkle * bright * zoneFactor(p.x, p.y);
        ctx.fillStyle = `rgba(${DUST},${a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fill();
      }
      if (debug()) {
        ctx.save(); ctx.setLineDash([6, 4]); ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255,60,60,0.9)";
        for (const z of st.zones) ctx.strokeRect(z.x1, z.y1, z.x2 - z.x1, z.y2 - z.y1);
        ctx.restore();
      }
      const ms = performance.now() - t0;
      st.frameMs += ms; st.frameN++;
      if (st.frameN === 120) { st.avgMs = st.frameMs / 120; st.frameMs = 0; st.frameN = 0; }
    };

    // Dev-only introspection (used by the verification script): live stats under window.__sd
    if (debug()) {
      Object.defineProperty(window, "__sd", {
        configurable: true,
        get: () => ({ frameMs: st.avgMs, count: st.particles.length, zones: st.zones, running: st.running, particles: st.particles.map((p) => [p.x, p.y]) }),
      });
    }

    const loop = (now: number) => {
      st.raf = 0;
      if (!st.onScreen || reduced) { st.running = false; return; }
      const dt = Math.min(50, now - st.lastT) / 1000;
      st.lastT = now;
      drawFrame(dt);
      st.raf = requestAnimationFrame(loop);
    };
    const startLoop = () => { if (st.raf || reduced || !st.onScreen) return; st.lastT = performance.now(); st.running = true; st.raf = requestAnimationFrame(loop); };
    const stopLoop = () => { if (st.raf) cancelAnimationFrame(st.raf); st.raf = 0; st.running = false; };

    // ---------- listeners ----------
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      st.cursor = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { st.cursor = null; };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    const io = new IntersectionObserver((entries) => {
      st.onScreen = !!entries[0]?.isIntersecting;
      if (st.onScreen) startLoop(); else stopLoop();
    }, { threshold: 0 });
    io.observe(section);
    measure();
    const late = window.setTimeout(measure, 1800); // zones again once the row reveals have settled

    return () => {
      stopLoop();
      window.clearTimeout(late);
      ro.disconnect(); io.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />;
}
