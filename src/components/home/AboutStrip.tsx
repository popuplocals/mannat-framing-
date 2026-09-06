import Link from "next/link";
import Reveal from "@/components/Reveal";

const facts = [
  { k: "HEADQUARTERS", v: "Surrey, British Columbia" },
  { k: "FOUNDED", v: "2014" },
  { k: "SPECIALTY", v: "Townhouse & multi-family framing" },
  { k: "IN-HOUSE CREWS", v: "Framing, forming & site prep" },
];

/** Compact company snapshot between Services and Why Us on the homepage. */
export default function AboutStrip() {
  return (
    <section className="mf-grid-bg relative overflow-hidden border-y border-gold/15 bg-charcoal px-5 py-[100px] md:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <span className="text-xs font-medium tracking-[2.5px] text-gold">ABOUT US</span>
          <h2 className="m-0 mb-5 mt-5 font-heading text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.12] text-warm-white">
            Built in Surrey.
            <br />
            <span className="text-gold">Since 2014.</span>
          </h2>
          <p className="m-0 mb-8 max-w-[520px] text-[15px] leading-[1.8] text-concrete">
            What began as a focused residential framing crew has grown into a full-service construction company — handling custom homes, townhouse developments and commercial builds for homeowners, builders and developers across the Lower Mainland.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-warm-white transition-[gap,border-color,color,background-color] duration-300 ease-spring hover:gap-3 hover:border-gold hover:bg-gold/10 hover:text-gold active:gap-3"
          >
            Read our story <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.k} index={i} y={18} scale={0.96}>
              <div className="group h-full border border-gold/20 bg-black/40 p-6 transition-[border-color,transform,box-shadow,background-color] duration-[400ms] ease-spring hover:-translate-y-1 hover:border-gold/60 hover:bg-black/60 hover:shadow-card active:-translate-y-1">
                <span className="block font-mono text-[10px] tracking-[2px] text-gold">{f.k}</span>
                <span className="mt-3 block font-heading text-[17px] font-bold leading-snug text-warm-white transition-colors duration-300 group-hover:text-gold-pale">{f.v}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
