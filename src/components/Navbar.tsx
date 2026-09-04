"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export const NAV_REST_HEIGHT = 76;

/**
 * Fixed header. At the top of the page it is a full-width 76px bar; once the
 * visitor scrolls it shrinks into a floating 56px glass capsule with a smaller
 * logo and tighter padding. A flow spacer holds the rest height so page content
 * never reflows while the capsule resizes.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-[padding] duration-[450ms] ease-spring ${
          scrolled ? "px-3 sm:px-4" : "px-0"
        }`}
      >
        <div
          className={`pointer-events-auto relative mx-auto border transition-[height,max-width,margin,border-radius,background-color,box-shadow,border-color] duration-[450ms] ease-spring ${
            scrolled
              ? "mt-3 h-14 max-w-[82rem] rounded-full border-ink/10 bg-surface/85 shadow-[0_8px_32px_rgba(13,13,13,0.14)] backdrop-blur-[20px] backdrop-saturate-[1.3]"
              : "mt-0 h-[76px] max-w-none rounded-none border-transparent border-b-ink/[0.08] bg-surface"
          }`}
          style={{ willChange: "height, max-width, border-radius" }}
        >
          <nav
            className={`mx-auto flex h-full w-full max-w-[1440px] items-center justify-between transition-[padding] duration-[450ms] ease-spring ${
              scrolled ? "px-4 md:px-6" : "px-5 md:px-10"
            }`}
          >
            <Link href="/" className="group flex shrink-0 items-center gap-3">
              {/* Navy/red mark on light surfaces; cream/red variant when the site is in dark mode */}
              <Image
                src="/assets/icon-light.png"
                alt="Mannat Framing Ltd. logo"
                width={38}
                height={40}
                priority
                className={`w-auto object-contain transition-[height,transform] duration-[450ms] ease-spring group-hover:scale-[1.04] dark:hidden ${
                  scrolled ? "h-7 md:h-8" : "h-[38px]"
                }`}
              />
              <Image
                src="/assets/icon-dark.png"
                alt=""
                aria-hidden="true"
                width={38}
                height={40}
                className={`hidden w-auto object-contain transition-[height,transform] duration-[450ms] ease-spring group-hover:scale-[1.04] dark:block ${
                  scrolled ? "h-7 md:h-8" : "h-[38px]"
                }`}
              />
              <span className="flex flex-col leading-[1.15]">
                <span className="font-heading text-[15px] font-extrabold tracking-[0.5px] text-ink">MANNAT FRAMING</span>
                <span
                  className={`overflow-hidden text-[11px] tracking-[0.3px] text-ink-2 transition-[max-height,opacity] duration-[450ms] ease-spring ${
                    scrolled ? "max-h-0 opacity-0" : "max-h-4 opacity-100"
                  }`}
                >
                  Surrey, BC
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative text-sm whitespace-nowrap transition-[color,transform] duration-300 ease-spring hover:-translate-y-0.5 active:-translate-y-0.5 after:absolute after:bottom-[-6px] after:left-0 after:h-px after:bg-gold after:transition-[width] after:duration-300 after:ease-spring after:content-[''] ${
                      active ? "text-accent after:w-full" : "text-ink after:w-0 hover:after:w-full active:after:w-full"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <ThemeToggle />
              <Link
                href="/contact"
                className={`whitespace-nowrap border border-gold text-xs tracking-[0.3px] text-ink transition-[background-color,color,transform,border-radius,padding] duration-[450ms] ease-spring hover:scale-[1.03] hover:bg-gold hover:text-black active:scale-[0.98] active:bg-gold active:text-black md:text-[13px] ${
                  scrolled ? "rounded-full px-4 py-2 md:px-5 md:py-[9px]" : "rounded-none px-[14px] py-[9px] md:px-[22px] md:py-[11px]"
                }`}
              >
                <span className="hidden sm:inline">Get a Free Quote &rarr;</span>
                <span className="sm:hidden">Quote &rarr;</span>
              </Link>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center text-ink transition-transform duration-300 ease-spring active:scale-90 md:hidden"
              >
                <span className="relative block h-4 w-5">
                  <span className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition-transform duration-300 ease-spring ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                  <span className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-opacity duration-300 ease-spring ${open ? "opacity-0" : ""}`} />
                  <span className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-transform duration-300 ease-spring ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden border border-ink/10 bg-surface/95 shadow-lift backdrop-blur-xl md:hidden ${
                  scrolled ? "rounded-3xl" : "mx-3 rounded-3xl"
                }`}
              >
                <div className="flex flex-col gap-1 px-4 py-4">
                  {links.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: EASE, delay: 0.05 + i * 0.05 }}
                      >
                        <Link
                          href={l.href}
                          className={`block rounded-xl px-3 py-3 font-heading text-base font-bold transition-[background-color,color,transform] duration-300 ease-spring active:translate-x-1 active:bg-gold/10 ${
                            active ? "bg-gold/10 text-accent" : "text-ink"
                          }`}
                        >
                          {l.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      {/* Flow spacer: keeps page content below the fixed header at its rest height. */}
      <div aria-hidden="true" style={{ height: NAV_REST_HEIGHT }} />
    </>
  );
}
