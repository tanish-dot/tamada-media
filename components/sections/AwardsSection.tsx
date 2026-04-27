"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const AWARDS = [
  {
    year: "2020",
    title: "YouTube Enterprise Partner",
    category: "Platform Recognition",
    body: "1 of 12 in all of India",
    size: "lg",
  },
  {
    year: "2022",
    title: "Filmfare OTT Award",
    category: "Best Digital Content Studio",
    body: "South India category",
    size: "md",
  },
  {
    year: "2023",
    title: "e4m Digital Award",
    category: "Content Company of the Year",
    body: "National recognition",
    size: "xl",
  },
  {
    year: "2023",
    title: "Social Samosa",
    category: "Top 10 Content Companies",
    body: "India digital media",
    size: "md",
  },
  {
    year: "2024",
    title: "Digies Award",
    category: "Best MCN — South India",
    body: "Multi-channel network",
    size: "lg",
  },
];

export default function AwardsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-[#080808] relative overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(185,28,28,0.18) 0%, transparent 70%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "256px" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-14">
          <div>
            <motion.p className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold mb-4"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            >
              Recognition
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(2.5rem,5.5vw,7rem)] leading-[0.87] text-[#F5E6D0]"
                initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              >
                AWARD <span className="text-[#B91C1C]">WINNING.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p className="text-[#F5E6D0]/20 text-xs tracking-[0.2em] uppercase hidden lg:block text-right leading-relaxed max-w-[180px]"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          >
            Recognised by the platforms and industries we helped build
          </motion.p>
        </div>

        <div className="flex items-end gap-3 lg:gap-4 overflow-x-auto pb-2">
          {AWARDS.map((award, i) => (
            <AwardCard key={i} award={award} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({
  award,
  index,
  inView,
}: {
  award: (typeof AWARDS)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-8, 8]), { stiffness: 300, damping: 25 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  const heights: Record<string, string> = { sm: "260px", md: "300px", lg: "340px", xl: "390px" };
  const height = heights[award.size] ?? "300px";

  return (
    <motion.div
      className="flex-1 min-w-[160px] lg:min-w-0"
      style={{ perspective: "800px" }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: EASE }}
    >
      <motion.div
        ref={cardRef}
        className="relative cursor-default flex flex-col justify-between p-5 lg:p-6 overflow-hidden"
        style={{
          height,
          rotateX,
          rotateY,
          background: "linear-gradient(160deg, #141414 0%, #0c0c0c 100%)",
          border: `1px solid ${hovered ? "rgba(185,28,28,0.5)" : "rgba(245,230,208,0.07)"}`,
          transition: "border-color 0.3s",
          boxShadow: hovered ? "0 20px 60px rgba(185,28,28,0.25), 0 4px 20px rgba(0,0,0,0.6)" : "0 4px 20px rgba(0,0,0,0.4)",
        }}
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 w-5 h-[2px] bg-[#B91C1C]" />
        <span className="absolute top-0 left-0 w-[2px] h-5 bg-[#B91C1C]" />
        <span className="absolute bottom-0 right-0 w-5 h-[2px] bg-[#B91C1C]" />
        <span className="absolute bottom-0 right-0 w-[2px] h-5 bg-[#B91C1C]" />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(185,28,28,0.18) 0%, transparent 70%)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        <span className="font-display text-xs tracking-[0.3em] tabular-nums"
          style={{ color: hovered ? "#B91C1C" : "rgba(245,230,208,0.25)", transition: "color 0.3s" }}
        >
          {award.year}
        </span>

        <div className="flex justify-center items-center flex-1">
          <motion.div animate={{ y: hovered ? -4 : 0, scale: hovered ? 1.08 : 1 }} transition={{ duration: 0.4, ease: EASE }}>
            <TrophyIcon hovered={hovered} />
          </motion.div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase font-bold mb-1.5"
            style={{ color: hovered ? "rgba(245,230,208,0.45)" : "rgba(245,230,208,0.2)", transition: "color 0.3s" }}
          >
            {award.category}
          </p>
          <h3 className="font-display leading-tight"
            style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.3rem)", color: hovered ? "#F5E6D0" : "rgba(245,230,208,0.7)", transition: "color 0.3s" }}
          >
            {award.title}
          </h3>
          <p className="text-[9px] mt-1"
            style={{ color: hovered ? "#B91C1C" : "rgba(245,230,208,0.18)", transition: "color 0.3s" }}
          >
            {award.body}
          </p>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #B91C1C, transparent)" }}
          animate={{ opacity: hovered ? 1 : 0.3, scaleX: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

function TrophyIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4h24v18c0 10-6 16-12 18C18 38 12 32 12 22V4z"
        stroke={hovered ? "#B91C1C" : "rgba(245,230,208,0.25)"} strokeWidth="1.5"
        fill={hovered ? "rgba(185,28,28,0.1)" : "transparent"} style={{ transition: "all 0.3s" }} />
      <path d="M12 8H6a4 4 0 0 0 0 8h6"
        stroke={hovered ? "#B91C1C" : "rgba(245,230,208,0.15)"} strokeWidth="1.5" fill="none" style={{ transition: "all 0.3s" }} />
      <path d="M36 8h6a4 4 0 0 1 0 8h-6"
        stroke={hovered ? "#B91C1C" : "rgba(245,230,208,0.15)"} strokeWidth="1.5" fill="none" style={{ transition: "all 0.3s" }} />
      <line x1="24" y1="40" x2="24" y2="50"
        stroke={hovered ? "#B91C1C" : "rgba(245,230,208,0.2)"} strokeWidth="1.5" style={{ transition: "all 0.3s" }} />
      <rect x="14" y="50" width="20" height="4" rx="1"
        stroke={hovered ? "#B91C1C" : "rgba(245,230,208,0.2)"} strokeWidth="1.5"
        fill={hovered ? "rgba(185,28,28,0.15)" : "transparent"} style={{ transition: "all 0.3s" }} />
      <path d="M24 12 l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L24 21l-4 2.5 1.5-4.5L18 16.5h4.5z"
        fill={hovered ? "rgba(185,28,28,0.6)" : "rgba(245,230,208,0.08)"} style={{ transition: "all 0.3s" }} />
    </svg>
  );
}
