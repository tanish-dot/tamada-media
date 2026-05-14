"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import MediaCard from "@/components/ui/MediaCard";
import CampaignShowcase from "@/components/sections/CampaignShowcase";
import IPCreation from "@/components/sections/IPCreation";
import BrandLogoGrid from "@/components/sections/BrandLogoGrid";
import MarqueeDivider from "@/components/ui/MarqueeDivider";
import { MICRO_DRAMAS, OTT_SHOWS } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const STACK_SHOWS = [
  { title: "HOSTEL DAYS",   genre: "OTT Drama",       platform: "Hotstar",    stat: "5+ Seasons",    accent: "#EF4444", bg: "#1a0808", poster: "/stack/hostel-days.jpg" },
  { title: "BOYZZZZ",       genre: "Branded Series",  platform: "YouTube",    stat: "40M+ Views",    accent: "#C9A84C", bg: "#130505", poster: "/stack/boyzzzz.jpg" },
  { title: "WIRALLY",       genre: "Flagship IP",     platform: "IP Channel", stat: "280M Subs",     accent: "#10B981", bg: "#05130a", poster: "/stack/wirally.jpg" },
  { title: "SOTARI BROTHERS", genre: "Mini Series",   platform: "YouTube",    stat: "8M+ Views",     accent: "#F59E0B", bg: "#14100a", poster: "/stack/sotari-brothers.jpg" },
  { title: "DEAD PIXELS",   genre: "OTT Thriller",    platform: "Hotstar",    stat: "Crime Series",  accent: "#8B5CF6", bg: "#0a0514", poster: "/stack/dead-pixels.jpg" },
  { title: "GAAMI",         genre: "OTT Original",    platform: "ZEE5",       stat: "Pan-India",     accent: "#F97316", bg: "#140808", poster: "/stack/gaami.jpg" },
];

const TICKER_NAMES = [
  "Hostel Days", "Boyzzzz", "Wirally", "Rowdy Baby", "Dead Pixels",
  "Hawala", "Araathi", "Geetha Subramanyam", "Rao's vs Murthy's",
  "#BFF", "Night Boyfriend", "Commit Mental", "Tere", "The Last",
  "We're Pregnant", "Arakai Animutyan", "Lukka Chuppi", "Cake Walk",
];

const OTT_PARTNERS = [
  "Disney+ Hotstar", "Amazon Prime Video", "Zee5", "Aha",
  "Viu", "MX Player", "Sony LIV", "JioCinema", "BBC Studios India",
];

const OWNED_PROPERTIES = [
  {
    number: "01",
    name: "Wirally",
    type: "Flagship Entertainment IP",
    desc: "Telugu entertainment powerhouse. Original formats, comedy sketches, relationship content, and viral series — all under one roof. South India's most consistent digital content brand.",
    stats: [
      { v: "1.6M+", l: "Subscribers" },
      { v: "700M+", l: "Total Views" },
      { v: "20+",   l: "Hrs / Week" },
    ],
    bg: "#0A0A0A",
    accent: "#10B981",
    ticker: ["1.6M+ Subs", "700M+ Total Views", "Telugu Entertainment", "Original IPs", "Comedy & Drama", "Relationship Content"],
  },
  {
    number: "02",
    name: "Filmy Focus",
    type: "South Indian Film Editorial",
    desc: "South India's go-to film editorial brand. Box office tracking, celeb exclusives, industry analysis, and entertainment news across Telugu, Tamil, Kannada, and Malayalam.",
    stats: [
      { v: "100K+",  l: "Articles" },
      { v: "Daily",  l: "Coverage" },
      { v: "4",      l: "Languages" },
    ],
    bg: "#0D0A00",
    accent: "#F59E0B",
    ticker: ["South Indian Film News", "Box Office Tracking", "Celebrity Exclusives", "4 Languages", "Daily Coverage", "Industry Analysis"],
  },
  {
    number: "03",
    name: "Hashify",
    type: "Regional Influencer Marketing",
    desc: "India's first regional influencer marketing platform. Connecting brands to 3000+ creators across 5 South Indian languages. Not just reach — cultural resonance.",
    stats: [
      { v: "3000+", l: "Creators" },
      { v: "5",     l: "Languages" },
      { v: "1st",   l: "Of Its Kind" },
    ],
    bg: "#06000D",
    accent: "#8B5CF6",
    ticker: ["3000+ Creators", "5 Languages", "Regional Influencer Marketing", "India's First", "Brand Campaigns", "Cultural Resonance"],
  },
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
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[65vw] h-[65vh]"
          style={{ background: "radial-gradient(ellipse at 80% 100%, rgba(201,168,76,0.13) 0%, transparent 65%)" }}
        />
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-[40vw] h-[40vh]"
          style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-end section-padding pt-36 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-12">

            <div className="lg:w-[42%] flex-shrink-0">
              <motion.p
                className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-6"
                initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our Work
              </motion.p>

              <div className="overflow-hidden mb-1">
                <motion.h1
                  className="font-display text-[clamp(3rem,13vw,16rem)] leading-[0.83] text-[#F5E6D0]"
                  initial={{ y: "110%" }}
                  animate={heroInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
                >
                  THE
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(3rem,13vw,16rem)] leading-[0.83] text-[#C9A84C]"
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
            className="mt-12 pt-8 border-t border-[#F5E6D0]/[0.07] grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6"
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[["29+", "OTT Shows"], ["40M+", "Views / Series"], ["280M", "IP Subscribers"], ["300+", "Campaigns"]].map(([v, l]) => (
              <div key={l} className="flex flex-col gap-2">
                <p className="font-display text-[clamp(1.8rem,3vw,3.2rem)] leading-none text-[#F5E6D0]">{v}</p>
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#F5E6D0]/40 font-semibold">{l}</p>
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
                <span className="w-1 h-1 rounded-full bg-[#C9A84C]/50 flex-shrink-0" />
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-slow {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <MarqueeDivider bg="red" speed={26} />

      {/* OTT Originals */}
      <section className="section-padding bg-[#F5E6D0]">
        <OTTGrid />
      </section>

      <MarqueeDivider bg="dark" speed={38} reverse />

      {/* Branded micro-dramas */}
      <section className="section-padding bg-[#0A0A0A]">
        <BrandedSeriesGrid />
      </section>

      <MarqueeDivider bg="red" speed={22} />

      {/* Featured campaigns & projects */}
      <CampaignShowcase />

      {/* Brand Roster */}
      <BrandLogoGrid />

      {/* Channel Network */}
      <ChannelNetwork />

      {/* Owned Properties / Network */}
      <NetworkSection />

      <IPCreation />

    </main>
  );
}

/* ── Stacked poster cards ─────────────────────── */

function PosterStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = STACK_SHOWS.length;
  const prev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const next = () => setActiveIdx((i) => (i + 1) % total);

  const getCardStyle = (i: number) => {
    const raw = i - activeIdx;
    let dist = raw;
    if (dist > total / 2)  dist -= total;
    if (dist < -total / 2) dist += total;
    const abs = Math.abs(dist);
    return {
      rotate: dist * 9,
      x: dist * 34,
      y: abs * 12,
      scale: 1 - abs * 0.055,
      opacity: 1 - abs * 0.18,
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
                {/* Poster image */}
                {show.poster && (
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: isActive ? 0.85 : 0.35, transition: "opacity 0.4s" }}
                  />
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)" }}
                />
                <span className="absolute top-0 left-0 w-4 h-[2px]" style={{ background: show.accent }} />
                <span className="absolute top-0 left-0 w-[2px] h-4" style={{ background: show.accent }} />
                <span className="absolute bottom-0 right-0 w-4 h-[2px]" style={{ background: show.accent }} />
                <span className="absolute bottom-0 right-0 w-[2px] h-4" style={{ background: show.accent }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 100% 60% at 50% 100%, ${show.accent}14, transparent 70%)`, opacity: isActive ? 1 : 0.3, transition: "opacity 0.4s" }}
                />
                <p className="absolute top-3 left-3 text-[8px] tracking-[0.3em] uppercase font-bold"
                  style={{ color: isActive ? show.accent : "rgba(245,230,208,0.2)", transition: "color 0.4s" }}
                >
                  {show.genre}
                </p>
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

      <div className="flex items-center gap-4">
        <button onClick={prev} className="w-8 h-8 flex items-center justify-center border border-[#F5E6D0]/15 text-[#F5E6D0]/40 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300" aria-label="Previous">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="flex items-center gap-2">
          {STACK_SHOWS.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} className="transition-all duration-300"
              style={{ width: i === activeIdx ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === activeIdx ? "#C9A84C" : "rgba(245,230,208,0.2)" }}
            />
          ))}
        </div>
        <button onClick={next} className="w-8 h-8 flex items-center justify-center border border-[#F5E6D0]/15 text-[#F5E6D0]/40 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-300" aria-label="Next">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ── OTT Grid ─────────────────────────────────── */

function OTTGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref}>
      <motion.div
        style={{ marginBottom: "5rem" }}
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3" style={{ marginBottom: "1.25rem" }}>
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold">OTT Originals</p>
        </div>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2rem,6vw,8rem)] leading-[0.88] text-[#0A0A0A]">29+ SHOWS.</h2>
          <span className="text-xs text-[#6B6B6B] font-medium tracking-[0.2em] uppercase pb-2">5+ Platforms</span>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {OTT_SHOWS.map((show, i) => (
          <motion.div key={show.title}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
          >
            <MediaCard title={show.title} category={show.platform} stat={show.genre}
              aspectRatio="3/4" bg={`hsl(0, 0%, ${8 + (i % 5) * 2}%)`} accent="#C9A84C"
              index={i} slot={`work-ott-${i + 1}`} poster={show.poster} url={show.url} />
          </motion.div>
        ))}
      </div>

      {/* OTT Partner logos row */}
      <motion.div
        className="mt-14 pt-10 border-t border-[#0A0A0A]/10"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="text-[9px] tracking-[0.38em] uppercase font-bold text-[#0A0A0A]/30 mb-6">Platform Partners</p>
        <div className="flex flex-wrap gap-3">
          {OTT_PARTNERS.map((name) => (
            <span key={name} className="px-4 py-2 border border-[#0A0A0A]/12 text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A0A0A]/40 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300 cursor-default">
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Branded Series Grid ──────────────────────── */

function BrandedSeriesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const accents = ["#C9A84C", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#3B82F6", "#F97316", "#22C55E", "#E11D48", "#A855F7"];
  return (
    <div ref={ref}>
      <motion.div
        style={{ marginBottom: "5rem" }}
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3" style={{ marginBottom: "1.25rem" }}>
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold">Branded Storytelling</p>
        </div>
        <h2 className="font-display text-[clamp(2rem,6vw,8rem)] leading-[0.88] text-[#F5E6D0]">
          BRANDED MICRO DRAMAS
          <br />
          <span className="text-[#F5E6D0]/25">&amp; SHORT SERIES.</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {MICRO_DRAMAS.map((drama, i) => (
          <motion.div key={drama.title}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
          >
            <ProjectCard title={drama.title} category={"brand" in drama && drama.brand ? "Branded Series" : "Mini Series"}
              brand={"brand" in drama ? (drama.brand ?? undefined) : undefined}
              episodes={drama.episodes} views={drama.views} bg={`hsl(0, 0%, ${6 + (i % 4) * 3}%)`}
              accent={accents[i % accents.length]} index={i} slot={`work-drama-${i + 1}`}
              poster={drama.poster} url={drama.url} className="!aspect-video" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


/* ── Channel Network ──────────────────────────── */

function ChannelNetwork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const LANGUAGES = [
    { name: "Telugu",   pct: 55, color: "#C9A84C" },
    { name: "Tamil",    pct: 18, color: "#F59E0B" },
    { name: "Kannada",  pct: 12, color: "#10B981" },
    { name: "Malayalam",pct: 8,  color: "#8B5CF6" },
    { name: "Hindi",    pct: 7,  color: "#3B82F6" },
  ];

  const GENRES = ["Entertainment","Comedy","Drama","Food","Lifestyle","Finance","Travel","Education","Kids","Music","Film","Sports","Gaming","Beauty","Tech"];

  return (
    <section className="bg-[#080808] overflow-hidden border-t border-[#F5E6D0]/[0.06]">
      <div ref={ref} className="section-padding" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>

        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
          style={{ marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div>
            <div className="flex items-center gap-3" style={{ marginBottom: "1rem" }}>
              <span className="w-5 h-px bg-[#C9A84C] block" />
              <p className="text-[10px] tracking-[0.38em] uppercase text-[#C9A84C] font-bold">Channel Network</p>
            </div>
            <h2 className="font-display leading-[0.88] text-[#F5E6D0]" style={{ fontSize: "clamp(2rem,6vw,8rem)" }}>
              750+ CHANNELS.
              <br />
              <span style={{ color: "rgba(245,230,208,0.15)" }}>5 LANGUAGES.</span>
            </h2>
          </div>
          <p className="text-[#F5E6D0]/30 text-sm max-w-sm leading-[1.9] lg:text-right">
            South India&apos;s largest multi-channel network. YouTube, Meta, Instagram, and beyond — managed under one roof.
          </p>
        </motion.div>

        {/* Stats — full-width editorial rows */}
        <div className="border-t border-[#F5E6D0]/[0.07]" style={{ marginBottom: "5rem" }}>
          {[
            ["750+",  "Network Channels",   "YouTube + Meta"],
            ["4.8B+", "Monthly Views",       "Across all channels"],
            ["70K",   "Videos / Month",      "Short & long form"],
            ["280M+", "Total Subscribers",   "Combined network"],
          ].map(([v, l, sub], i) => (
            <motion.div
              key={l}
              className="flex items-center justify-between border-b border-[#F5E6D0]/[0.07] group cursor-default"
              style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.09, ease: EASE }}
            >
              <p
                className="font-display leading-none text-[#F5E6D0] group-hover:text-[#C9A84C] transition-colors duration-300"
                style={{ fontSize: "clamp(2.8rem,5.5vw,6.5rem)" }}
              >
                {v}
              </p>
              <div className="text-right">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-bold" style={{ marginBottom: "0.35rem" }}>{l}</p>
                <p className="text-[11px] text-[#F5E6D0]/20">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language breakdown */}
        <motion.div
          style={{ marginBottom: "5rem" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-[9px] tracking-[0.38em] uppercase font-bold text-[#F5E6D0]/25" style={{ marginBottom: "2.5rem" }}>
            Language Distribution
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {LANGUAGES.map((lang, i) => (
              <div key={lang.name} className="flex items-center" style={{ gap: "1.5rem" }}>
                <span
                  className="flex-shrink-0 text-[11px] font-bold tracking-[0.15em] uppercase text-[#F5E6D0]/40"
                  style={{ width: "6.5rem" }}
                >
                  {lang.name}
                </span>
                <div className="flex-1 relative overflow-hidden" style={{ height: "8px", background: "rgba(245,230,208,0.05)", borderRadius: "0" }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full"
                    style={{ background: lang.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${lang.pct}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.55 + i * 0.1, ease: EASE }}
                  />
                </div>
                <span
                  className="flex-shrink-0 text-right font-display text-[#F5E6D0]/40 leading-none"
                  style={{ fontSize: "clamp(1.2rem,1.6vw,1.5rem)", width: "3.5rem" }}
                >
                  {lang.pct}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Genre tags */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <p className="text-[9px] tracking-[0.38em] uppercase font-bold text-[#F5E6D0]/25" style={{ marginBottom: "1.5rem" }}>
            Content Genres
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {GENRES.map((g, i) => (
              <motion.span
                key={g}
                className="border border-[#F5E6D0]/10 font-bold tracking-[0.15em] uppercase text-[#F5E6D0]/30 hover:border-[#C9A84C]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300 cursor-default"
                style={{ padding: "0.6rem 1.25rem", fontSize: "11px" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.25, delay: 0.7 + i * 0.025 }}
              >
                {g}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Owned Properties / Network Section ──────── */

function PropertyFeature({ prop, index }: { prop: typeof OWNED_PROPERTIES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: prop.bg,
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 7rem)",
        paddingRight: "clamp(1.5rem, 5vw, 7rem)",
      }}
    >
      {/* Giant ghost name */}
      <div
        className="absolute pointer-events-none select-none font-display leading-none"
        style={{
          fontSize: "clamp(8rem, 17vw, 22rem)",
          color: `${prop.accent}09`,
          top: "50%",
          left: isEven ? "auto" : "-2%",
          right: isEven ? "-2%" : "auto",
          transform: "translateY(-50%)",
          whiteSpace: "nowrap",
          letterSpacing: "-0.04em",
        }}
        aria-hidden
      >
        {prop.name}
      </div>

      <div className="relative z-10">
        {/* Number + type */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span
            className="font-display leading-none"
            style={{ fontSize: "clamp(3rem, 5vw, 6rem)", color: `${prop.accent}40` }}
          >
            {prop.number}
          </span>
          <div>
            <div className="w-6 h-[2px] mb-2" style={{ background: prop.accent }} />
            <p className="text-[10px] tracking-[0.38em] uppercase font-bold" style={{ color: `${prop.accent}` }}>
              {prop.type}
            </p>
          </div>
        </motion.div>

        {/* Property name */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            className="font-display leading-[0.88]"
            style={{ fontSize: "clamp(4rem, 10vw, 14rem)", color: "#F5E6D0" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          >
            {prop.name.toUpperCase()}
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p
          className="text-base lg:text-lg leading-[1.85] max-w-xl mb-14"
          style={{ color: "rgba(245,230,208,0.4)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          {prop.desc}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-px"
          style={{ background: `${prop.accent}15`, maxWidth: "600px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
        >
          {prop.stats.map((s) => (
            <div key={s.l} className="px-6 py-6" style={{ background: prop.bg }}>
              <p
                className="font-display leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)", color: prop.accent }}
              >
                {s.v}
              </p>
              <p className="text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: "rgba(245,230,208,0.25)" }}>
                {s.l}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scale ticker */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t"
        style={{ borderColor: `${prop.accent}18`, paddingTop: "14px", paddingBottom: "14px" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: `marquee-slow ${22 + index * 4}s linear infinite` }}>
          {[...prop.ticker, ...prop.ticker, ...prop.ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-5">
              <span className="text-[10px] tracking-[0.28em] uppercase font-bold" style={{ color: `${prop.accent}50` }}>{item}</span>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: `${prop.accent}35` }} />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function NetworkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="overflow-hidden">
      {/* Section header */}
      <div
        ref={ref}
        className="section-padding bg-[#0A0A0A]"
        style={{ paddingBottom: "clamp(3rem, 6vw, 5rem)" }}
      >
        <motion.p
          className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Owned Properties
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(1.8rem,5vw,7rem)] leading-[0.88] text-[#F5E6D0]"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            THE NETWORK
            <br />
            <span className="text-[#C9A84C]">WE BUILT.</span>
          </motion.h2>
        </div>
        <motion.p
          className="mt-6 text-[#F5E6D0]/30 text-base max-w-lg leading-[1.85]"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Beyond client work — Tamada owns and operates its own media properties spanning entertainment, editorial, and influencer marketing.
        </motion.p>
      </div>

      {/* Property feature spreads */}
      {OWNED_PROPERTIES.map((prop, i) => (
        <PropertyFeature key={prop.name} prop={prop} index={i} />
      ))}
    </section>
  );
}

