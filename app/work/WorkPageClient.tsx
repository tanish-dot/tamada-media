"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import MediaCard from "@/components/ui/MediaCard";
import CampaignShowcase from "@/components/sections/CampaignShowcase";
import { MICRO_DRAMAS, OTT_SHOWS, IP_NAMES } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const STACK_SHOWS = [
  { title: "HOSTEL DAYS",   genre: "OTT Drama",       platform: "Hotstar",    stat: "5+ Seasons",    accent: "#EF4444", bg: "#1a0808" },
  { title: "BOYZZZZ",       genre: "Branded Series",  platform: "YouTube",    stat: "40M+ Views",    accent: "#B91C1C", bg: "#130505" },
  { title: "WIRALLY",       genre: "Flagship IP",     platform: "IP Channel", stat: "280M Subs",     accent: "#10B981", bg: "#05130a" },
  { title: "ROWDY BABY",    genre: "Content IP",      platform: "IP Channel", stat: "26M+ Subs",     accent: "#F59E0B", bg: "#14100a" },
  { title: "DEAD PIXELS",   genre: "OTT Thriller",    platform: "Hotstar",    stat: "Crime Series",  accent: "#8B5CF6", bg: "#0a0514" },
  { title: "ARAATHI",       genre: "Comedy IP",       platform: "IP Channel", stat: "Viral Format",  accent: "#F97316", bg: "#140808" },
];

const TICKER_NAMES = [
  "Hostel Days", "Boyzzzz", "Wirally", "Rowdy Baby", "Dead Pixels",
  "Hawala", "Araathi", "Geetha Subramanyam", "Rao's vs Murthy's",
  "#BFF", "Night Boyfriend", "Commit Mental", "Tere", "The Last",
  "We're Pregnant", "Arakai Animutyan", "Lukka Chuppi", "Cake Walk",
];

export default function WorkPageClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="bg-[#0A0A0A]">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen bg-[#0A0A0A] flex flex-col overflow-hidden">

        {/* Grain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px" }}
        />
        {/* Red glow — bottom right */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[65vw] h-[65vh]"
          style={{ background: "radial-gradient(ellipse at 80% 100%, rgba(185,28,28,0.13) 0%, transparent 65%)" }}
        />
        {/* Subtle top-left glow */}
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-[40vw] h-[40vh]"
          style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(185,28,28,0.05) 0%, transparent 70%)" }}
        />

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end section-padding pt-36 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-12">

            {/* Left — headline (fixed width so stack gets real centre space) */}
            <div className="lg:w-[42%] flex-shrink-0">
              <motion.p
                className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold mb-6"
                initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our Work
              </motion.p>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  className="font-display text-[clamp(5.5rem,13vw,16rem)] leading-[0.83] text-[#F5E6D0]"
                  initial={{ y: "110%" }}
                  animate={heroInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
                >
                  THE
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(5.5rem,13vw,16rem)] leading-[0.83] text-[#B91C1C]"
                  initial={{ y: "110%" }}
                  animate={heroInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.85, delay: 0.42, ease: EASE }}
                >
                  PROOF.
                </motion.h1>
              </div>

              <motion.p
                className="mt-7 text-[#F5E6D0]/35 text-sm lg:text-base max-w-xs leading-[1.9]"
                initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                OTT originals. Branded micro-dramas. Platform campaigns. Creator IPs. All of it.
              </motion.p>
            </div>

            {/* Right — stacked poster cards, centred in remaining space */}
            <motion.div
              className="flex-1 flex items-end justify-center pb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              <PosterStack />
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="mt-12 pt-8 border-t border-[#F5E6D0]/[0.07] flex items-center gap-10 lg:gap-16"
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[["29+", "OTT Shows"], ["40M+", "Views / Series"], ["280M", "IP Subscribers"], ["300+", "Campaigns"]].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-[clamp(1.8rem,3vw,3.2rem)] leading-none text-[#F5E6D0]">{v}</p>
                <p className="text-[8px] tracking-[0.3em] uppercase text-[#F5E6D0]/28 mt-1.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scrolling ticker */}
        <motion.div
          className="relative z-10 border-t border-[#F5E6D0]/[0.06] py-4 overflow-hidden"
          initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
            {[...TICKER_NAMES, ...TICKER_NAMES].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-4">
                <span className="font-display text-[11px] tracking-[0.25em] uppercase text-[#F5E6D0]/20">{name}</span>
                <span className="w-1 h-1 rounded-full bg-[#B91C1C]/50 flex-shrink-0" />
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* keyframe for the ticker */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* OTT Originals */}
      <section className="section-padding bg-[#F5E6D0]">
        <OTTGrid />
      </section>

      {/* Branded micro-dramas */}
      <section className="section-padding bg-[#0A0A0A]">
        <BrandedSeriesGrid />
      </section>

      {/* Featured campaigns & projects */}
      <CampaignShowcase />

      {/* Content IPs */}
      <section className="section-padding bg-[#0A0A0A]">
        <IPsGrid />
      </section>

    </main>
  );
}

/* ── Stacked poster cards ─────────────────────── */

function PosterStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = STACK_SHOWS.length;
  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  // Dynamic offset based on distance from active card
  const getCardStyle = (i: number) => {
    const raw = i - activeIdx;
    // Wrap distance so cards always fan out both sides
    let dist = raw;
    if (dist > total / 2)  dist -= total;
    if (dist < -total / 2) dist += total;

    const abs = Math.abs(dist);
    return {
      rotate: dist * 9,          // degrees — fans left/right
      x: dist * 34,              // px — spread horizontally
      y: abs * 12,               // px — sink down with distance
      scale: 1 - abs * 0.055,    // shrink with distance
      opacity: 1 - abs * 0.18,   // fade with distance
      zIndex: 20 - abs,
    };
  };

  return (
    <div className="flex flex-col items-center gap-8">
    <div className="relative" style={{ width: 220, height: 320 }}>
      {STACK_SHOWS.map((show, i) => {
        const isActive = i === activeIdx;
        const s = getCardStyle(i);

        return (
          <motion.div
            key={show.title}
            className="absolute top-0 left-0 w-full h-full cursor-pointer"
            style={{ zIndex: isActive ? 20 : s.zIndex }}
            animate={{
              rotate: isActive ? 1 : s.rotate,
              x: isActive ? 0 : s.x,
              y: isActive ? 0 : s.y,
              scale: isActive ? 1 : s.scale,
              opacity: isActive ? 1 : s.opacity,
            }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={() => setActiveIdx(i)}
            whileHover={!isActive ? { scale: s.scale + 0.04, opacity: Math.min(s.opacity + 0.15, 1) } : { scale: 1.025 }}
          >
            {/* Card face */}
            <div
              className="w-full h-full relative overflow-hidden"
              style={{
                background: `linear-gradient(145deg, ${show.bg} 0%, #0d0d0d 100%)`,
                border: `1px solid ${isActive ? show.accent + "50" : "rgba(245,230,208,0.07)"}`,
                boxShadow: isActive
                  ? `0 30px 70px rgba(0,0,0,0.8), 0 0 40px ${show.accent}18`
                  : "0 10px 30px rgba(0,0,0,0.5)",
                transition: "border-color 0.4s, box-shadow 0.4s",
              }}
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-4 h-[2px]" style={{ background: show.accent }} />
              <span className="absolute top-0 left-0 w-[2px] h-4" style={{ background: show.accent }} />
              <span className="absolute bottom-0 right-0 w-4 h-[2px]" style={{ background: show.accent }} />
              <span className="absolute bottom-0 right-0 w-[2px] h-4" style={{ background: show.accent }} />

              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 100% 60% at 50% 100%, ${show.accent}14, transparent 70%)`, opacity: isActive ? 1 : 0.3, transition: "opacity 0.4s" }}
              />

              {/* Genre tag */}
              <p className="absolute top-3 left-3 text-[8px] tracking-[0.3em] uppercase font-bold"
                style={{ color: isActive ? show.accent : "rgba(245,230,208,0.2)" , transition: "color 0.4s" }}
              >
                {show.genre}
              </p>

              {/* Title */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <p className="font-display text-center leading-[0.87]"
                  style={{
                    fontSize: "1.9rem",
                    color: isActive ? "#F5E6D0" : "rgba(245,230,208,0.12)",
                    transition: "color 0.4s",
                    letterSpacing: "0.03em",
                  }}
                >
                  {show.title}
                </p>
              </div>

              {/* Bottom row */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[7px] tracking-[0.2em] uppercase font-bold px-2 py-0.5"
                  style={{
                    background: isActive ? show.accent + "1a" : "rgba(245,230,208,0.04)",
                    color: isActive ? show.accent : "rgba(245,230,208,0.2)",
                    border: `1px solid ${isActive ? show.accent + "30" : "rgba(245,230,208,0.05)"}`,
                    transition: "all 0.4s",
                  }}
                >
                  {show.platform}
                </span>
                <span className="text-[7px] font-bold"
                  style={{ color: isActive ? show.accent : "rgba(245,230,208,0.15)", transition: "color 0.4s" }}
                >
                  {show.stat}
                </span>
              </div>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${show.accent}, transparent)`,
                  opacity: isActive ? 0.8 : 0.1,
                  transition: "opacity 0.4s",
                }}
              />
            </div>
          </motion.div>
        );
      })}

    </div>

      {/* Controls: prev — dots — next */}
      <div className="flex items-center gap-4">
        {/* Prev */}
        <button
          onClick={prev}
          className="w-8 h-8 flex items-center justify-center border border-[#F5E6D0]/15 text-[#F5E6D0]/40 hover:border-[#B91C1C]/50 hover:text-[#B91C1C] transition-all duration-300"
          aria-label="Previous"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {STACK_SHOWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="transition-all duration-300"
              style={{
                width: i === activeIdx ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeIdx ? "#B91C1C" : "rgba(245,230,208,0.2)",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="w-8 h-8 flex items-center justify-center border border-[#F5E6D0]/15 text-[#F5E6D0]/40 hover:border-[#B91C1C]/50 hover:text-[#B91C1C] transition-all duration-300"
          aria-label="Next"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Rest of page ─────────────────────────────── */

function OTTGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref}>
      <motion.div className="flex items-center justify-between mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-2">OTT Originals</p>
          <h2 className="font-display text-[clamp(2rem,4vw,5rem)] leading-none text-[#0A0A0A]">29+ SHOWS.</h2>
        </div>
        <span className="text-xs text-[#6B6B6B] font-medium">5+ Platforms</span>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {OTT_SHOWS.map((show, i) => (
          <motion.div key={show.title}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
          >
            <MediaCard title={show.title} category={show.platform} stat={show.genre}
              aspectRatio="3/4" bg={`hsl(0, 0%, ${8 + (i % 5) * 2}%)`} accent="#B91C1C"
              index={i} slot={`work-ott-${i + 1}`} poster={show.poster} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BrandedSeriesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const accents = ["#B91C1C", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#3B82F6", "#F97316", "#22C55E", "#E11D48", "#A855F7"];
  return (
    <div ref={ref}>
      <motion.div className="flex items-center justify-between mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-2">Branded Series</p>
          <h2 className="font-display text-[clamp(2rem,4vw,5rem)] leading-none text-[#F5E6D0]">MICRO-DRAMAS.</h2>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {MICRO_DRAMAS.map((drama, i) => (
          <motion.div key={drama.title}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
          >
            <ProjectCard title={drama.title} category="Branded Series" brand={drama.brand}
              episodes={drama.episodes} views={drama.views} bg={`hsl(0, 0%, ${6 + (i % 4) * 3}%)`}
              accent={accents[i % accents.length]} index={i} slot={`work-drama-${i + 1}`}
              poster={drama.poster} className="!aspect-video" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Featured Campaigns & Projects ───────────────────────────────── */

/* ── Content IPs ─────────────────────────────────────────────────── */

function IPsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const accentColors = [
    "#B91C1C","#10B981","#F59E0B","#8B5CF6","#EF4444","#3B82F6",
    "#F97316","#EC4899","#14B8A6","#A855F7","#84CC16","#06B6D4",
  ];

  return (
    <div ref={ref}>
      <motion.div className="flex items-end justify-between mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-2">Original IPs</p>
          <h2 className="font-display text-[clamp(2rem,4vw,5rem)] leading-none text-[#F5E6D0]">35+ IPs BUILT.</h2>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1">
          <p className="text-xs text-[#F5E6D0]/30">5 Languages</p>
          <p className="text-xs text-[#F5E6D0]/30">26M+ Subscribers</p>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {IP_NAMES.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <IPTag name={name} accent={accentColors[i % accentColors.length]} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 pt-10 border-t border-[#F5E6D0]/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {[["35+","Original IPs"],["26M+","Subscribers"],["5","Languages"],["3000+","Mins / Month"]].map(([v, l]) => (
          <div key={l}>
            <p className="font-display text-[clamp(2rem,3.5vw,4rem)] leading-none text-[#F5E6D0]">{v}</p>
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#F5E6D0]/30 mt-2">{l}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function IPTag({ name, accent }: { name: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="px-4 py-2.5 border text-xs font-bold tracking-[0.18em] uppercase cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? accent + "55" : "rgba(245,230,208,0.1)",
        color: hovered ? accent : "rgba(245,230,208,0.4)",
        background: hovered ? accent + "0d" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {name}
    </div>
  );
}

