"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const OPEN_ROLES = [
  {
    dept: "Content",
    num: "01",
    roles: [
      { title: "Senior Video Editor",            type: "Full-time", location: "Hyderabad" },
      { title: "Content Strategist",             type: "Full-time", location: "Hyderabad" },
      { title: "Scriptwriter — Telugu / Tamil",  type: "Full-time", location: "Hyderabad" },
      { title: "Thumbnail Designer",             type: "Full-time", location: "Hyderabad" },
    ],
  },
  {
    dept: "Production",
    num: "02",
    roles: [
      { title: "Director of Photography",        type: "Full-time", location: "Hyderabad" },
      { title: "Production Assistant",           type: "Full-time", location: "Hyderabad" },
      { title: "Motion Graphics Artist",         type: "Full-time", location: "Hyderabad" },
    ],
  },
  {
    dept: "Technology",
    num: "03",
    roles: [
      { title: "Full Stack Engineer",            type: "Full-time", location: "Hyderabad" },
      { title: "Data Analyst — Content Insights",type: "Full-time", location: "Hyderabad" },
    ],
  },
  {
    dept: "AI & Automation",
    num: "04",
    roles: [
      { title: "Prompt Engineer",                type: "Full-time", location: "Hyderabad" },
      { title: "AI Content Strategist",          type: "Full-time", location: "Hyderabad" },
      { title: "ML Engineer — Recommendations",  type: "Full-time", location: "Hyderabad" },
    ],
  },
];

const TOTAL_ROLES = OPEN_ROLES.reduce((s, d) => s + d.roles.length, 0);

const MARQUEE_ITEMS = [
  "Video Editing", "Scriptwriting", "Motion Graphics", "Content Strategy",
  "AI & Automation", "Full Stack Engineering", "Direction", "Data Analytics",
  "Production", "Thumbnail Design", "Post Production", "Brand Strategy",
];

const WHY_POINTS = [
  { num: "01", title: "Real IPs. Real scale.", body: "You won't be making content for client decks. You'll be building shows people actually watch — 4.8 billion times a month." },
  { num: "02", title: "Fast feedback loop.", body: "70,000 videos a month. The gap between idea and audience is days, not quarters. You'll know fast if it works." },
  { num: "03", title: "South India's biggest stage.", body: "Every piece of content you make reaches more people than most national campaigns. The scale is real." },
  { num: "04", title: "Ownership, not headcount.", body: "We don't micromanage. If you own it, you ship it. No hand-holding, no approval chains for everything." },
  { num: "05", title: "Young team. Fast thinking.", body: "Average age 26. The energy in the building is different. Come see for yourself." },
];

// ── Film grain ─────────────────────────────────────────────────────────────────

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px",
      }}
    />
  );
}

// ── Marquee ────────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden w-full py-4 border-t border-b border-[#F5E6D0]/[0.07]">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#F5E6D0]/25 font-bold">{item}</span>
            <span className="w-1 h-1 rounded-full bg-[#C9A84C] shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Role row ───────────────────────────────────────────────────────────────────

function RoleRow({ role, delay }: { role: { title: string; type: string; location: string }; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="mailto:recruitment@tamadamedia.com"
      className="relative flex items-center justify-between py-5 border-t border-[#F5E6D0]/[0.06] overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.07) 0%, transparent 60%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Left gold bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A84C] origin-top"
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />

      <motion.span
        className="font-display relative pl-4"
        style={{ fontSize: "clamp(1rem, 1.8vw, 1.5rem)", lineHeight: 1 }}
        animate={{ color: hovered ? "#F5E6D0" : "rgba(245,230,208,0.65)" }}
        transition={{ duration: 0.25 }}
      >
        {role.title}
      </motion.span>

      <div className="flex items-center gap-6 lg:gap-10 shrink-0 relative">
        <span
          className="text-[9px] tracking-[0.28em] uppercase font-bold hidden lg:block"
          style={{ color: hovered ? "rgba(245,230,208,0.4)" : "rgba(245,230,208,0.15)", transition: "color 0.25s" }}
        >
          {role.location}
        </span>
        <span
          className="text-[9px] tracking-[0.28em] uppercase font-bold px-2.5 py-1 border"
          style={{
            color: hovered ? "#C9A84C" : "rgba(245,230,208,0.2)",
            borderColor: hovered ? "rgba(201,168,76,0.4)" : "rgba(245,230,208,0.1)",
            transition: "color 0.25s, border-color 0.25s",
          }}
        >
          {role.type}
        </span>
        <motion.span
          className="font-display text-xl"
          animate={{ color: hovered ? "#C9A84C" : "rgba(245,230,208,0.2)", x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
        >
          →
        </motion.span>
      </div>
    </motion.a>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function CareersPageClient() {
  return (
    <main className="bg-[#080808]">
      <HeroSection />
      <Marquee />
      <RolesSection />
      <PitchSection />
      <WhySection />
    </main>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#080808] flex flex-col overflow-hidden">
      <Grain />

      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div style={{ background: "radial-gradient(ellipse 55% 50% at 100% 100%, rgba(201,168,76,0.12) 0%, transparent 65%)" }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col section-padding pt-32 pb-12">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -16 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Careers at Tamada Media</span>
        </motion.div>

        {/* Headline — fills full width */}
        <div className="flex-1 flex flex-col justify-center">
          {[
            { text: "BUILD WITH",   color: "#F5E6D0",  size: "clamp(4rem,9.5vw,13.5rem)" },
            { text: "THE BEST IN",  color: "rgba(245,230,208,0.22)", size: "clamp(4rem,9.5vw,13.5rem)" },
            { text: "THE SOUTH.",   color: "#C9A84C",  size: "clamp(4rem,9.5vw,13.5rem)" },
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className="font-display leading-[0.88]"
                style={{ fontSize: line.size, color: line.color }}
                initial={{ y: "110%", skewY: 1.5 }}
                animate={ready ? { y: "0%", skewY: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.3 + i * 0.13, ease: EASE }}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}

          {/* Sub + CTA */}
          <motion.div
            className="mt-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          >
            <p className="text-[#F5E6D0]/35 text-sm lg:text-base max-w-md leading-[1.9]">
              250 people. Hyderabad. South India&apos;s largest content ecosystem. Fast-paced, creator-first, nowhere near done.
            </p>
            <a
              href="#roles"
              className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] uppercase text-[#F5E6D0]/35 hover:text-[#C9A84C] transition-colors duration-300 group shrink-0"
            >
              <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-500" />
              See {TOTAL_ROLES} Open Roles
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="pt-10 border-t border-[#F5E6D0]/[0.07] flex flex-wrap gap-10 lg:gap-16"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {[
            [String(TOTAL_ROLES), "Open Roles"],
            ["250+", "Team Members"],
            ["26", "Avg. Age"],
            ["Hyderabad", "Head Office"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-[clamp(1.6rem,2.8vw,3rem)] leading-none text-[#F5E6D0]">{v}</p>
              <p className="text-[8px] tracking-[0.3em] uppercase text-[#F5E6D0]/28 mt-1.5">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Why ────────────────────────────────────────────────────────────────────────

function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F5E6D0] relative overflow-hidden">

      {/* Ghost bg text */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 font-display leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(14rem,30vw,42rem)", color: "rgba(10,10,10,0.04)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
      >
        WHY
      </div>

      <div className="section-padding relative z-10">

        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-14"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Why Here</span>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-display text-[clamp(3rem,7vw,10rem)] leading-[0.87] text-[#0A0A0A]"
            initial={{ y: "108%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            THE REASONS <span style={{ color: "#C9A84C" }}>MATTER.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col divide-y divide-[#0A0A0A]/10">
          {WHY_POINTS.map((p, i) => (
            <WhyRow key={p.num} point={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyRow({ point, index, inView }: { point: typeof WHY_POINTS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-4 lg:gap-16 py-8 lg:py-10 cursor-default group relative overflow-hidden"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-display text-sm w-10 shrink-0" style={{ color: "#C9A84C" }}>{point.num}</span>
      <h3
        className="font-display text-xl lg:text-3xl w-full lg:w-80 shrink-0 transition-colors duration-300"
        style={{ color: hovered ? "#C9A84C" : "#0A0A0A" }}
      >
        {point.title}
      </h3>
      <p className="text-[#0A0A0A]/50 text-sm lg:text-base leading-[1.85] lg:max-w-xl">{point.body}</p>
    </motion.div>
  );
}

// ── Open Roles ─────────────────────────────────────────────────────────────────

function RolesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="roles" className="bg-[#080808] relative overflow-hidden">
      <Grain />

      {/* Header */}
      <div className="section-padding pb-0 relative z-10">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-5 h-px bg-[#C9A84C] block" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Open Roles</span>
        </motion.div>

        <div className="flex items-end justify-between mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(2.5rem,5.5vw,7.5rem)] leading-[0.87] text-[#F5E6D0]"
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            >
              WHAT WE&apos;RE <span className="text-[#C9A84C]">LOOKING FOR.</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-[#F5E6D0]/20 text-xs tracking-[0.2em] uppercase hidden lg:block text-right leading-relaxed max-w-[160px]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {TOTAL_ROLES} open positions across {OPEN_ROLES.length} departments
          </motion.p>
        </div>
      </div>

      {/* Departments */}
      <div className="relative z-10">
        {OPEN_ROLES.map((dept, di) => (
          <DeptBlock key={dept.dept} dept={dept} deptIndex={di} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function DeptBlock({
  dept,
  deptIndex,
  inView,
}: {
  dept: typeof OPEN_ROLES[0];
  deptIndex: number;
  inView: boolean;
}) {
  return (
    <div className="border-t border-[#F5E6D0]/[0.07]">
      <div className="section-padding py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">

        {/* Dept label */}
        <motion.div
          className="flex flex-row lg:flex-col justify-between lg:justify-start"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 + deptIndex * 0.08, ease: EASE }}
        >
          <div>
            <p className="text-[9px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-2">{dept.num}</p>
            <p className="font-display text-[#F5E6D0]/55 text-2xl lg:text-3xl">{dept.dept}</p>
          </div>
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#F5E6D0]/18 lg:mt-4 self-end lg:self-start">
            {dept.roles.length} {dept.roles.length === 1 ? "opening" : "openings"}
          </p>
        </motion.div>

        {/* Roles */}
        <div className="flex flex-col">
          {dept.roles.map((role, ri) => (
            <RoleRow
              key={role.title}
              role={role}
              delay={0.2 + deptIndex * 0.08 + ri * 0.06}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Pitch CTA ──────────────────────────────────────────────────────────────────

function PitchSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#C9A84C] relative overflow-hidden">
      <Grain />

      {/* Ghost bg text */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 font-display leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(12rem,26vw,38rem)", color: "rgba(245,230,208,0.07)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
      >
        PITCH
      </div>

      <div className="section-padding relative z-10">

        <motion.div
          className="flex items-center gap-3 mb-14"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="w-5 h-px bg-[#F5E6D0]/50 block" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#F5E6D0]/60 font-bold">Don&apos;t See Your Role?</span>
        </motion.div>

        {[
          { text: "PITCH US",  size: "clamp(3.5rem,8vw,11rem)", color: "#F5E6D0" },
          { text: "ANYWAY.",   size: "clamp(3.5rem,8vw,11rem)", color: "rgba(245,230,208,0.25)" },
        ].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2
              className="font-display leading-[0.88]"
              style={{ fontSize: line.size, color: line.color }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              {line.text}
            </motion.h2>
          </div>
        ))}

        <motion.p
          className="mt-10 text-[#F5E6D0]/60 text-base lg:text-lg max-w-lg leading-[1.9]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          If you think you belong here but don&apos;t see your role listed — send us your work anyway. We hire for talent, not job titles.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
        >
          <a
            href="mailto:recruitment@tamadamedia.com"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#0A0A0A] text-[#F5E6D0] text-[10px] font-bold tracking-[0.24em] uppercase overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#F5E6D0] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 group-hover:text-[#0A0A0A] transition-colors duration-300">Send Your Work</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-[#0A0A0A]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="mailto:recruitment@tamadamedia.com"
            className="text-[#F5E6D0]/55 hover:text-[#F5E6D0] text-sm transition-colors duration-300 tracking-wide"
          >
            recruitment@tamadamedia.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
