"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

// ── Reel data ─────────────────────────────────────────────────────────────────
// Alternates portrait OTT posters with landscape campaign/drama cards

const REEL = [
  { title: "Hostel Days",        platform: "Aha",     img: "/ott/hostel-days.jpg",           cat: "OTT Series",       aspect: "portrait"  },
  { title: "Indian 2",           platform: "Netflix",  img: "/campaigns/indian-2.jpg",        cat: "Shoulder Content", aspect: "landscape" },
  { title: "Dead Pixels",        platform: "Aha",     img: "/ott/dead-pixels.jpg",            cat: "OTT Series",       aspect: "portrait"  },
  { title: "Kalki 2898 AD",      platform: "Amazon",  img: "/campaigns/kalki.jpg",            cat: "Ad Breakdown",     aspect: "landscape" },
  { title: "Isakapatnam",        platform: "Zee5",    img: "/ott/isakapatnam1.jpg",           cat: "OTT Series",       aspect: "portrait"  },
  { title: "Rana Daggubati",     platform: "Amazon",  img: "/campaigns/rana-daggubati.jpg",   cat: "Celebrity Series", aspect: "landscape" },
  { title: "Pelli Gola",         platform: "Aha",     img: "/ott/pelli-gola.jpg",             cat: "OTT Series",       aspect: "portrait"  },
  { title: "The Wedding Heist",  platform: "Netflix",  img: "/campaigns/wedding-heist.jpg",   cat: "Netflix Collab",   aspect: "landscape" },
  { title: "Net",                platform: "Aha",     img: "/ott/net.jpg",                    cat: "OTT Series",       aspect: "portrait"  },
  { title: "Behensplaining",     platform: "Netflix",  img: "/campaigns/behensplaining.jpg",  cat: "Cultural Content", aspect: "landscape" },
  { title: "Commit Mental",      platform: "Aha",     img: "/ott/commit-mental.jpg",          cat: "OTT Series",       aspect: "portrait"  },
  { title: "Baby John",          platform: "Spotify", img: "/campaigns/baby-john.jpg",        cat: "Movie Promo",      aspect: "landscape" },
  { title: "Hawala",             platform: "Aha",     img: "/ott/hawala.jpg",                 cat: "OTT Series",       aspect: "portrait"  },
  { title: "Naga Chaitanya",     platform: "Viral",   img: "/campaigns/naga-chaitanya.jpg",   cat: "Brand Activation", aspect: "landscape" },
  { title: "Geetha Subramanyam", platform: "Aha",     img: "/ott/geetha-subramanyam.jpg",     cat: "OTT Series",       aspect: "portrait"  },
] as const;

// Card dimensions
const W_PORTRAIT  = 240;
const W_LANDSCAPE = 450;
const CARD_H      = 380; // all cards same height, landscape is shorter visually
const GAP         = 18;
const PAD_LEFT    = 160;

const TOTAL_REEL_W =
  REEL.reduce(
    (acc, item) => acc + (item.aspect === "portrait" ? W_PORTRAIT : W_LANDSCAPE) + GAP,
    0
  ) + PAD_LEFT;

// ── Card ──────────────────────────────────────────────────────────────────────

function ReelCard({
  item,
  index,
}: {
  item: (typeof REEL)[number];
  index: number;
}) {
  const w = item.aspect === "portrait" ? W_PORTRAIT : W_LANDSCAPE;
  const h = item.aspect === "portrait" ? CARD_H : Math.round(CARD_H * 0.65);

  return (
    <motion.div
      className="group relative overflow-hidden shrink-0 cursor-default"
      style={{ width: w, height: h, borderRadius: "4px" }}
      whileHover={{ scale: 1.035, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Poster image */}
      <img
        src={item.img}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)",
        }}
      />

      {/* Hover: red corner brackets */}
      <span className="absolute top-0 left-0 w-7 h-[2px] bg-[#C9A84C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
      <span className="absolute top-0 left-0 h-7 w-[2px] bg-[#C9A84C] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400" />
      <span className="absolute bottom-0 right-0 w-7 h-[2px] bg-[#C9A84C] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
      <span className="absolute bottom-0 right-0 h-7 w-[2px] bg-[#C9A84C] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400" />

      {/* Index tag */}
      <div className="absolute top-4 left-4">
        <span className="font-display text-[#F5E6D0]/20 text-[10px] tracking-[0.3em]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] font-bold mb-1.5">
          {item.cat}
        </p>
        <h3
          className="font-display text-[#F5E6D0] leading-tight"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)" }}
        >
          {item.title}
        </h3>
        <p className="text-[#F5E6D0]/35 text-[10px] tracking-[0.2em] uppercase mt-1">
          {item.platform}
        </p>
      </div>
    </motion.div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────

function ReelHeader({ progress }: { progress: MotionValue<number> }) {
  // Scroll hint arrow opacity — fades out as you scroll
  const hintOpacity = useTransform(progress, [0, 0.15], [1, 0]);

  return (
    <div className="absolute top-0 left-0 right-0 z-20 section-padding pt-12 pointer-events-none">
      <p className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold mb-4">
        The Work
      </p>
      <div className="flex items-end justify-between">
        <h2
          className="font-display text-[#F5E6D0] leading-[0.88]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 7.5rem)" }}
        >
          THE WORK{" "}
          <span className="text-[#C9A84C]">SPEAKS.</span>
        </h2>

        {/* Scroll hint */}
        <motion.div
          className="hidden lg:flex items-center gap-3 pb-2"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[#F5E6D0]/20 text-[10px] tracking-[0.3em] uppercase">
            scroll to explore
          </span>
          <motion.div
            className="flex gap-1"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[#C9A84C]">→</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export default function FilmReel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20 });

  // Horizontal translation: function-based so it reads live viewport width
  const x = useTransform(smooth, (v) => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const maxTranslate = -(TOTAL_REEL_W - vw + PAD_LEFT * 0.4);
    return Math.min(0, maxTranslate) * v;
  });

  const barScaleX = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{ height: "380vh" }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080808]">

        {/* Film grain */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px",
          }}
        />

        {/* Atmosphere: red glow at right edge */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 100% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Section header */}
        <ReelHeader progress={smooth} />

        {/* Right edge fade mask */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: "180px",
            background: "linear-gradient(to right, transparent, rgba(8,8,8,0.97))",
          }}
        />

        {/* Left edge fade mask */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: "80px",
            background: "linear-gradient(to left, transparent, rgba(8,8,8,0.70))",
          }}
        />

        {/* The horizontal film strip */}
        <div className="absolute inset-0 flex items-center" style={{ paddingTop: "140px", paddingBottom: "40px" }}>
          <motion.div
            className="flex items-center"
            style={{
              x,
              paddingLeft: `${PAD_LEFT}px`,
              columnGap: `${GAP}px`,
            }}
          >
            {REEL.map((item, i) => (
              <ReelCard key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F5E6D0]/[0.06] z-20">
          <motion.div
            className="h-full bg-[#C9A84C] origin-left"
            style={{ scaleX: barScaleX }}
          />
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-5 right-0 z-20 section-padding">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#F5E6D0]/15 hidden lg:block">
            {REEL.length} pieces of work
          </p>
        </div>
      </div>
    </div>
  );
}
