"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CursorGlow() {
  /* ── Ambient blob (framer spring) ── */
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 18 });

  /* ── Dot + ring (RAF lerp) ── */
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -999, y: -999 });
  const ring    = useRef({ x: -999, y: -999 });
  const isHover = useRef(false);

  useEffect(() => {
    /* Only run on pointer:fine devices (no cursor on touch) */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      isHover.current = !!(e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.09);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.09);

      const targetSize = isHover.current ? 48 : 30;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
        dotRef.current.style.opacity = isHover.current ? "0" : "1";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
        ringRef.current.style.width  = `${targetSize}px`;
        ringRef.current.style.height = `${targetSize}px`;
        ringRef.current.style.background = isHover.current
          ? "rgba(245,230,208,0.08)"
          : "transparent";
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Ambient red blob — follows mouse with spring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[9985]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 68%)",
          willChange: "transform",
          contain: "layout paint",
        }}
      />

      {/* Dot — snaps to cursor instantly */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#F5E6D0",
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />

      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(245,230,208,0.75)",
          transition: "width 0.22s ease, height 0.22s ease, background 0.22s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
