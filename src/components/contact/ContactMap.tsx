"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

// Surrey, BC (city centre) — replace with the exact yard/office address once confirmed.
const COMPANY = {
  name: "Mannat Framing Ltd.",
  tagline: "Framing & Construction",
  address: "Surrey, British Columbia",
  lat: 49.1913,
  lng: -122.849,
  phone: "(604) XXX-XXXX",
  phoneRaw: "+1604",
  email: "info@mannatframing.ca",
};

const cities = ["Langley", "Burnaby", "Vancouver", "Coquitlam", "Delta", "Richmond", "Abbotsford", "Maple Ridge"];

/* Scale Pop reveal: 0.85 → 1, staggered 100ms per card.
   Delay lives on whileInView only, so hover/tap respond instantly. */
function PopCard({ number, delay, children }: { number: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE, delay } }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group relative border border-black/[0.08] border-t-2 border-t-gold/70 bg-white/90 px-[22px] py-[18px] shadow-[0_2px_8px_rgba(13,13,13,0.04)] backdrop-blur-[16px] transition-[background-color,border-color,box-shadow] duration-500 ease-spring hover:border-gold/40 hover:border-t-gold hover:bg-white/[0.98] hover:shadow-card"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-2.5 select-none font-heading text-[32px] font-extrabold leading-none text-gold-dark/[0.06] transition-colors duration-[400ms] ease-spring group-hover:text-gold-dark/[0.16]"
      >
        {number}
      </span>
      {children}
    </motion.div>
  );
}

/* Circle icon that floods gold (icon turns black) when the card is hovered/tapped */
function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/[0.12] text-gold-dark transition-all duration-[400ms] ease-spring group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_4px_14px_rgba(197,164,109,0.45)] group-active:bg-gold group-active:text-black">
      {children}
    </div>
  );
}

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
);
const PhoneIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2Z" /></svg>
);
const MailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);

export default function ContactMap() {
  const mapSrc = `https://maps.google.com/maps?q=${COMPANY.lat},${COMPANY.lng}+(${encodeURIComponent(COMPANY.name)})&hl=en&z=13&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${COMPANY.lat},${COMPANY.lng}`;

  return (
    <section className="relative overflow-hidden bg-warm-white">
      {/* the map IS the section — everything else floats above it */}
      <iframe
        title={`${COMPANY.name} location map`}
        src={mapSrc}
        className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] sepia-[0.12]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* readability wash — heavier on the left where the cards live */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-warm-white via-warm-white/85 to-warm-white/40 lg:via-warm-white/45 lg:to-transparent"
      />
      {/* name chip floating above the map pin (the embed renders its pin at the centre) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-[calc(100%+34px)] flex-col items-center md:flex"
      >
        <div className="border border-black/10 border-t-2 border-t-gold bg-white/95 px-4 py-2.5 text-center shadow-lift backdrop-blur-sm">
          <p className="m-0 font-heading text-sm font-extrabold leading-tight text-black">{COMPANY.name}</p>
          <p className="m-0 mt-0.5 text-[11px] font-semibold tracking-[1px] text-gold-dark">SURREY, BC</p>
        </div>
        <div className="-mt-1.5 h-3 w-3 rotate-45 border-b border-r border-black/10 bg-white/95" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex w-full max-w-[400px] flex-col gap-3.5 max-md:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } }}
            viewport={{ once: true, amount: 0.1 }}
            className="mb-1.5"
          >
            <span className="inline-block bg-gold/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-black">Visit Us</span>
            <h1 className="m-0 mt-4 font-heading text-[clamp(32px,4.2vw,46px)] font-extrabold leading-[1.08] text-black">
              Finding us is the easy part.
            </h1>
            <p className="m-0 mt-3 text-base leading-[1.7] text-ink-2">
              We&rsquo;re headquartered in Surrey, BC and our crews work across the whole Lower Mainland. Here&rsquo;s everything you need to reach us.
            </p>
          </motion.div>

          <PopCard number="01" delay={0}>
            <div className="flex gap-4">
              <IconCircle><PinIcon /></IconCircle>
              <div>
                <p className="m-0 mb-1 font-heading text-sm font-bold text-black">{COMPANY.name}</p>
                <p className="m-0 text-xs leading-[1.6] text-ink-2">{COMPANY.address}</p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark transition-[gap,color] duration-300 ease-spring hover:text-black group-hover:gap-2"
                >
                  Get Directions <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </PopCard>

          <PopCard number="02" delay={0.1}>
            <div className="flex gap-4">
              <IconCircle><CompassIcon /></IconCircle>
              <div>
                <p className="m-0 mb-1 font-heading text-sm font-bold text-black">We come to your site</p>
                <p className="m-0 text-xs leading-[1.6] text-ink-2">
                  Surrey, {cities.join(", ")} and across Greater Vancouver.
                </p>
                <Link
                  href="/about#where-we-work"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark transition-[gap,color] duration-300 ease-spring hover:text-black group-hover:gap-2"
                >
                  Full service area <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </PopCard>

          <PopCard number="03" delay={0.2}>
            <div className="flex gap-4">
              <IconCircle><PhoneIcon /></IconCircle>
              <div>
                <p className="m-0 mb-1 font-heading text-sm font-bold text-black">Rather talk to someone first?</p>
                <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark transition-colors duration-300 hover:text-black">
                  <PhoneIcon size={12} /> {COMPANY.phone}
                </a>
                <br />
                <a href={`mailto:${COMPANY.email}`} className="mt-1.5 inline-flex items-center gap-1.5 text-xs leading-[1.6] text-ink-2 transition-colors duration-300 hover:text-gold-dark">
                  <MailIcon /> {COMPANY.email}
                </a>
                <br />
                <a
                  href="#form"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark transition-[gap,color] duration-300 ease-spring hover:text-black group-hover:gap-2"
                >
                  Request a free quote <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </PopCard>
        </div>
      </div>
    </section>
  );
}
