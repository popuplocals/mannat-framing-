"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

/**
 * Full-width bar at the top of the page; once the visitor scrolls it morphs
 * into a floating glass capsule. Every property transitions on the same
 * 450ms spring curve so the change reads as one continuous motion.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 pointer-events-none">
      {/* Spacer keeps the bar's rest height so content below never jumps when the capsule shrinks. */}
      <div
        className={`mx-auto pointer-events-auto transition-[max-width,margin,border-radius,background-color,box-shadow,border-color,padding] duration-[450ms] ease-spring border ${
          scrolled
            ? "mt-3 -mb-3 max-w-[82rem] rounded-full border-black/10 bg-warm-white/85 px-2 shadow-[0_18px_40px_-18px_rgba(13,13,13,0.45)] backdrop-blur-md md:px-4"
            : "mt-0 mb-0 max-w-none rounded-none border-transparent border-b-black/[0.08] bg-warm-white px-0 shadow-none"
        }`}
        style={{ willChange: "max-width, margin, border-radius" }}
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-y-3 px-5 py-[18px] md:px-10">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/assets/icon-light.png"
              alt="Mannat Framing Ltd. logo"
              width={38}
              height={40}
              className="h-[38px] w-auto object-contain transition-transform duration-[450ms] ease-spring group-hover:scale-105"
              priority
            />
            <span className="flex flex-col leading-[1.15]">
              <span className="font-heading text-[15px] font-extrabold tracking-[0.5px] text-black">MANNAT FRAMING</span>
              <span className="text-[11px] tracking-[0.3px] text-ink-2">Surrey, BC</span>
            </span>
          </Link>

          <nav className="order-3 flex w-full flex-wrap justify-center gap-x-8 gap-y-3 md:order-none md:w-auto md:justify-start">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-sm whitespace-nowrap transition-[color,transform] duration-300 ease-spring hover:-translate-y-0.5 active:-translate-y-0.5 after:absolute after:bottom-[-6px] after:left-0 after:h-px after:bg-gold after:transition-[width] after:duration-300 after:ease-spring after:content-[''] ${
                    active ? "text-gold-dark after:w-full" : "text-black after:w-0 hover:after:w-full active:after:w-full"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className={`whitespace-nowrap border border-gold text-xs tracking-[0.3px] text-black transition-[background-color,color,transform,border-radius,padding] duration-[450ms] ease-spring hover:scale-[1.03] hover:bg-gold active:scale-[0.98] active:bg-gold md:text-[13px] ${
              scrolled ? "rounded-full px-4 py-[9px] md:px-5 md:py-[11px]" : "rounded-none px-[14px] py-[9px] md:px-[22px] md:py-[11px]"
            }`}
          >
            Get a Free Quote &rarr;
          </Link>
        </div>
      </div>
    </header>
  );
}
