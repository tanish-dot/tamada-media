"use client";

interface MarqueeDividerProps {
  text?: string;
  bg?: "red" | "dark" | "cream";
  speed?: number; /* seconds for one full loop */
  reverse?: boolean;
}

const DEFAULTS = {
  red:   { bg: "#C9A84C", color: "#F5E6D0" },
  dark:  { bg: "#0A0A0A", color: "#F5E6D0" },
  cream: { bg: "#F5E6D0", color: "#080808" },
};

export default function MarqueeDivider({
  text = "TAMADA MEDIA · YOUR THUMB STOPS HERE · SOUTH INDIA'S LARGEST CONTENT ECOSYSTEM · 750+ CHANNELS · 4.8B+ MONTHLY VIEWS · ",
  bg = "red",
  speed = 30,
  reverse = false,
}: MarqueeDividerProps) {
  const theme = DEFAULTS[bg];
  const items = Array(6).fill(text);

  return (
    <div
      className="w-full overflow-hidden py-3 select-none"
      style={{ background: theme.bg }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-divider ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`,
          willChange: "transform",
        }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="shrink-0 text-[10px] tracking-[0.35em] font-bold uppercase"
            style={{ color: theme.color, opacity: bg === "dark" ? 0.3 : 0.85, paddingRight: "0.5rem" }}
          >
            {t}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-divider {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
