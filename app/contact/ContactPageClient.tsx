"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/data/content";
import MarqueeDivider from "@/components/ui/MarqueeDivider";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  "Influencer Marketing",
  "Content Production",
  "Brand IP Creation",
  "Social Media Management",
  "Platform Partnerships",
  "OTT / Long-Form",
  "Brand Solutions",
  "Creator-Led Storytelling",
];

const STATS = [
  { v: "200+", l: "Brand Partners" },
  { v: "8+",   l: "Years" },
  { v: "750+", l: "Channels" },
  { v: "4.8B+",l: "Monthly Views" },
];

export default function ContactPageClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="bg-[#0A0A0A]">

      {/* ── Hero ── */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-between section-padding pt-36 pb-0 relative overflow-hidden">

        {/* Grain */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px" }}
        />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[70vw] h-[70vh]"
          style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.22) 0%, transparent 60%)" }}
        />

        {/* Eyebrow */}
        <motion.div className="flex items-center gap-3"
          initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="block w-5 h-px bg-[#C9A84C]" />
          <p className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Get In Touch</p>
        </motion.div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <div className="overflow-hidden mb-1">
            <motion.h1 className="font-display text-[#F5E6D0] leading-[0.85]"
              style={{ fontSize: "clamp(5rem,14vw,18rem)" }}
              initial={{ y: "110%" }} animate={heroInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              LET'S
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 className="font-display leading-[0.85]"
              style={{ fontSize: "clamp(5rem,14vw,18rem)", WebkitTextStroke: "2px #F5E6D0", color: "transparent" }}
              initial={{ y: "110%" }} animate={heroInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
            >
              TALK.
            </motion.h1>
          </div>

          {/* Email inline below headline */}
          <motion.div className="mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
            initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          >
            <p className="text-[#F5E6D0]/35 text-sm max-w-xs leading-[1.9]">
              Whether it&apos;s a campaign, a collab, or just a question — we&apos;re one email away.
            </p>
            <a href={`mailto:${BRAND.email.primary}`}
              className="group flex items-center gap-4 text-[#F5E6D0]/60 hover:text-[#F5E6D0] transition-colors duration-300"
            >
              <span className="font-display text-[clamp(1rem,1.8vw,1.6rem)] tracking-wide">{BRAND.email.primary}</span>
              <span className="w-10 h-10 border border-[#F5E6D0]/15 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C] flex items-center justify-center transition-all duration-300 flex-shrink-0">
                <svg className="w-4 h-4 group-hover:text-[#F5E6D0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div className="border-t border-[#F5E6D0]/[0.1] grid grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="py-8 pr-8 border-r border-[#F5E6D0]/[0.1] last:border-r-0 first:pl-0 pl-8">
              <p className="font-display text-[#F5E6D0] leading-none mb-2" style={{ fontSize: "clamp(1.8rem,2.8vw,3.2rem)" }}>{s.v}</p>
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#F5E6D0]/40">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Big Email CTA — cream ── */}
      <MarqueeDivider bg="red" speed={28} />
      <EmailBlock />

      {/* ── Services ── */}
      <MarqueeDivider bg="dark" speed={36} reverse />
      <ServicesBlock />

      {/* ── Location + socials ── */}
      <LocationBlock />

    </main>
  );
}

/* ── Big email CTA ── */
function EmailBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F5E6D0] overflow-hidden">
      <a href={`mailto:${BRAND.email.primary}`} className="block group section-padding py-20 lg:py-28">
        <motion.p className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
        >
          Reach Us At
        </motion.p>
        <div className="overflow-hidden">
          <motion.p
            className="font-display text-[#080808] group-hover:text-[#C9A84C] transition-colors duration-500 leading-[0.88] break-all"
            style={{ fontSize: "clamp(2.8rem,7.5vw,10rem)" }}
            initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {BRAND.email.primary}
          </motion.p>
        </div>
        <motion.div className="mt-10 flex items-center gap-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#080808]/40 font-bold group-hover:text-[#C9A84C] transition-colors duration-300">
            Click to open mail
          </span>
          <svg className="w-4 h-4 text-[#080808]/30 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </a>
    </section>
  );
}

/* ── Services ── */
function ServicesBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0A0A0A] border-t border-[#F5E6D0]/[0.06]">
      <div className="section-padding py-16 lg:py-24">
        <motion.div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-[#C9A84C]" />
              <p className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">What We Do</p>
            </div>
            <h2 className="font-display text-[#F5E6D0] leading-[0.88]" style={{ fontSize: "clamp(2.2rem,4.5vw,5.5rem)" }}>
              WHAT ARE YOU<br />REACHING OUT FOR?
            </h2>
          </div>
          <p className="text-[#F5E6D0]/40 text-sm max-w-[220px] leading-[1.9] lg:text-right">
            Pick what fits.<br />We&apos;ll figure out the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F5E6D0]/[0.1]">
          {SERVICES.map((s, i) => (
            <motion.a
              key={s}
              href={`mailto:${BRAND.email.primary}?subject=${encodeURIComponent(s + " — Tamada Media")}`}
              className="bg-[#0A0A0A] p-8 flex flex-col gap-8 group hover:bg-[#C9A84C] transition-colors duration-300 min-h-[200px]"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE }}
            >
              <span className="text-[10px] tracking-[0.35em] font-bold text-[#F5E6D0]/30 group-hover:text-[#F5E6D0]/60 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[#F5E6D0]/80 group-hover:text-[#F5E6D0] transition-colors duration-300 leading-[1.1]" style={{ fontSize: "clamp(1.1rem,1.6vw,1.4rem)" }}>
                {s}
              </span>
              <svg className="w-5 h-5 text-[#F5E6D0]/25 group-hover:text-[#F5E6D0] group-hover:translate-x-1.5 transition-all duration-300 mt-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Location ── */
function LocationBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0A0A0A] border-t border-[#F5E6D0]/[0.06]">
      <div className="section-padding py-16 lg:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#F5E6D0]/25 font-bold mb-3">Based In</p>
          <p className="font-display text-[#F5E6D0] leading-none" style={{ fontSize: "clamp(1.8rem,3vw,3.5rem)" }}>
            Hyderabad, India.
          </p>
        </motion.div>

        <motion.div className="flex items-center gap-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { label: "Instagram", href: "https://www.instagram.com/tamadamedia/" },
            { label: "YouTube",   href: "https://www.youtube.com/@TamadaMediaNetwork" },
            { label: "LinkedIn",  href: "https://www.linkedin.com/company/tamadamedia/" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-[10px] tracking-[0.28em] uppercase font-bold text-[#F5E6D0]/25 hover:text-[#C9A84C] transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
