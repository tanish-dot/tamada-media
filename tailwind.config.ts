import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C9A84C",
          crimson: "#A08030",
          "red-light": "#DC2626",
          "red-dark": "#7F1D1D",
          "logo-red": "#C45B5B",
          "logo-blue": "#4E8CC4",
          beige: "#F5E6D0",
          "beige-dark": "#EDD9BC",
          cream: "#FAF3E8",
          black: "#0A0A0A",
          charcoal: "#1A1A1A",
          "gray-dark": "#2A2A2A",
          gray: "#6B6B6B",
          "gray-light": "#9A9A9A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 12vw, 14rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(3rem, 8vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.5rem, 6vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(2rem, 4vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "headline-xl": ["clamp(1.75rem, 3vw, 3.5rem)", { lineHeight: "1.05" }],
        "headline-lg": ["clamp(1.5rem, 2.5vw, 2.75rem)", { lineHeight: "1.1" }],
        "headline-md": ["clamp(1.25rem, 2vw, 2rem)", { lineHeight: "1.2" }],
        "stat-xl": ["clamp(3rem, 8vw, 9rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "stat-lg": ["clamp(2.5rem, 6vw, 7rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      spacing: {
        "section": "8rem",
        "section-sm": "5rem",
        "section-xs": "3rem",
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "ticker-reverse": "ticker-reverse 35s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 0.5s steps(1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        grain: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "10%": { backgroundPosition: "10% 10%" },
          "20%": { backgroundPosition: "20% 20%" },
          "30%": { backgroundPosition: "30% 5%" },
          "40%": { backgroundPosition: "40% 15%" },
          "50%": { backgroundPosition: "50% 25%" },
          "60%": { backgroundPosition: "60% 35%" },
          "70%": { backgroundPosition: "70% 45%" },
          "80%": { backgroundPosition: "80% 55%" },
          "90%": { backgroundPosition: "90% 65%" },
        },
      },
      backgroundImage: {
        "grain": "url('/grain.png')",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
        "snap": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
    },
  },
  plugins: [],
};

export default config;
