"use client";

import { useEffect, useRef } from "react";

/**
 * "Living blueprint" background for the Get in Touch band: wood-framing wireframes (stud walls,
 * roof trusses, floor joists) that continuously pen-draw themselves in thin gold lines, with a
 * readability guard that dims anything behind the copy. Vanilla canvas on a delta-time RAF loop.
 *
 * Mount as a child of the section (a `position: relative` element) before the content; listeners
 * attach to the parent section, the canvas itself is pointer-events: none.
 * Dev aid: append `?debugzone=1` to the URL (or set `window.__debugZone = true`) to outline the quiet zone.
 */

const GOLD = "201,169,97";
const DOT = "rgba(255,235,190,0.85)";
const STRUCTURES = 7;
const ZONE = { x1: 0.22, x2: 0.78, y1: 0.14, y2: 0.86 };
const ZONE_INSIDE = 0.2; // 0.22 in the brief; lowered so two crossing lines at the glow centre still pass WCAG AA (gold 4.52:1)
const ZONE_RAMP = 48;
const CURSOR_RADIUS = 120;
const GRID = 44;

type Seg = [number, number, number, number];
type Structure = {
  x: number; y: number; w: number; h: number;
  segs: Seg[]; cum: number[]; total: number;
  depth: number; drift: number;
  phase: "draw" | "hold" | "fade"; t: number; drawMs: number; holdMs: number; fadeMs: number;
  delay: number;
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const rndInt = (a: number, b: number) => Math.floor(rnd(a, b + 1));

// ---------- generators (local coords, origin top-left) ----------
function studWall(): { w: number; h: number; segs: Seg[] } {
  const w = rnd(200, 360), h = rnd(100, 150), n = rndInt(4, 7);
  const segs: Seg[] = [];
  segs.push([0, h, w, h]); // bottom plate
  segs.push([0, 0, w, 0], [0, 6, w, 6]); // double top plate
  for (let i = 0; i <= n; i++) { const x = (w / n) * i; segs.push([x, 6, x, h]); }
  if (Math.random() < 0.55) { // window opening between studs 2 and 4
    const x2 = (w / n) * 2, x4 = (w / n) * 4;
    segs.push([x2, h * 0.3, x4, h * 0.3], [x2, h * 0.66, x4, h * 0.66]);
  }
  if (Math.random() < 0.5) segs.push([0, h, w * 0.42, 6]); // diagonal brace, corner to top
  return { w, h, segs };
}
function roofTruss(): { w: number; h: number; segs: Seg[] } {
  const w = rnd(220, 360), h = rnd(64, 108), m = w / 2;
  const segs: Seg[] = [
    [0, h, w, h], // bottom chord
    [0, h, m, 0], [m, 0, w, h], // top chords
    [m, 0, m, h], // king post
    [w / 4, h, w / 4, h / 2], [(3 * w) / 4, h, (3 * w) / 4, h / 2], // queen posts
    [w / 4, h, m, h / 2], [(3 * w) / 4, h, m, h / 2], // webs
    [w / 4, h / 2, w * 0.375, h * 0.25], [(3 * w) / 4, h / 2, w * 0.625, h * 0.25],
  ];
  return { w, h, segs };
}
function floorJoists(): { w: number; h: number; segs: Seg[] } {
  const w = rnd(180, 360), h = 32, n = rndInt(5, 8);
  const segs: Seg[] = [[0, 0, w, 0], [0, h, w, h]]; // rims
  for (let i = 0; i <= n; i++) { const x = (w / n) * i; segs.push([x, 0, x, h]); }
  for (let i = 0; i < n; i++) { // one diagonal per bay, alternating
    const a = (w / n) * i, b = (w / n) * (i + 1);
    segs.push(i % 2 ? [a, h, b, 0] : [a, 0, b, h]);
  }
  return { w, h, segs };
}
const GENERATORS = [studWall, roofTruss, floorJoists];

export default function LivingBlueprint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const debugZone = () =>
      (typeof window !== "undefined" && ((window as unknown as { __debugZone?: boolean }).__debugZone || /[?&]debugzone=1/.test(window.location.search))) === true;

    const st = {
      W: 0, H: 0, dpr: 1,
      zone: { x1: 0, y1: 0, x2: 0, y2: 0 },
      cursor: null as { x: number; y: number } | null,
      par: { x: 0, y: 0 }, parTarget: { x: 0, y: 0 },
      gridDrift: 0,
      structures: [] as Structure[],
      raf: 0, lastT: 0, onScreen: true, mobile: false,
      frameMs: 0, frameN: 0,
    };

    // ---------- quiet zone helpers ----------
    const zoneFactor = (x: number, y: number) => {
      const z = st.zone;
      const dx = Math.max(z.x1 - x, 0, x - z.x2);
      const dy = Math.max(z.y1 - y, 0, y - z.y2);
      if (dx === 0 && dy === 0) return ZONE_INSIDE;
      const d = Math.hypot(dx, dy);
      return d >= ZONE_RAMP ? 1 : ZONE_INSIDE + (1 - ZONE_INSIDE) * (d / ZONE_RAMP);
    };
    const manhattanToZone = (x: number, y: number) => {
      const z = st.zone;
      return Math.max(z.x1 - x, 0, x - z.x2) + Math.max(z.y1 - y, 0, y - z.y2);
    };

    // ---------- structures ----------
    const spawn = (initial = false): Structure => {
      const gen = GENERATORS[rndInt(0, GENERATORS.length - 1)]();
      // 8 candidates, keep the one furthest from the quiet zone
      let best = { x: 0, y: 0, d: -1 };
      for (let i = 0; i < 8; i++) {
        const x = rnd(-gen.w * 0.2, Math.max(0, st.W - gen.w * 0.8));
        const y = rnd(-gen.h * 0.2, Math.max(0, st.H - gen.h * 0.8));
        const d = manhattanToZone(x + gen.w / 2, y + gen.h / 2);
        if (d > best.d) best = { x, y, d };
      }
      const cum: number[] = []; let total = 0;
      for (const s of gen.segs) { total += Math.hypot(s[2] - s[0], s[3] - s[1]); cum.push(total); }
      return {
        x: best.x, y: best.y, w: gen.w, h: gen.h, segs: gen.segs, cum, total,
        depth: rnd(0.25, 0.9), drift: rnd(-1.5, 1.5),
        phase: "draw", t: 0, drawMs: rnd(3400, 5400), holdMs: rnd(4000, 7000), fadeMs: 1800,
        delay: initial ? rnd(0, 3000) : 0,
      };
    };

    // ---------- sizing ----------
    const measure = () => {
      const r = section.getBoundingClientRect();
      st.W = r.width; st.H = r.height;
      st.dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(st.W * st.dpr); canvas.height = Math.round(st.H * st.dpr);
      canvas.style.width = `${st.W}px`; canvas.style.height = `${st.H}px`;
      st.zone = { x1: st.W * ZONE.x1, x2: st.W * ZONE.x2, y1: st.H * ZONE.y1, y2: st.H * ZONE.y2 };
      const wasMobile = st.mobile;
      st.mobile = window.innerWidth < 768;
      if (st.structures.length === 0) for (let i = 0; i < STRUCTURES; i++) st.structures.push(spawn(true));
      if (reduced || st.mobile) { stopLoop(); drawStatic(); }
      else if (wasMobile !== st.mobile || !st.raf) startLoop();
      else drawFrame(0);
    };

    // ---------- drawing ----------
    const drawGrid = () => {
      const ox = ((st.par.x * 0.5 + st.gridDrift) % GRID + GRID) % GRID;
      const oy = ((st.par.y * 0.5) % GRID + GRID) % GRID;
      ctx.strokeStyle = `rgba(${GOLD},0.035)`; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = ox; x <= st.W; x += GRID) { ctx.moveTo(x, 0); ctx.lineTo(x, st.H); }
      for (let y = oy; y <= st.H; y += GRID) { ctx.moveTo(0, y); ctx.lineTo(st.W, y); }
      ctx.stroke();
    };

    const drawStructure = (s: Structure, progress: number, fade: number, live: boolean) => {
      const base = 0.12 + s.depth * 0.22; // 12%–34%: stronger than the original 7%–21% at the client's request
      const px = live ? st.par.x * s.depth : 0, py = live ? st.par.y * s.depth : 0;
      const ox = s.x + px, oy = s.y + py;
      const drawnLen = progress * s.total;
      let dot: { x: number; y: number; f: number } | null = null;
      for (let i = 0; i < s.segs.length; i++) {
        const start = i === 0 ? 0 : s.cum[i - 1];
        if (drawnLen <= start) break;
        const seg = s.segs[i];
        const len = s.cum[i] - start;
        const frac = Math.min(1, (drawnLen - start) / len);
        const x1 = ox + seg[0], y1 = oy + seg[1];
        const x2 = x1 + (seg[2] - seg[0]) * frac, y2 = y1 + (seg[3] - seg[1]) * frac;
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const zf = zoneFactor(mx, my);
        let alpha = base * zf * fade, width = 1;
        if (live && st.cursor) {
          const d = Math.hypot(st.cursor.x - mx, st.cursor.y - my);
          if (d < CURSOR_RADIUS) {
            const boost = (1 - d / CURSOR_RADIUS) * zf;
            alpha *= 1 + 0.5 * boost;
            width = 1 + 0.8 * boost;
          }
        }
        ctx.strokeStyle = `rgba(${GOLD},${alpha})`; ctx.lineWidth = width;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        if (frac < 1) { dot = { x: x2, y: y2, f: zf * fade }; break; }
      }
      if (dot && live) {
        ctx.fillStyle = DOT; ctx.globalAlpha = dot.f;
        ctx.beginPath(); ctx.arc(dot.x, dot.y, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const drawZoneDebug = () => {
      if (!debugZone()) return;
      const z = st.zone;
      ctx.save(); ctx.strokeStyle = "rgba(255,60,60,0.9)"; ctx.lineWidth = 1; ctx.setLineDash([6, 4]);
      ctx.strokeRect(z.x1, z.y1, z.x2 - z.x1, z.y2 - z.y1);
      ctx.strokeStyle = "rgba(255,60,60,0.35)"; ctx.setLineDash([2, 4]);
      ctx.strokeRect(z.x1 - ZONE_RAMP, z.y1 - ZONE_RAMP, z.x2 - z.x1 + 2 * ZONE_RAMP, z.y2 - z.y1 + 2 * ZONE_RAMP);
      ctx.restore();
    };

    const drawStatic = () => {
      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0); ctx.clearRect(0, 0, st.W, st.H);
      ctx.lineCap = "round";
      drawGrid();
      for (const s of st.structures) drawStructure(s, 1, 1, false);
      drawZoneDebug();
    };

    const drawFrame = (dt: number) => {
      const t0 = performance.now();
      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0); ctx.clearRect(0, 0, st.W, st.H);
      ctx.lineCap = "round";
      // parallax easing (5% per 60fps frame) + grid drift
      const k = 1 - Math.pow(0.95, dt * 60);
      st.par.x += (st.parTarget.x - st.par.x) * k;
      st.par.y += (st.parTarget.y - st.par.y) * k;
      st.gridDrift += 2 * dt;
      drawGrid();
      for (let i = 0; i < st.structures.length; i++) {
        let s = st.structures[i];
        if (s.delay > 0) { s.delay -= dt * 1000; continue; }
        s.t += dt * 1000;
        s.x += s.drift * dt;
        let progress = 1, fade = 1;
        if (s.phase === "draw") { progress = Math.min(1, s.t / s.drawMs); if (s.t >= s.drawMs) { s.phase = "hold"; s.t = 0; } }
        else if (s.phase === "hold") { if (s.t >= s.holdMs) { s.phase = "fade"; s.t = 0; } }
        else { fade = Math.max(0, 1 - s.t / s.fadeMs); if (s.t >= s.fadeMs) { s = st.structures[i] = spawn(); continue; } }
        drawStructure(s, progress, fade, true);
      }
      drawZoneDebug();
      // rolling frame-time average (read from window.__lbFrameMs in dev)
      const ms = performance.now() - t0;
      st.frameMs += ms; st.frameN++;
      if (st.frameN === 120) { (window as unknown as { __lbFrameMs?: number }).__lbFrameMs = st.frameMs / 120; st.frameMs = 0; st.frameN = 0; }
    };

    // ---------- loop control ----------
    const loop = (now: number) => {
      st.raf = 0;
      if (!st.onScreen || st.mobile || reduced) return;
      const dt = Math.min(50, now - st.lastT) / 1000;
      st.lastT = now;
      drawFrame(dt);
      st.raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (st.raf || reduced || st.mobile || !st.onScreen) return;
      st.lastT = performance.now();
      st.raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => { if (st.raf) cancelAnimationFrame(st.raf); st.raf = 0; };

    // ---------- listeners ----------
    const onMove = (e: MouseEvent) => {
      if (reduced || st.mobile) return;
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      st.cursor = { x, y };
      st.parTarget = { x: (x / r.width - 0.5) * 40, y: (y / r.height - 0.5) * 26 };
    };
    const onLeave = () => { st.cursor = null; st.parTarget = { x: 0, y: 0 }; };
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

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />;
}
