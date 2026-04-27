"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface StatBlockProps {
  value: string;
  suffix?: string;
  label: string;
  invert?: boolean;
  size?: "default" | "large";
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const end = target;
    if (start === end) return;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

export default function StatBlock({ value, suffix = "", label, invert = false, size = "default" }: StatBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Parse numeric value
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const hasDecimal = value.includes(".");
  const prefix = value.match(/^[^0-9]*/)?.[0] || "";
  const displaySuffix = value.match(/[^0-9.]+$/)?.[0] || suffix;

  const count = useCountUp(numericValue, 1800, inView);

  const displayValue = hasDecimal ? count.toFixed(1) : count.toLocaleString();

  const textColor = invert ? "text-[#F5E6D0]" : "text-[#B91C1C]";
  const labelColor = invert ? "text-[#F5E6D0]/50" : "text-[#6B6B6B]";

  const numSize = size === "large"
    ? "text-[clamp(3.5rem,8vw,10rem)] leading-none"
    : "text-[clamp(2.5rem,5vw,7rem)] leading-none";

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className={`font-display ${numSize} ${textColor} tracking-tight`}>
        {prefix}{displayValue}{displaySuffix || suffix}
      </div>
      <p className={`text-xs tracking-[0.2em] uppercase font-medium ${labelColor}`}>{label}</p>
    </div>
  );
}
