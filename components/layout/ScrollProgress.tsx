"use client";

import { useScroll, useSpring, useVelocity, useTransform, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  const velocity    = useVelocity(scrollY);
  const rawFlash    = useTransform(velocity, [-4000, -1800, 0, 1800, 4000], [0.14, 0.06, 0, 0.06, 0.14]);
  const flashOpacity = useSpring(rawFlash, { stiffness: 55, damping: 18 });

  return (
    <>
      {/* Vertical scroll progress bar — right edge */}
      <motion.div
        aria-hidden
        className="fixed right-0 top-0 w-[2px] origin-top z-[9998] pointer-events-none"
        style={{
          scaleY: smoothProgress,
          height: "100vh",
          background: "linear-gradient(to bottom, #C9A84C, #FF4444 60%, #C9A84C)",
          boxShadow: "0 0 8px #C9A84C88",
        }}
      />

      {/* Velocity-driven red pulse — fires when scrolling fast */}
      <motion.div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{
          opacity: flashOpacity,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.18) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
