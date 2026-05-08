"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import { OTT_SHOWS, MICRO_DRAMAS } from "@/data/content";

const CAMPAIGNS = [
  { title: "Indian 2 — Netflix",           cat: "Shoulder Content",  platform: "Netflix",       img: "/campaigns/indian-2.jpg"           },
  { title: "Rana Daggubati Show",           cat: "Celebrity Series",  platform: "Amazon Prime",  img: "/campaigns/rana-daggubati.jpg"     },
  { title: "Kalki 2898 AD",                 cat: "Ad Breakdown",      platform: "Amazon Prime",  img: "/campaigns/kalki.jpg"              },
  { title: "Aaya Baby John",                cat: "Movie Promo",       platform: "Spotify",       img: "/campaigns/baby-john.jpg"          },
  { title: "Naga Chaitanya Surprises Fans", cat: "Brand Activation",  platform: "Viral",         img: "/campaigns/naga-chaitanya.jpg"     },
  { title: "The Wedding Heist",             cat: "Netflix Collab",    platform: "1M+ Views",     img: "/campaigns/wedding-heist.jpg"      },
  { title: "Behensplaining",                cat: "Cultural Content",  platform: "Netflix",       img: "/campaigns/behensplaining.jpg"     },
  { title: "Tea & Bagara Baingan",          cat: "Food Series",       platform: "Netflix",       img: "/campaigns/tea-bagara-baingan.jpg" },
];

type Card = { title: string; platform: string; img: string; cat: string; url?: string };

function interleave(a: Card[], b: Card[], c: Card[]): Card[] {
  const out: Card[] = [];
  const len = Math.max(a.length, b.length, c.length);
  for (let i = 0; i < len; i++) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
    if (c[i]) out.push(c[i]);
  }
  return out;
}

const OTT_CARDS: Card[]   = OTT_SHOWS.map((s)   => ({ title: s.title, platform: s.platform, img: s.poster, cat: "OTT Original", url: s.url }));
const CAM_CARDS: Card[]   = CAMPAIGNS.map((c)    => ({ title: c.title, platform: c.platform, img: c.img,    cat: c.cat                      }));
const MICRO_CARDS: Card[] = MICRO_DRAMAS.map((d) => ({ title: d.title, platform: d.views,    img: d.poster, cat: "Micro Drama",  url: d.url  }));

const CARDS  = interleave(OTT_CARDS, CAM_CARDS, MICRO_CARDS);
const DOUBLED = [...CARDS, ...CARDS]; // seamless loop

const TILT = [
  { ry: -18, rz: -1.5, y: -24, scale: 0.93 },
  { ry:   0, rz:  0.5, y:  14, scale: 1.06 },
  { ry:  18, rz:  1.5, y: -18, scale: 0.94 },
  { ry:  -8, rz: -2,   y:  22, scale: 0.97 },
  { ry:   0, rz: -0.5, y: -10, scale: 1.04 },
  { ry:  12, rz:  2,   y:  18, scale: 0.95 },
  { ry: -20, rz: -1,   y: -20, scale: 0.92 },
  { ry:   6, rz:  1,   y:  10, scale: 1.02 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContentShowcase() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const [ROW_H, setROW_H] = useState(360);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setROW_H(mobile ? 200 : 360);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Drag-to-scroll rail ── */
  const railRef   = useRef<HTMLDivElement>(null);
  const posRef    = useRef(0);           // current translateX (negative = moved left)
  const rafRef    = useRef<number>(0);
  const drag      = useRef({ active: false, startX: 0, startPos: 0, velocity: 0, lastX: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const SPEED     = 1.1;                // px per frame auto-scroll

  // RAF loop — runs forever, pauses during drag
  const tick = useCallback(() => {
    if (!drag.current.active) {
      posRef.current -= SPEED;
      // Seamless loop: reset when we've scrolled one full copy
      if (railRef.current) {
        const halfW = railRef.current.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfW) posRef.current = 0;
      }
      if (railRef.current) {
        railRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = { active: true, startX: e.clientX, startPos: posRef.current, velocity: 0, lastX: e.clientX };
    setGrabbing(true);
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    drag.current.velocity = e.clientX - drag.current.lastX;
    drag.current.lastX = e.clientX;
    posRef.current = drag.current.startPos + delta;
    if (railRef.current) railRef.current.style.transform = `translateX(${posRef.current}px)`;
  };
  const onMouseUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setGrabbing(false);
    posRef.current += drag.current.velocity * 4;
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    drag.current = { active: true, startX: t.clientX, startPos: posRef.current, velocity: 0, lastX: t.clientX };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!drag.current.active) return;
    const t = e.touches[0];
    const delta = t.clientX - drag.current.startX;
    drag.current.velocity = t.clientX - drag.current.lastX;
    drag.current.lastX = t.clientX;
    posRef.current = drag.current.startPos + delta;
    if (railRef.current) railRef.current.style.transform = `translateX(${posRef.current}px)`;
  };
  const onTouchEnd = () => {
    drag.current.active = false;
    posRef.current += drag.current.velocity * 4;
  };

  return (
    <section
      className="relative overflow-hidden pt-20 pb-16"
      style={{ background: "#060606" }}
    >

      {/* Geometric red grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Diagonal lines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg, transparent, transparent 60px,
            rgba(201,168,76,0.8) 60px, rgba(201,168,76,0.8) 61px
          )`,
        }}
      />

      {/* Floor glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 85%, rgba(201,168,76,0.1) 0%, transparent 70%)" }}
      />

      {/* Top vignette */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #060606, transparent)" }}
      />

      {/* ── Header ── */}
      <div ref={headerRef} className="relative z-10 section-padding pb-0 pt-0 mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block w-6 h-px bg-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">The Work</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,9rem)] leading-[0.88] text-[#F5E6D0]"
                initial={{ y: "106%" }}
                animate={headerInView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: EASE }}
              >
                THE WORK SPEAKS
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,9rem)] leading-[0.88] text-[#C9A84C]"
                initial={{ y: "106%" }}
                animate={headerInView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, delay: 0.18, ease: EASE }}
              >
                FOR ITSELF.
              </motion.h2>
            </div>
          </div>

          {/* Stats + CTA */}
          <motion.div
            className="flex flex-col gap-6 lg:items-end shrink-0"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            <div className="flex items-center gap-8 lg:gap-10">
              {[["29+", "OTT Shows"], ["300+", "Campaigns"], ["35+", "Original IPs"]].map(([v, l]) => (
                <div key={l} className="text-center lg:text-right">
                  <p className="font-display text-[clamp(1.6rem,2.5vw,2.8rem)] leading-none text-[#F5E6D0]">{v}</p>
                  <p className="text-[8px] tracking-[0.28em] uppercase text-[#F5E6D0]/28 mt-1">{l}</p>
                </div>
              ))}
            </div>
            <a
              href="/work"
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold text-[#F5E6D0]/40 hover:text-[#C9A84C] transition-colors duration-300 group"
            >
              View All Work
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Stage ── */}
      <div className="relative" style={{ height: ROW_H + 100 }}>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none" style={{ width: isMobile ? 40 : 120, background: "linear-gradient(to right, #060606 30%, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none" style={{ width: isMobile ? 40 : 120, background: "linear-gradient(to left, #060606 30%, transparent)" }} />

        {/* Draggable rail */}
        <div
          className="h-full overflow-hidden select-none"
          style={{ perspective: isMobile ? "none" : "900px", perspectiveOrigin: "50% 50%", cursor: grabbing ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={railRef}
            className="h-full flex items-center gap-6"
            style={{ width: "max-content", willChange: "transform" }}
          >
            {DOUBLED.map((card, i) => {
              const t = TILT[i % TILT.length];
              const mTransform = isMobile
                ? `translateY(${t.y * 0.3}px) scale(${t.scale})`
                : `rotateY(${t.ry}deg) rotateZ(${t.rz}deg) translateY(${t.y}px) scale(${t.scale})`;
              const Wrap = card.url ? "a" : "div";
              const wrapProps = card.url ? { href: card.url, target: "_blank", rel: "noopener noreferrer" } : {};
              return (
                <Wrap
                  key={i}
                  {...wrapProps}
                  className="group relative shrink-0 overflow-hidden cursor-pointer"
                  style={{
                    height: ROW_H,
                    borderRadius: "3px",
                    transform: mTransform,
                    boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)",
                    transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    if (isMobile) return;
                    const el = e.currentTarget;
                    el.style.transform = `rotateY(${t.ry * 0.15}deg) rotateZ(${t.rz * 0.15}deg) translateY(${t.y - 18}px) scale(${t.scale + 0.09})`;
                    el.style.boxShadow = "0 40px 100px rgba(0,0,0,0.85), 0 0 60px rgba(201,168,76,0.2), inset 0 0 0 1px rgba(201,168,76,0.35)";
                    el.style.zIndex = "30";
                  }}
                  onMouseLeave={(e) => {
                    if (isMobile) return;
                    const el = e.currentTarget;
                    el.style.transform = `rotateY(${t.ry}deg) rotateZ(${t.rz}deg) translateY(${t.y}px) scale(${t.scale})`;
                    el.style.boxShadow = "0 30px 80px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)";
                    el.style.zIndex = "";
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="h-full w-auto block"
                    style={{ pointerEvents: "none" }}
                  />

                  {/* Screen glare */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)" }}
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)" }}
                  />

                  {/* Corner brackets */}
                  <span className="absolute top-0 left-0 w-5 h-[2px] bg-[#C9A84C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="absolute top-0 left-0 h-5 w-[2px] bg-[#C9A84C] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                  <span className="absolute bottom-0 right-0 w-5 h-[2px] bg-[#C9A84C] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="absolute bottom-0 right-0 h-5 w-[2px] bg-[#C9A84C] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] font-bold mb-1">{card.cat}</p>
                    <h3 className="font-display text-[#F5E6D0] leading-tight text-sm">{card.title}</h3>
                    <p className="text-[#F5E6D0]/30 text-[9px] tracking-[0.2em] uppercase mt-1">{card.platform}</p>
                  </div>
                </Wrap>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
