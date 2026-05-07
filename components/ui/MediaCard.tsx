"use client";

import { motion } from "framer-motion";

interface MediaCardProps {
  title: string;
  category?: string;
  stat?: string;
  aspectRatio?: "16/9" | "3/4" | "1/1" | "9/16";
  bg?: string;
  accent?: string;
  className?: string;
  index?: number;
  slot?: string;
  poster?: string;
  url?: string;
}

const aspectClasses: Record<string, string> = {
  "16/9": "aspect-video",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "9/16": "aspect-[9/16]",
};

export default function MediaCard({
  title,
  category,
  stat,
  aspectRatio = "16/9",
  bg = "#1A1A1A",
  accent = "#C9A84C",
  className = "",
  index = 0,
  slot,
  poster,
  url,
}: MediaCardProps) {
  const card = (
    <motion.div
      className={`relative overflow-hidden group cursor-pointer ${aspectClasses[aspectRatio]} ${className}`}
      style={{
        backgroundColor: bg,
        backgroundImage: poster ? `url(${poster})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      data-slot={slot}
    >
      {!poster && (
        <>
          {/* Placeholder grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Large index number as visual */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-5"
            aria-hidden
          >
            <span className="font-display text-[20vw] leading-none" style={{ color: accent }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </>
      )}

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/20 transition-all duration-500"
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 lg:p-5"
        style={{
          background: poster
            ? "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4) 60%, transparent)"
            : `linear-gradient(to top, ${bg}ee, transparent)`,
        }}
      >
        {category && (
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-1" style={{ color: accent }}>
            {category}
          </p>
        )}
        <h3 className="font-display text-lg lg:text-xl text-[#F5E6D0] leading-tight">{title}</h3>
        {stat && (
          <p className="text-xs text-[#F5E6D0]/60 mt-1 font-medium">{stat}</p>
        )}
      </div>

      {/* Play hint on hover */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-[#F5E6D0]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-4 h-4 text-[#F5E6D0] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </motion.div>
    </motion.div>
  );

  if (url) {
    return <a href={url} target="_blank" rel="noopener noreferrer">{card}</a>;
  }
  return card;
}
