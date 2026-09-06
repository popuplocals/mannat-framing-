"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  heading: string;
  highlightWords?: string[];
  subtitle?: string;
  showUnderline?: boolean;
  variant?: "light" | "dark";
  corner?: string;
  children?: React.ReactNode;
  /** Decorative element rendered as a direct child of the hero section (e.g. an absolutely positioned canvas). */
  aside?: React.ReactNode;
};

const EASE_CSS = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function PageHero({
  breadcrumbs,
  eyebrow,
  heading,
  highlightWords = [],
  subtitle,
  showUnderline = true,
  variant = "dark",
  corner,
  children,
  aside,
}: PageHeroProps) {
  const [ref, visible] = useInView<HTMLDivElement>(0.15);
  const words = heading.split(" ");
  const subWords = subtitle ? subtitle.split(" ") : [];
  const headingDone = words.length * 120 + 600;
  const dark = variant === "dark";

  const wordStyle = (i: number, base: number, step: number): React.CSSProperties => ({
    display: "inline-block",
    marginRight: "0.28em",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) rotate(0deg)" : "translateY(20px) rotate(2deg)",
    transition: `all 0.6s ${EASE_CSS} ${base + i * step}ms`,
  });

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden px-5 md:px-10 pt-[130px] pb-[90px] ${dark ? "bg-black" : "bg-surface"}`}
    >
      {corner && (
        <>
          <span className="absolute left-5 md:left-10 top-9 text-xs tracking-[1px] text-gold">{corner}</span>
          <span className="absolute left-5 md:left-10 top-10 bottom-0 w-px bg-gold/35" />
          <span className="absolute right-5 md:right-10 top-9 text-[11px] tracking-[2px] text-concrete [writing-mode:vertical-rl]">SUR / BC</span>
        </>
      )}
      <div className={`mx-auto max-w-[1440px] ${corner ? "pl-6" : ""}`}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[1px] text-concrete">
            {breadcrumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="text-concrete transition-colors duration-300 hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span className={dark ? "text-warm-white" : "text-ink"}>{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-gold">/</span>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="mb-6 flex items-center gap-[14px]">
            <span
              className="h-px bg-gold"
              style={{ width: visible ? 26 : 0, transition: `width 0.6s ${EASE_CSS} 100ms` }}
            />
            <span className="text-xs font-medium tracking-[2.5px] text-gold">{eyebrow}</span>
          </div>
        )}

        <h1
          className={`m-0 mb-6 max-w-[820px] font-heading text-[clamp(36px,5vw,58px)] font-extrabold leading-[1.1] ${dark ? "text-warm-white" : "text-ink"}`}
        >
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              style={wordStyle(i, 0, 120)}
              className={highlightWords.some((hw) => w.replace(/[^\w'&-]/g, "") === hw || w === hw) ? "text-gold" : undefined}
            >
              {w}
            </span>
          ))}
        </h1>

        {showUnderline && (
          <span
            aria-hidden="true"
            className="block h-[2px] bg-gradient-to-r from-gold-dark via-gold to-gold-pale"
            style={{
              width: visible ? "40%" : 0,
              maxWidth: 220,
              marginBottom: 24,
              transition: `width 0.7s ${EASE_CSS} ${headingDone + 300 - 600}ms`,
            }}
          />
        )}

        {subtitle && (
          <p className={`m-0 max-w-[560px] text-base leading-[1.7] ${dark ? "text-concrete" : "text-ink-2"}`}>
            {subWords.map((w, i) => (
              <span key={`${w}-${i}`} style={wordStyle(i, words.length * 120, 50)}>
                {w}
              </span>
            ))}
          </p>
        )}

        {children && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.6s ${EASE_CSS} ${headingDone + 500 - 600}ms`,
            }}
          >
            {children}
          </div>
        )}
      </div>
      {aside}
    </section>
  );
}
