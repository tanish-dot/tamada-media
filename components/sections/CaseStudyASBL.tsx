"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CASE_STUDY_ASBL } from "@/data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const VIDEOS = [
  { youtubeId: "WDrBMMpiah0" },
  { youtubeId: "r1f5Anr_HOw" },
  { youtubeId: "v3RTlnEjoVY" },
  { youtubeId: "faOHdV45cFg" },
];

function VideoCard({ video, index, inView }: { video: typeof VIDEOS[0]; index: number; inView: boolean }) {
  const href = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden bg-[#111] cursor-pointer"
      style={{ aspectRatio: "16/9" }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.8 + index * 0.055, ease: EASE }}
      whileHover={{ scale: 1.02, transition: { duration: 0.35 } }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[#080808]/30 group-hover:bg-[#080808]/10 transition-all duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-11 h-11 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-xl shadow-[#C9A84C]/40 scale-90 group-hover:scale-100 transition-transform duration-300">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Bottom hover bar */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </motion.a>
  );
}

export default function CaseStudyASBL() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#080808] overflow-hidden">
      <div ref={ref}>

        {/* ── Header ── */}
        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] font-bold mb-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured Case Study
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-20" style={{ marginBottom: "56px" }}>
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          >
            <h2 className="font-display text-[clamp(3rem,10vw,13rem)] leading-[0.85] text-[#F5E6D0]">
              ASBL
            </h2>
            <div className="mt-3 h-[3px] w-16 bg-[#C9A84C]" />
          </motion.div>

          <motion.div
            className="flex-1 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <p className="text-[#F5E6D0]/60 text-sm lg:text-base leading-[1.9] mb-4 max-w-lg">
              {CASE_STUDY_ASBL.headline}
            </p>
            <p className="text-[#F5E6D0]/28 text-sm leading-relaxed max-w-md">
              {CASE_STUDY_ASBL.sub}
            </p>
          </motion.div>
        </div>

        {/* ── Results ── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#F5E6D0]/8"
          style={{ marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {CASE_STUDY_ASBL.results.map((r, i) => (
            <div key={i} className="bg-[#080808] px-8 py-10 group relative overflow-hidden">
              <span className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/5 transition-all duration-500" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5E6D0]/30 font-bold mb-5 relative z-10">
                {r.label}
              </p>
              <div className="flex items-center gap-5 relative z-10">
                <div>
                  <p className="text-[#F5E6D0]/20 text-[9px] uppercase tracking-wider mb-2">Before</p>
                  <p className="font-display text-[clamp(1.4rem,3vw,2.5rem)] text-[#F5E6D0]/20 line-through decoration-[#C9A84C]/40">
                    {r.before}
                  </p>
                </div>
                <span className="text-[#C9A84C] font-display text-lg">→</span>
                <div>
                  <p className="text-[#C9A84C] text-[9px] uppercase tracking-wider mb-2">After</p>
                  <p className="font-display text-[clamp(1.4rem,3vw,2.5rem)] text-[#C9A84C]">{r.after}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Approach tags ── */}
        <motion.div
          className="flex flex-wrap gap-2"
          style={{ marginBottom: "48px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {CASE_STUDY_ASBL.approach.map((a) => (
            <span
              key={a}
              className="px-4 py-1.5 border border-[#F5E6D0]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#F5E6D0]/30 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-300 cursor-default"
            >
              {a}
            </span>
          ))}
        </motion.div>

        {/* ── Videos ── */}
        <motion.p
          className="text-[10px] tracking-[0.3em] uppercase text-[#F5E6D0]/40 font-bold"
          style={{ marginBottom: "40px" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          Content we created
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} video={v} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <a
            href="https://www.youtube.com/@ASBLIndia"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-[#F5E6D0]/35 hover:text-[#C9A84C] transition-colors duration-300 text-[10px] tracking-[0.22em] uppercase font-bold"
          >
            <span>View full channel</span>
            <span className="block w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
