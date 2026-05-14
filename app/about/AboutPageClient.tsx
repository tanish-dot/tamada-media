"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import Founders from "@/components/sections/Founders";
import FoundersIntro from "@/components/sections/FoundersIntro";
import AwardsSection from "@/components/sections/AwardsSection";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Data ───────────────────────────────────────────────────────────────────────

// Credentials unique to About — nothing repeated from homepage
const CREDENTIALS = [
  { num: "2011",   desc: "Year we started building creator networks — before 'creator economy' was a phrase." },
  { num: "1 of 12", desc: "YouTube Enterprise Partners in all of India. One of the rarest designations on the platform." },
  { num: "70K",    desc: "Videos produced every single month, entirely in-house. No outsourcing." },
  { num: "35+",    desc: "Original IPs we own outright. Wirally. YINT. Rowdy Baby. Built to outlast campaigns." },
];

const PILLARS = [
  { num: "01", stat: "750+",  title: "Multi-Channel Network",  body: "Channels managed and grown at scale. South India's largest creator infrastructure — in-house strategy, distribution, and ops." },
  { num: "02", stat: "35+",   title: "IP Builder",             body: "Original IPs we own outright. Wirally. YINT. Rowdy Baby. Built to compound over years, not campaigns." },
  { num: "03", stat: "70K",   title: "Production House",       body: "Videos produced every single month, entirely in-house. Scripts, shoots, post — we own the entire pipeline." },
  { num: "04", stat: "29+",   title: "OTT Partner",            body: "Long-form shows across Aha, Hotstar, Amazon Prime, Viu, JioCinema. We built the bridge from digital to premium." },
  { num: "05", stat: "20+",   title: "Platform Partner",       body: "Platform programmes engineered for scale. 69,000+ pieces of content placed where audiences actually are." },
  { num: "06", stat: "200+",  title: "Brand Storytelling",     body: "Brand campaigns. 2B+ impressions. Hashify turns briefs into cultural moments that land and last." },
];

const TIMELINE = [
  { year: "2011", event: "Founded in Hyderabad. First creator network in South India when everyone else was buying TV spots." },
  { year: "2013", event: "Launched Wirally — the flagship Telugu digital content brand. First million views felt like a revolution." },
  { year: "2016", event: "Expanded to Tamil, Kannada, Malayalam, and Hindi. Five languages. One machine." },
  { year: "2018", event: "500+ creator network. First OTT originals commissioned. Proof that digital could go long-form." },
  { year: "2020", event: "YouTube Enterprise Partner — 1 of 12 in all of India. The industry stopped laughing." },
  { year: "2022", event: "250+ team. 5 states. 300+ brand campaigns. Scale as a default, not a goal." },
  { year: "2024", event: "4.8 Billion+ monthly views. 35+ original IPs. The numbers speak louder than any press release." },
  { year: "2025", event: "South India's largest content ecosystem. Nationally ambitious. Culturally unstoppable." },
];

const OFFICES = [
  { city: "Hyderabad", role: "HQ & Production", size: "Main Office" },
  { city: "Chennai",   role: "Tamil Content",   size: "Regional Office" },
];

const CULTURE_METRICS = [
  { value: 5,   suffix: "",   label: "Languages",  sub: "Telugu · Tamil · Kannada · Malayalam · Hindi" },
  { value: 2,   suffix: "",   label: "Cities",      sub: "Hyderabad & Chennai" },
  { value: 26,  suffix: "",   label: "Avg. Age",   sub: "Young team. Fast thinking." },
  { value: 750, suffix: "+",  label: "Creators",   sub: "Real people. Real audiences." },
];

// ── Hooks ──────────────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1.8, inView = false) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

// ── Film grain ─────────────────────────────────────────────────────────────────

function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px",
      }}
    />
  );
}


// ── Cursor spotlight ───────────────────────────────────────────────────────────

function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const el = spotRef.current?.closest("section");
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const leave = () => { mouseX.set(-999); mouseY.set(-999); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={spotRef}
      aria-hidden
      className="pointer-events-none absolute z-[3]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%)",
      }}
    />
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function AboutPageClient() {
  return (
    <main className="bg-[#080808]">
      <HeroSection />
      <OriginSection />
      <PillarsSection />
      <TimelineSection />
      <TeamSection />
      <AwardsSection />
      <Founders />
      <CultureSection />
      <CtaSection />
    </main>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const [ready, setReady] = useState(false);

  // Mouse position for parallax on the big "16"
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bigNumX = useSpring(useTransform(mouseX, [-1, 1], [-28, 28]), { stiffness: 60, damping: 18 });
  const bigNumY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), { stiffness: 60, damping: 18 });

  // Scroll parallax on the big "16"
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bigNumScrollY  = useTransform(scrollYProgress, [0, 1], ["0%",  "30%"]);
  const headlineY      = useTransform(scrollYProgress, [0, 1], ["0%",  "12%"]);
  const lineScaleX     = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] flex flex-col overflow-hidden lg:min-h-screen">
      <FilmGrain />
      <CursorSpotlight />

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div style={{ background: "radial-gradient(ellipse 55% 50% at 100% 100%, rgba(201,168,76,0.16) 0%, transparent 65%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(ellipse 40% 40% at 0% 0%, rgba(0,0,0,0.6) 0%, transparent 60%)" }} className="absolute inset-0" />
      </div>

      {/* Nav clearance */}
      <div className="relative z-10 pt-[5rem]" />

      {/* Giant outlined "15" — mouse + scroll parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[2] flex items-center justify-end pointer-events-none overflow-hidden pr-[5vw]"
        style={{ y: bigNumScrollY, x: bigNumX }}
      >
        <motion.span
          className="font-display select-none"
          style={{
            fontSize: "clamp(38vw, 42vw, 58vw)",
            lineHeight: 0.85,
            WebkitTextStroke: "1px rgba(245,230,208,0.06)",
            color: "transparent",
            letterSpacing: "-0.04em",
            y: bigNumY,
          }}
          initial={{ opacity: 0, x: 80 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
        >
          15
        </motion.span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-1 section-padding">

        {/* Top row: eyebrow + est. year */}
        <motion.div
          className="flex items-center justify-between pt-10"
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-[#C9A84C] block" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-[#F5E6D0]/35 font-semibold">About Tamada Media</span>
          </div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#F5E6D0]/20 font-semibold hidden lg:block">Est. 2011 · Hyderabad</span>
        </motion.div>

        {/* Headline — left aligned, pushed to lower half */}
        <motion.div className="flex flex-col lg:flex-1 pt-8 lg:justify-end lg:pt-0 pb-8 lg:pb-12" style={{ y: headlineY }}>

          {/* Sweeping red line */}
          <motion.div
            className="w-full h-px bg-[#C9A84C]/30 mb-8"
            style={{ scaleX: lineScaleX, originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          />

          <div className="max-w-[85%] lg:max-w-[70%]">
            {[
              { text: "YEARS OF",   color: "text-[#F5E6D0]/25", size: "clamp(1.4rem,4vw,5.5rem)" },
              { text: "BUILDING",   color: "text-[#F5E6D0]",    size: "clamp(2rem,7.5vw,10rem)" },
              { text: "THE SOUTH.", color: "text-[#C9A84C]",     size: "clamp(2rem,7.5vw,10rem)" },
            ].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className={`font-display leading-[0.88] ${line.color}`}
                  style={{ fontSize: line.size }}
                  initial={{ y: "110%", skewY: 2 }}
                  animate={ready ? { y: "0%", skewY: 0 } : {}}
                  transition={{ duration: 1.0, delay: 0.4 + i * 0.14, ease: EASE }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Credentials — unique facts, editorial table layout */}
          <motion.div
            className="w-full"
            style={{ marginTop: "40px" }}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="flex flex-col divide-y divide-[#F5E6D0]/[0.08]">
              {CREDENTIALS.map((c, i) => (
                <CredentialRow key={i} item={c} index={i} active={ready} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom: scroll cue + tagline */}
        <motion.div
          className="flex items-end justify-between pb-6"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <div className="relative overflow-hidden" style={{ width: "1px", height: "36px", background: "rgba(245,230,208,0.10)" }}>
              <motion.div
                className="absolute top-0 left-0 right-0"
                style={{ height: "14px", background: "linear-gradient(to bottom, #C9A84C, transparent)" }}
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
              />
            </div>
            <span className="text-[#F5E6D0]/20 font-semibold" style={{ fontSize: "8px", letterSpacing: "0.4em", textTransform: "uppercase" }}>Scroll</span>
          </div>
          <p className="text-[#F5E6D0]/20 text-xs tracking-[0.15em] hidden lg:block max-w-xs text-right leading-relaxed">
            We started when people laughed at digital creators.
          </p>
        </motion.div>
      </div>

      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#F5E6D0]/[0.07] z-10"
        initial={{ scaleX: 0 }}
        animate={ready ? { scaleX: 1 } : {}}
        style={{ originX: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
      />
    </section>
  );
}

function CredentialRow({
  item,
  index,
  active,
}: {
  item: (typeof CREDENTIALS)[0];
  index: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex items-baseline gap-6 lg:gap-12 py-4 lg:py-5 cursor-default group overflow-hidden"
      initial={{ opacity: 0, x: -16 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 1.0 + index * 0.09, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sliding fill on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
        initial={{ x: "-100%" }}
        animate={{ x: hovered ? "0%" : "-100%" }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      {/* Bottom rule */}
      <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <span
        className="font-display leading-none shrink-0 tabular-nums relative"
        style={{
          fontSize: "clamp(1.4rem, 2.8vw, 3.2rem)",
          color: hovered ? "#C9A84C" : "rgba(245,230,208,0.9)",
          transition: "color 0.25s",
          minWidth: "7ch",
        }}
      >
        {item.num}
      </span>
      <p
        className="text-[10px] lg:text-xs leading-[1.75] tracking-wide relative"
        style={{ color: hovered ? "rgba(245,230,208,0.7)" : "rgba(245,230,208,0.28)", transition: "color 0.25s" }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

// ── Origin ─────────────────────────────────────────────────────────────────────

function OriginSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F5E6D0] relative overflow-hidden">

      {/* Ghost watermark */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 font-display leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(12rem,28vw,36rem)", color: "rgba(10,10,10,0.04)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
      >
        2011
      </div>

      <div className="section-padding relative z-10">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-14"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Our Story</span>
        </motion.div>

        {/* Headline — varied sizes for rhythm */}
        <div className="mb-0">
          {[
            { text: "THE INDUSTRY", color: "rgba(10,10,10,0.12)", size: "clamp(2rem,7vw,10rem)" },
            { text: "LAUGHED.", color: "#C9A84C", size: "clamp(2.2rem,9.5vw,13.5rem)" },
            { text: "WE BUILT.", color: "#0A0A0A", size: "clamp(2.2rem,9.5vw,13.5rem)" },
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="font-display leading-[0.88]"
                style={{ fontSize: line.size, color: line.color }}
                initial={{ y: "110%", skewY: 1.5 }}
                animate={inView ? { y: "0%", skewY: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.1 + i * 0.13, ease: EASE }}
              >
                {line.text}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Rule with year stamp */}
        <div className="flex items-center gap-6 mt-14 mb-14">
          <motion.div
            className="flex-1 h-px bg-[#0A0A0A]/10"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
          />
          <motion.span
            className="text-[9px] tracking-[0.4em] uppercase text-[#0A0A0A]/25 font-bold shrink-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Est. 2011
          </motion.span>
        </div>

        {/* Editorial body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: body */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <p className="text-[#0A0A0A]/60 text-base lg:text-lg leading-[1.95]">
              When every agency was buying TV spots and billboard space, we were building creator networks in Telugu, Tamil, and Kannada. Nobody had a name for what we were doing. The creator economy wasn&apos;t a phrase. Digital wasn&apos;t a strategy — it was a punchline.
            </p>
            <p className="text-[#0A0A0A]/50 text-base lg:text-lg leading-[1.95] mt-6">
              We didn&apos;t pivot to digital. We were born there. Fourteen years and{" "}
              <strong className="text-[#0A0A0A]/80 font-semibold">4.8 billion monthly views</strong>{" "}
              later, the industry that laughed is asking us how we did it.
            </p>
          </motion.div>

          {/* Right: pull quote */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center border-l-2 border-[#C9A84C]/30 lg:pl-12"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          >
            <span
              className="font-display text-[#C9A84C] select-none"
              style={{ fontSize: "clamp(4rem,10vw,8rem)", lineHeight: 0.6 }}
              aria-hidden
            >
              &ldquo;
            </span>
            <p
              className="font-display text-[#0A0A0A] leading-[0.92] mt-2"
              style={{ fontSize: "clamp(1.6rem,2.5vw,3rem)" }}
            >
              We didn&apos;t pivot to digital. We were born there.
            </p>
            <div className="mt-8 pt-8 border-t border-[#0A0A0A]/10 flex items-center gap-3">
              <span className="w-8 h-px bg-[#C9A84C] shrink-0" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#0A0A0A]/30 font-bold">Tamada Media · Est. 2011</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Pillars ────────────────────────────────────────────────────────────────────

function PillarsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#080808] relative overflow-hidden">
      <FilmGrain />
      <CursorSpotlight />
      <div className="relative z-10 section-padding pb-0">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">What We Are</span>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-display text-[clamp(2rem,6.5vw,9rem)] leading-[0.87] text-[#F5E6D0]"
            initial={{ y: "108%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            NOT ONE THING.{" "}<span className="text-[#C9A84C]">EVERY THING.</span>
          </motion.h2>
        </div>
      </div>

      {/* Card grid — no side padding, bleeds edge to edge */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5E6D0]/[0.07]">
        {PILLARS.map((p, i) => (
          <PillarCard key={i} pillar={p} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function PillarCard({ pillar, index, inView }: { pillar: typeof PILLARS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-transparent flex flex-col overflow-hidden cursor-default"
      style={{ padding: "clamp(1.8rem,3.5vw,3.5rem)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 65%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top: number */}
      <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-6 relative">{pillar.num}</p>

      {/* Stat — the big number */}
      <p
        className="font-display leading-none tabular-nums relative"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 8rem)",
          color: hovered ? "#C9A84C" : "rgba(245,230,208,0.88)",
          transition: "color 0.3s",
        }}
      >
        {pillar.stat}
      </p>

      {/* Bottom: title + body */}
      <div className="relative mt-auto pt-8">
        <h3
          className="font-display leading-tight mb-3"
          style={{
            fontSize: "clamp(1.1rem,1.5vw,1.6rem)",
            color: hovered ? "#F5E6D0" : "rgba(245,230,208,0.65)",
            transition: "color 0.3s",
          }}
        >
          {pillar.title}
        </h3>
        <p className="text-[#F5E6D0]/28 text-sm leading-[1.8]">{pillar.body}</p>
      </div>

      {/* Bottom sweep */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] origin-left"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </motion.div>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────────

function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#080808] relative overflow-hidden">
      {/* Grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px" }}
      />

      {/* Header */}
      <div className="section-padding pb-0 relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="w-5 h-px bg-[#C9A84C] block" />
              <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">The Journey</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(1.8rem,5.5vw,7rem)] leading-[0.87] text-[#F5E6D0]"
                initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              >
                2011 <span className="text-[#C9A84C]">→</span> NOW.
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="text-[#F5E6D0]/20 text-xs tracking-[0.2em] uppercase hidden lg:block text-right leading-relaxed max-w-[160px]"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Fifteen years of building what nobody else would
          </motion.p>
        </div>
      </div>

      {/* Timeline rows */}
      <div className="relative z-10">
        {TIMELINE.map((t, i) => (
          <TimelineRow key={t.year} item={t} index={i} inView={inView} last={i === TIMELINE.length - 1} />
        ))}
      </div>
    </section>
  );
}

function TimelineRow({
  item, index, inView, last,
}: {
  item: typeof TIMELINE[0];
  index: number;
  inView: boolean;
  last: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative border-t border-[#F5E6D0]/[0.07] cursor-default group"
      style={{ borderBottom: last ? "1px solid rgba(245,230,208,0.07)" : undefined }}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.06) 0%, transparent 50%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Gold left bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A84C] origin-top"
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <div className="section-padding py-6 lg:py-7 relative z-10 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0">
        {/* Year */}
        <motion.span
          className="font-display tabular-nums shrink-0 lg:w-36"
          style={{ fontSize: "clamp(1.4rem,2vw,2rem)", lineHeight: 1 }}
          animate={{ color: hovered ? "#C9A84C" : "rgba(245,230,208,0.35)" }}
          transition={{ duration: 0.25 }}
        >
          {item.year}
        </motion.span>

        {/* Dot + line connector */}
        <div className="hidden lg:flex items-center gap-0 shrink-0 w-24">
          <motion.div
            className="w-2 h-2 rounded-full border shrink-0"
            animate={{
              borderColor: hovered ? "#C9A84C" : "rgba(245,230,208,0.2)",
              backgroundColor: hovered ? "#C9A84C" : "transparent",
            }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className="flex-1 h-px"
            animate={{ backgroundColor: hovered ? "rgba(201,168,76,0.4)" : "rgba(245,230,208,0.08)" }}
            transition={{ duration: 0.25 }}
          />
        </div>

        {/* Event */}
        <motion.p
          className="flex-1 text-sm lg:text-base leading-[1.75] lg:pl-6"
          animate={{ color: hovered ? "rgba(245,230,208,0.85)" : "rgba(245,230,208,0.4)" }}
          transition={{ duration: 0.25 }}
        >
          {item.event}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ── Team ───────────────────────────────────────────────────────────────────────

function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-[#080808] relative overflow-hidden">
      <FilmGrain />
      <CursorSpotlight />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 100% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        <motion.p className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our People
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8" style={{ marginBottom: "56px" }}>
          <div>
            {["250+ PEOPLE.", "2 CITIES."].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  className={`font-display text-[clamp(2rem,6.5vw,9rem)] leading-[0.87] ${i === 1 ? "text-[#C9A84C]" : "text-[#F5E6D0]"}`}
                  initial={{ y: "108%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
          <motion.p
            className="text-[#F5E6D0]/30 text-base max-w-xs leading-[1.85] lg:text-right pb-2"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            Creators, editors, strategists, producers, engineers. Average age 26. Built for speed.
          </motion.p>
        </div>

        {/* Culture metric cards — 3D on hover with count-up */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4" style={{ marginBottom: "56px" }}>
          {CULTURE_METRICS.map((c, i) => (
            <CultureCard key={i} metric={c} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}

function OfficeRow({ office, index, inView }: { office: typeof OFFICES[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center justify-between py-5 cursor-default relative overflow-hidden"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.85 + index * 0.07, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sliding bg */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.06) 0%, transparent 60%)" }}
        initial={{ x: "-100%" }}
        animate={{ x: hovered ? "0%" : "-100%" }}
        transition={{ duration: 0.45, ease: EASE }}
      />

      <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

      <motion.h3
        className="font-display relative"
        style={{ fontSize: "clamp(1.2rem,2.5vw,1.875rem)" }}
        animate={{ color: hovered ? "#C9A84C" : "#F5E6D0" }}
        transition={{ duration: 0.25 }}
      >
        {office.city}
      </motion.h3>
      <div className="flex items-center gap-8 lg:gap-16 relative">
        <p className="text-[#F5E6D0]/25 text-xs tracking-[0.2em] uppercase hidden lg:block">{office.role}</p>
        <motion.p
          className="text-xs tracking-[0.2em] uppercase font-bold"
          animate={{ color: hovered ? "rgba(245,230,208,0.85)" : "rgba(245,230,208,0.5)" }}
          transition={{ duration: 0.25 }}
        >
          {office.size}
        </motion.p>
      </div>
    </motion.div>
  );
}

function CultureCard({ metric, index, inView }: { metric: typeof CULTURE_METRICS[0]; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dn = index / (CULTURE_METRICS.length - 1);
  const tz = 15 + dn * 30;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-6, 6]), { stiffness: 300, damping: 25 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const count = useCounter(metric.value, 1.6 + index * 0.15, inView);
  const display = metric.value >= 100
    ? Math.round(count).toString()
    : count.toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.35 + index * 0.1, ease: EASE }}
      style={{ perspective: "600px" }}
    >
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden group cursor-default"
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          background: `rgba(${12 + dn * 6}, ${12 + dn * 6}, ${12 + dn * 6}, 0.92)`,
          border: `1px solid rgba(245,230,208,${0.07 + dn * 0.1})`,
          backdropFilter: "blur(16px)",
          boxShadow: `0 ${16 + dn * 20}px ${40 + dn * 30}px rgba(0,0,0,${0.5 + dn * 0.2})`,
          padding: "24px",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{
          borderColor: "rgba(201,168,76,0.45)",
          transition: { duration: 0.2 },
        }}
      >
        <span className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#C9A84C] opacity-60" />
        <span className="absolute top-0 left-0 h-4 w-[1.5px] bg-[#C9A84C] opacity-60" />

        <motion.div animate={{ y: [0, -(4 + index * 2), 0] }} transition={{ duration: 3.5 + index * 0.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}>
          <p className="font-display text-[#F5E6D0] leading-none mb-3 tabular-nums" style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)" }}>
            {display}{metric.suffix}
          </p>
          <p className="text-[#F5E6D0]/55 text-[10px] tracking-[0.25em] uppercase font-bold mb-2">{metric.label}</p>
          <p className="text-[#F5E6D0]/20 text-[9px] leading-relaxed">{metric.sub}</p>
        </motion.div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 55%)" }} />
      </motion.div>
    </motion.div>
  );
}

// ── Culture ────────────────────────────────────────────────────────────────────

const FLOATING_SCRIPTS = [
  { word: "తెలుగు", left: "4%",  top: "8%",  size: "clamp(2rem,5vw,5rem)",    dur: 7,  delay: 0 },
  { word: "தமிழ்",  left: "52%", top: "6%",  size: "clamp(1.8rem,4vw,4.5rem)", dur: 9,  delay: 1.5 },
  { word: "ಕನ್ನಡ",  left: "55%", top: "55%", size: "clamp(2rem,5vw,5rem)",    dur: 8,  delay: 0.7 },
  { word: "മലയാളം",left: "4%",  top: "68%", size: "clamp(1.6rem,4vw,4rem)",  dur: 10, delay: 2.2 },
  { word: "हिन्दी", left: "38%", top: "76%", size: "clamp(1.6rem,4vw,4.5rem)", dur: 6,  delay: 1.1 },
  { word: "SOUTH",  left: "34%", top: "20%", size: "clamp(1.2rem,2.5vw,3rem)", dur: 11, delay: 3.0 },
];

function CultureSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="section-padding bg-[#C9A84C] relative overflow-hidden lg:min-h-[60vh]">
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* Floating native script words — desktop only */}
      <div aria-hidden className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_SCRIPTS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute font-display select-none"
            style={{
              left: s.left,
              top: s.top,
              fontSize: s.size,
              color: "rgba(245,230,208,0.07)",
              lineHeight: 1,
            }}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          >
            {s.word}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,0,0,0.15) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl">
        {["WE ARE NOT TRYING", "TO CRACK SOUTH.", "WE ARE SOUTH."].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(1.8rem,6vw,8.5rem)] leading-[0.87] text-[#F5E6D0]"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.95, delay: 0.1 + i * 0.12, ease: EASE }}
            >
              {line}
            </motion.h2>
          </div>
        ))}

        <motion.p
          className="mt-10 text-[#F5E6D0]/60 text-base lg:text-xl leading-[1.85] max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          The culture of South India — its storytelling, its humour, its emotion — is not something we study.
          It&apos;s something we live. That&apos;s why our content doesn&apos;t just reach audiences. It resonates.
        </motion.p>

      </div>
    </section>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────────

function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Magnetic button
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(mx, { stiffness: 200, damping: 18 });
  const by = useSpring(my, { stiffness: 200, damping: 18 });

  const onBtnMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    mx.set((e.clientX - left - width / 2) * 0.35);
    my.set((e.clientY - top - height / 2) * 0.35);
  };
  const onBtnLeave = () => { mx.set(0); my.set(0); };

  return (
    <section ref={ref} className="section-padding bg-[#080808] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 relative overflow-hidden">
      <FilmGrain />
      <CursorSpotlight />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 0% 100%, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10">
        {["READY TO BUILD", "SOMETHING BIG?"].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(1.8rem,6vw,8rem)] leading-[0.87] text-[#F5E6D0]"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      <motion.div
        className="relative z-10 shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        style={{ x: bx, y: by }}
      >
        <Link
          href="/contact"
          ref={btnRef as React.Ref<HTMLAnchorElement>}
          className="relative inline-flex items-center gap-4 px-6 py-4 sm:px-10 sm:py-5 bg-[#C9A84C] text-[#F5E6D0] text-sm font-bold tracking-[0.2em] uppercase overflow-hidden group"
          onMouseMove={onBtnMove}
          onMouseLeave={onBtnLeave}
        >
          <span className="absolute inset-0 bg-[#F5E6D0] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="relative z-10 group-hover:text-[#C9A84C] transition-colors duration-300">Let&apos;s Talk</span>
          <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
