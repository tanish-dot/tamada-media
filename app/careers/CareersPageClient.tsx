"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Radar, IconContainer } from "@/components/ui/radar-effect";
import { MdVideoLibrary, MdPeople } from "react-icons/md";
import { FiFilm, FiEdit3, FiMonitor, FiCode } from "react-icons/fi";

const EASE = [0.16, 1, 0.3, 1] as const;

const OPEN_ROLES = [
  {
    dept: "Content",
    roles: [
      { title: "Senior Video Editor", type: "Full-time", location: "Hyderabad" },
      { title: "Content Strategist", type: "Full-time", location: "Hyderabad" },
      { title: "Scriptwriter — Telugu / Tamil", type: "Full-time", location: "Hyderabad" },
      { title: "Thumbnail Designer", type: "Full-time", location: "Hyderabad" },
    ],
  },
  {
    dept: "Production",
    roles: [
      { title: "Director of Photography", type: "Full-time", location: "Hyderabad" },
      { title: "Production Assistant", type: "Full-time", location: "Hyderabad" },
      { title: "Motion Graphics Artist", type: "Full-time", location: "Hyderabad" },
    ],
  },
  {
    dept: "Technology",
    roles: [
      { title: "Full Stack Engineer", type: "Full-time", location: "Hyderabad" },
      { title: "Data Analyst — Content Insights", type: "Full-time", location: "Hyderabad" },
    ],
  },
  {
    dept: "AI & Automation",
    roles: [
      { title: "Prompt Engineer", type: "Full-time", location: "Hyderabad" },
      { title: "AI Content Strategist", type: "Full-time", location: "Hyderabad" },
      { title: "ML Engineer — Recommendations", type: "Full-time", location: "Hyderabad" },
    ],
  },
];

const PERKS = [
  { title: "Work on real IPs", body: "You won't be making content for client decks. You'll be building shows people actually watch." },
  { title: "Move fast", body: "70,000 videos a month. The feedback loop is days, not quarters." },
  { title: "South India's biggest stage", body: "4.8B monthly views. Your work reaches more people than most national campaigns." },
  { title: "Ownership culture", body: "We don't micromanage. If you own it, you ship it." },
];

function RadarSection() {
  return (
    <div className="relative flex h-[380px] w-full max-w-lg flex-col items-center justify-center overflow-hidden">
      {/* Row 1 */}
      <div className="w-full max-w-md mb-6">
        <div className="flex w-full items-center justify-between px-4">
          <IconContainer delay={0.3} text="Content" icon={<MdVideoLibrary className="h-5 w-5 text-[#F5E6D0]/40" />} />
          <IconContainer delay={0.5} text="Scripting" icon={<FiEdit3 className="h-5 w-5 text-[#F5E6D0]/40" />} />
          <IconContainer delay={0.4} text="Production" icon={<FiFilm className="h-5 w-5 text-[#F5E6D0]/40" />} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="w-full max-w-xs mb-6">
        <div className="flex w-full items-center justify-between px-4">
          <IconContainer delay={0.6} text="Technology" icon={<FiMonitor className="h-5 w-5 text-[#F5E6D0]/40" />} />
          <IconContainer delay={0.9} text="People" icon={<MdPeople className="h-5 w-5 text-[#F5E6D0]/40" />} />
        </div>
      </div>
      {/* Row 3 */}
      <div className="w-full max-w-md">
        <div className="flex w-full items-center justify-between px-4">
          <IconContainer delay={0.7} text="Engineering" icon={<FiCode className="h-5 w-5 text-[#F5E6D0]/40" />} />
          <IconContainer delay={0.8} text="Post Production" icon={<FiFilm className="h-5 w-5 text-[#F5E6D0]/40" />} />
          <IconContainer delay={1.0} text="Editing" icon={<FiMonitor className="h-5 w-5 text-[#F5E6D0]/40" />} />
        </div>
      </div>

      <Radar className="absolute -bottom-12" />
      <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-[#F5E6D0]/10 to-transparent" />
    </div>
  );
}


export default function CareersPageClient() {
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
        {/* Red glow bottom-right */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 w-[65vw] h-[65vh]"
          style={{ background: "radial-gradient(ellipse at 80% 100%, rgba(185,28,28,0.13) 0%, transparent 65%)" }}
        />
        {/* Subtle top-left */}
        <div aria-hidden className="pointer-events-none absolute top-0 left-0 w-[40vw] h-[40vh]"
          style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(185,28,28,0.05) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-between section-padding pt-32 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12">

            {/* ── Left: headline ── */}
            <div className="lg:w-[48%] flex-shrink-0">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -16 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              >
                <span className="block w-6 h-px bg-[#B91C1C]" />
                <span className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold">Careers</span>
              </motion.div>

              {["BUILD WITH", "THE BEST IN"].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    className="font-display text-[clamp(4.5rem,10vw,13rem)] leading-[0.85] text-[#F5E6D0] whitespace-nowrap"
                    initial={{ y: "110%" }}
                    animate={heroInView ? { y: "0%" } : {}}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
              <div>
                <motion.h1
                  className="font-display text-[clamp(4.5rem,10vw,13rem)] leading-[0.85] text-[#B91C1C]"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={heroInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.54, ease: EASE }}
                >
                  THE SOUTH.
                </motion.h1>
              </div>

              <motion.p
                className="mt-8 text-[#F5E6D0]/35 text-sm lg:text-base max-w-sm leading-[1.9]"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.85 }}
              >
                250 people. Hyderabad. Building South India's largest content ecosystem. Fast-paced, creator-first, nowhere near done.
              </motion.p>

              <motion.a
                href="#roles"
                className="mt-[62px] inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.28em] uppercase text-[#F5E6D0]/40 hover:text-[#F5E6D0] transition-colors duration-300 group"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <span className="block w-6 h-px bg-current group-hover:w-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                See Open Roles
              </motion.a>
            </div>

            {/* ── Right: radar ── */}
            <div className="flex-1 flex items-center justify-end" style={{ marginBottom: 70 }}>
              <RadarSection />
            </div>
          </div>

          {/* Stats row */}
          <motion.div
            className="mt-12 pt-8 border-t border-[#F5E6D0]/[0.07] flex items-center gap-10 lg:gap-16 flex-wrap"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {[["250+", "Team Members"], ["26", "Avg. Age"], ["12", "Open Roles"], ["Hyderabad", "Head Office"]].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-[clamp(1.8rem,3vw,3.2rem)] leading-none text-[#F5E6D0]">{v}</p>
                <p className="text-[8px] tracking-[0.3em] uppercase text-[#F5E6D0]/28 mt-1.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Tamada ── */}
      <section className="section-padding bg-[#080808]">
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="block w-6 h-px bg-[#B91C1C]" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold">Why Here</span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PERKS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <div className="w-8 h-px bg-[#B91C1C] mb-5" />
              <h3 className="font-display text-[#F5E6D0] text-xl mb-3">{p.title}</h3>
              <p className="text-[#F5E6D0]/35 text-sm leading-[1.85]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="roles" className="section-padding bg-[#0A0A0A]">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="block w-6 h-px bg-[#B91C1C]" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold">Open Roles</span>
        </motion.div>

        <motion.h2
          className="font-display text-[clamp(2.5rem,6vw,7rem)] leading-[0.88] text-[#F5E6D0] mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          WHAT WE&apos;RE<br />
          <span className="text-[#B91C1C]">LOOKING FOR.</span>
        </motion.h2>

        {/* Two-col grid: dept on left, roles on right */}
        <div className="space-y-0 border-t border-[#F5E6D0]/[0.07]">
          {OPEN_ROLES.map((dept, di) => (
            <motion.div
              key={dept.dept}
              className="grid grid-cols-1 lg:grid-cols-[220px_1fr] border-b border-[#F5E6D0]/[0.07] py-12 gap-8 lg:gap-16"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: di * 0.08, ease: EASE }}
            >
              {/* Dept label */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[9px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold mb-2">
                    {String(di + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display text-[#F5E6D0]/60 text-2xl">{dept.dept}</p>
                </div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#F5E6D0]/18 mt-4">
                  {dept.roles.length} {dept.roles.length === 1 ? "opening" : "openings"}
                </p>
              </div>

              {/* Roles */}
              <div className="flex flex-col divide-y divide-[#F5E6D0]/[0.05]">
                {dept.roles.map((role, ri) => (
                  <motion.a
                    key={role.title}
                    href="mailto:recruitment@tamadamedia.com"
                    className="group flex items-center justify-between py-5 hover:pl-3 transition-all duration-500"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: di * 0.08 + ri * 0.06, ease: EASE }}
                  >
                    <span className="font-display text-[#F5E6D0]/80 group-hover:text-[#F5E6D0] transition-colors duration-300"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                      {role.title}
                    </span>
                    <span className="text-[#F5E6D0]/20 group-hover:text-[#B91C1C] transition-colors duration-300 text-lg flex-shrink-0 ml-4">→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Apply CTA */}
        <motion.div
          className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-10 border-t border-[#F5E6D0]/[0.07]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-[#F5E6D0]/35 text-sm leading-[1.9] max-w-sm">
            Send your CV and work to{" "}
            <a href="mailto:recruitment@tamadamedia.com" className="text-[#B91C1C] hover:underline">
              recruitment@tamadamedia.com
            </a>
          </p>
          <Link
            href="mailto:recruitment@tamadamedia.com"
            className="group relative inline-flex flex-shrink-0 px-8 py-3.5 bg-[#B91C1C] text-[#F5E6D0] text-[10px] font-bold tracking-[0.24em] uppercase overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#F5E6D0] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10 group-hover:text-[#B91C1C] transition-colors duration-500">
              Apply Now →
            </span>
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
