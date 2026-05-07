"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, children, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.3 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full",
        className
      )}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 20s linear infinite;
        }
      `}</style>

      {/* Rotating sweep — brand red */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      </div>

      {/* Concentric circles — cream tones */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(245, 230, 208, ${0.12 - idx * 0.012})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}

      {/* Centre dot */}
      <div className="relative z-50 w-2 h-2 rounded-full bg-[#C9A84C]" />
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center justify-center gap-2"
    >
      <div className="flex h-11 w-11 items-center justify-center border border-[#F5E6D0]/10 bg-[#111111]">
        {icon}
      </div>
      <div className="hidden md:block text-center">
        <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-[#F5E6D0]/30">
          {text}
        </div>
      </div>
    </motion.div>
  );
};
