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

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-[450ms] ease-spring ${
        scrolled
          ? "bg-warm-white/90 backdrop-blur-md border-b border-black/10 shadow-[0_10px_30px_-20px_rgba(13,13,13,0.35)]"
          : "bg-warm-white border-b border-black/[0.08]"
      }`}
    >
      <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-y-3 px-5 md:px-10 py-[18px]">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/assets/icon-light.png" alt="Mannat Framing Ltd. logo" width={38} height={40} className="h-[38px] w-auto object-contain transition-transform duration-300 ease-spring group-hover:scale-105" priority />
          <span className="flex flex-col leading-[1.15]">
            <span className="font-heading font-extrabold text-[15px] tracking-[0.5px] text-black">MANNAT FRAMING</span>
            <span className="text-[11px] text-ink-2 tracking-[0.3px]">Surrey, BC</span>
          </span>
        </Link>

        <nav className="order-3 w-full flex flex-wrap justify-center gap-x-8 gap-y-3 md:order-none md:w-auto md:justify-start">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm whitespace-nowrap transition-[color,transform] duration-300 ease-spring hover:-translate-y-0.5 active:-translate-y-0.5 after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-px after:bg-gold after:transition-[width] after:duration-300 after:ease-spring ${
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
          className="text-xs md:text-[13px] tracking-[0.3px] whitespace-nowrap border border-gold px-[14px] py-[9px] md:px-[22px] md:py-[11px] text-black transition-[background-color,color,transform] duration-300 ease-spring hover:bg-gold hover:scale-[1.03] active:bg-gold active:scale-[0.98]"
        >
          Get a Free Quote &rarr;
        </Link>
      </div>
    </header>
  );
}
