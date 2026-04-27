"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IP_NAMES, STATS_IP } from "@/data/content";
import StatBlock from "@/components/ui/StatBlock";

const IP_LOGOS: Record<string, string> = {
  "Araathi":          "/ips/channels4_profile%20(7).jpg",
  "Wirally":          "/ips/unnamed%20(2).jpg",
  "The Mix":          "/ips/channels4_profile%20(3).jpg",
  "Dho Thadi":        "/ips/channels4_profile%20(15).jpg",
  "Muppo Teli":       "/ips/unnamed%20(1).jpg",
  "YINT":             "/ips/channels4_profile%20(11).jpg",
  "Maja Talkies":     "/ips/channels4_profile%20(20).jpg",
  "Racha Gang":       "/ips/channels4_profile%20(5).jpg",
  "Pataki Pori":      "/ips/unnamed%20(4).jpg",
  "YINT Money":       "/ips/channels4_profile%20(13).jpg",
  "Sinchu & Minchu":  "/ips/channels4_profile%20(1).jpg",
  "Just Girling":     "/ips/channels4_profile%20(18).jpg",
  "Charusheela":      "/ips/unnamed.jpg",
  "Wirally Juniors":  "/ips/channels4_profile%20(9).jpg",
  "Javari Junction":  "/ips/channels4_profile%20(22).jpg",
  "Think Chey":       "/ips/channels4_profile%20(4).jpg",
  "Chill Stories":    "/ips/channels4_profile%20(16).jpg",
  "Gossip":           "/ips/channels4_profile%20(2).jpg",
  "Wirally+":         "/ips/channels4_profile%20(17).jpg",
  "Wirally Kannada":  "/ips/channels4_profile%20(6).jpg",
  "Julie Minus":      "/ips/channels4_profile%20(21).jpg",
  "Nari Nation":      "/ips/channels4_profile%20(10).jpg",
  "Amma Baboi":       "/ips/channels4_profile.jpg",
  "Belle Jodis":      "/ips/channels4_profile%20(14).jpg",
  "Bumchick Bunty":   "/ips/channels4_profile%20(8).jpg",
  "Runway Reel":      "/ips/unnamed%20(3).jpg",
  "Pal Babiki":       "/ips/channels4_profile%20(12).jpg",
  "Kaasko":           "/ips/channels4_profile%20(19).jpg",
  "Wow Chepthe":      "/ips/channels4_profile%20(23).jpg",
};

export default function IPCreation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-[#F5E6D0] overflow-hidden">
      <div ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — text + stats */}
          <div>
            <motion.p
              className="text-[10px] tracking-[0.35em] uppercase text-[#B91C1C] font-bold mb-6"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              IP Creation
            </motion.p>

            <motion.h2
              className="font-display text-[clamp(3rem,6vw,8rem)] leading-[0.88] text-[#0A0A0A] mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              IP CREATION
              <br />
              ISN'T A PITCH.
            </motion.h2>

            <motion.div
              className="bg-[#B91C1C] px-4 py-2 inline-block mb-8"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="font-display text-[clamp(1.8rem,4vw,5rem)] text-[#F5E6D0] leading-tight block">
                IT'S MUSCLE MEMORY.
              </span>
            </motion.div>

            <motion.p
              className="text-[#0A0A0A]/60 text-base lg:text-lg leading-[1.8] max-w-xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Consistent content creation is hard — ideas, analytics, operations — all at once.
              Is it hard for us?{" "}
              <strong className="text-[#B91C1C]">NAH.</strong>
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-[#0A0A0A]/10">
              {STATS_IP.map((s, i) => (
                <motion.div
                  key={i}
                  className="bg-[#F5E6D0] p-6 lg:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.65 + i * 0.08 }}
                >
                  <StatBlock value={s.value} suffix={s.suffix} label={s.label} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — IP logo mosaic */}
          <div>
            <motion.p
              className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B] font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our IPs
            </motion.p>

            <div className="grid grid-cols-5 gap-4 lg:gap-5">
              {IP_NAMES.map((ip, i) => (
                <motion.div
                  key={ip}
                  className="aspect-square bg-[#0A0A0A] flex items-center justify-center p-2 group cursor-pointer overflow-hidden relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ backgroundColor: "#B91C1C" }}
                >
                  {IP_LOGOS[ip] ? (
                    <Image
                      src={IP_LOGOS[ip]}
                      alt={ip}
                      fill
                      className="object-contain p-2 transition-all duration-500"
                    />
                  ) : (
                    <span className="text-[8px] lg:text-[9px] text-[#F5E6D0]/50 group-hover:text-[#F5E6D0] font-bold text-center leading-tight transition-colors duration-300 px-1">
                      {ip}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
