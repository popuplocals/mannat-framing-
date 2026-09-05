import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import CtaBand from "@/components/CtaBand";
import Image from "next/image";
import AboutHero from "@/components/about/AboutHero";

export const metadata: Metadata = {
  title: "About Mannat Framing Ltd. | Framing Contractor Surrey BC",
  description:
    "Mannat Framing Ltd. is one of the Lower Mainland's most trusted framing and construction companies — serving homeowners, builders, and developers since 2014.",
};

const values = [
  { num: "01", t: "Precision", d: "Accurate layouts, clean framing, and structural integrity — every time." },
  { num: "02", t: "Accountability", d: "We own our timelines. Our crews coordinate with your trades and never leave a project hanging." },
  { num: "03", t: "Compliance", d: "Every project is built to BC Building Code — including seismic, shear wall, and Step Code requirements." },
  { num: "04", t: "Partnership", d: "We treat every client like a long-term partner, not a one-time job." },
];

const cities = ["Langley", "Burnaby", "Vancouver", "Coquitlam", "Maple Ridge", "New Westminster", "North Vancouver", "Delta", "Abbotsford", "Richmond", "Port Moody", "Port Coquitlam", "White Rock", "West Vancouver"];

const snapshot = [
  { num: "2014", label: "Founded in Surrey, BC", gold: true },
  { num: "10+", label: "Years serving the Lower Mainland", gold: false },
  { num: "4", label: "Standards held on every project", gold: false },
];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* OUR STORY */}
      <section className="relative mx-auto max-w-[1440px] px-5 pb-[100px] md:px-10 md:pb-[140px]">
        <Reveal className="group relative z-[1] -mt-[70px] h-[320px] overflow-hidden md:h-[520px]">
          <div className="relative h-full transform-gpu transition-transform duration-[800ms] ease-spring group-hover:scale-[1.02]">
            <Image src="/assets/photos/about-story-townhouses.jpg" alt="Framed townhouse development on a Mannat Framing site" fill sizes="(min-width: 1024px) 1360px, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal
          index={1}
          y={40}
          className="relative z-[2] -mt-[60px] ml-auto max-w-[640px] border border-gold/40 border-t-[3px] border-t-gold bg-surface p-[36px_24px] shadow-lift transition-[box-shadow,transform] duration-[450ms] ease-spring hover:-translate-y-1 hover:shadow-[0_40px_70px_-20px_rgba(13,13,13,0.35)] md:-mt-[100px] md:p-[52px_48px]"
        >
          <span className="text-xs font-medium tracking-[2.5px] text-accent">OUR STORY</span>
          <span className="float-right font-mono text-[10px] tracking-[0.5px] text-concrete">SEC. 02.1</span>
          <h2 className="m-0 mb-6 mt-[18px] clear-both font-heading text-[28px] font-extrabold leading-[1.25] text-ink">From a Framing Crew to a Full Construction Company.</h2>
          <p className="m-0 mb-[22px] border-l-2 border-gold pl-[18px] font-heading text-[17px] font-bold leading-[1.5] text-ink">
            Mannat Framing Ltd. was founded with a simple mission: deliver exceptional framing work that builders, developers, and homeowners in Surrey and across the Lower Mainland can rely on.
          </p>
          <p className="m-0 mb-[18px] text-[15px] leading-[1.8] text-ink-3">
            Over the past decade, we have grown from a focused residential framing crew into a full-service construction company capable of handling projects of every scale — from single-family custom homes to large multi-family townhouse developments and commercial buildings.
          </p>
          <p className="m-0 mb-[18px] text-[15px] leading-[1.8] text-ink-3">
            Headquartered in Surrey, BC, we understand the local market, the regional building codes, and the high expectations that come with building in one of Canada&rsquo;s most active real estate markets.
          </p>
          <p className="m-0 text-[15px] leading-[1.8] text-ink-3">
            What sets us apart is simple: we show up on time, communicate clearly, and consistently deliver quality framing that makes every trade that follows our work easier. Our clients come back to us project after project because of it.
          </p>
        </Reveal>
      </section>

      {/* VALUES */}
      <section className="mf-grid-bg overflow-hidden bg-charcoal py-[120px]">
        <Reveal className="mx-auto max-w-[1440px] px-5 md:px-10">
          <span className="font-mono text-xs font-medium tracking-[2.5px] text-gold">[ WHAT WE STAND FOR ]</span>
          <h2 className="m-0 mb-20 mt-5 max-w-[700px] font-heading text-[32px] font-extrabold leading-[1.22] text-warm-white">The Standard We Hold on Every Project.</h2>
        </Reveal>
        <div className="flex flex-col">
          {values.map((v, i) => (
            <Reveal
              key={v.num}
              index={i}
              y={20}
              className={`group mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-y-[14px] border-t border-gold/20 px-5 py-9 transition-colors duration-300 ease-spring hover:bg-gold/[0.04] active:bg-gold/[0.04] md:grid-cols-[0.5fr_1fr] md:px-10 ${
                i === values.length - 1 ? "border-b border-b-gold/20" : ""
              }`}
            >
              <span className="font-heading text-[48px] font-extrabold leading-none text-gold opacity-25 transition-[opacity,transform] duration-[450ms] ease-spring group-hover:translate-x-2 group-hover:opacity-60 md:text-[clamp(64px,8vw,120px)]">
                {v.num}
              </span>
              <div>
                <h3 className="m-0 mb-[10px] font-heading text-2xl font-bold text-warm-white transition-colors duration-300 ease-spring group-hover:text-gold">{v.t}</h3>
                <p className="m-0 max-w-[520px] text-[15px] leading-[1.7] text-concrete">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICE AREA */}
      <section id="where-we-work" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-[100px] text-center md:px-10 md:py-[140px]">
        <Reveal>
          <span className="text-xs font-medium tracking-[2.5px] text-accent">WHERE WE WORK</span>
          <p className="mx-auto mb-3 mt-5 max-w-[520px] text-[15px] leading-[1.7] text-ink-2">Based in Surrey, BC, we take on projects throughout Greater Vancouver and beyond.</p>
        </Reveal>
        <Reveal index={1} scale={0.92} y={0}>
          <h2 className="m-0 mb-2 mt-6 font-heading text-[clamp(64px,11vw,180px)] font-extrabold leading-[0.95] tracking-[-2px] text-ink">Surrey</h2>
        </Reveal>
        <Reveal index={2}>
          <div className="mx-auto mb-12 h-[2px] w-[60px] bg-gold" />
        </Reveal>
        <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-x-9 gap-y-4">
          {cities.map((c, i) => (
            <Reveal key={c} index={i} y={10} className="flex items-center gap-9">
              <span className="cursor-default font-heading text-base font-medium text-ink-2 transition-[color,transform] duration-300 ease-spring hover:-translate-y-0.5 hover:text-gold active:text-gold">{c}</span>
              {i < cities.length - 1 && <span className="text-gold">&middot;</span>}
            </Reveal>
          ))}
        </div>
      </section>

      {/* SNAPSHOT */}
      <section className="mf-grid-bg relative overflow-hidden bg-black">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-3">
          {snapshot.map((s, i) => (
            <Reveal
              key={s.label}
              index={i}
              className={`border-b border-dashed border-gold/25 px-5 py-[60px] transition-colors duration-300 ease-spring hover:bg-gold/5 active:bg-gold/5 md:border-b-0 md:px-10 md:py-[90px] ${
                i < snapshot.length - 1 ? "md:border-r md:border-dashed md:border-gold/25" : ""
              }`}
            >
              <CountUp value={s.num} className={`block font-heading text-[64px] font-extrabold leading-none ${s.gold ? "text-gold" : "text-warm-white"}`} />
              <div className="mt-3 text-[13px] tracking-[0.3px] text-concrete">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
