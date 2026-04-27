"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  category: string;
  stat?: string;
  episodes?: number;
  views?: string;
  brand?: string;
  bg?: string;
  accent?: string;
  index?: number;
  className?: string;
  slot?: string;
  poster?: string;
}

export default function ProjectCard({
  title,
  category,
  stat,
  episodes,
  views,
  brand,
  bg = "#1A1A1A",
  accent = "#B91C1C",
  index = 0,
  className = "",
  slot,
  poster,
}: ProjectCardProps) {
  return (
    <motion.article
      className={`relative overflow-hidden group cursor-pointer aspect-[3/4] ${className}`}
      style={{ background: bg }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      data-slot={slot}
    >
      {/* Poster image */}
      {poster && (
        <div className="absolute inset-0" style={{ backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      )}

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Number watermark */}
      <div className="absolute top-4 right-4 font-display text-6xl leading-none opacity-10 text-[#F5E6D0]">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Gradient overlay bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4"
        style={{ background: `linear-gradient(to top, ${bg} 0%, ${bg}99 50%, transparent 100%)` }}
      />

      {/* Hover shimmer */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${accent}15 0%, transparent 60%)` }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        {brand && (
          <p className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#F5E6D0]/30 mb-1">
            {brand}
          </p>
        )}
        <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: accent }}>
          {category}
        </p>
        <h3 className="font-display text-xl lg:text-2xl text-[#F5E6D0] leading-tight mb-3">{title}</h3>

        <div className="flex items-center gap-3 flex-wrap">
          {episodes && (
            <span className="text-xs text-[#F5E6D0]/50 font-medium">
              {episodes} eps
            </span>
          )}
          {views && (
            <span className="text-xs font-bold text-[#F5E6D0]/70">
              {views}
            </span>
          )}
          {stat && (
            <span className="text-xs font-bold text-[#F5E6D0]/70">{stat}</span>
          )}
        </div>
      </div>

      {/* Accent corner */}
      <div
        className="absolute top-0 left-0 w-1 h-16 group-hover:h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ background: accent }}
      />
    </motion.article>
  );
}
