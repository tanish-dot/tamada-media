"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export default function FoundersIntro() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slide lines in from opposite sides as section scrolls into view
  const xA  = useTransform(scrollYProgress, [0, 0.5], ["-18vw", "0vw"]);
  const xB  = useTransform(scrollYProgress, [0, 0.5], ["18vw",  "0vw"]);
  // Fade out as section leaves
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.78, 1], [0, 1, 1, 0]);

  // Spring-smoothed so it doesn't feel mechanical
  const xAS = useSpring(xA, { stiffness: 50, damping: 16 });
  const xBS = useSpring(xB, { stiffness: 50, damping: 16 });

  return (
    <section
      ref={ref}
      style={{
        background: "#F7F7F5",
        overflow: "hidden",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div style={{ opacity, textAlign: "center", userSelect: "none" }}>
        {/* Line 1 — slides from left */}
        <motion.p
          className="font-display text-[#0A0A0A]"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 13rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            x: xAS,
          }}
        >
          THE PEOPLE
        </motion.p>

        {/* Line 2 — slides from right, red */}
        <motion.p
          className="font-display"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 13rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            color: "#C85548",
            x: xBS,
          }}
        >
          BEHIND IT.
        </motion.p>
      </motion.div>
    </section>
  );
}
