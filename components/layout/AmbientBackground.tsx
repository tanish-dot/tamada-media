"use client";

import { useEffect, useRef } from "react";

/* Logo palette */
const COLORS = [
  { r: 201, g: 168, b: 76  }, /* gold  — 60% of dots */
  { r: 201, g: 168, b: 76  },
  { r: 201, g: 168, b: 76  },
  { r: 194, g:  91, b: 82  }, /* coral — 20% */
  { r:  74, g: 154, b: 178 }, /* teal  — 20% */
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  cr: number; cg: number; cb: number; /* colour */
  fillStyle: string; /* cached rgba string — avoids per-frame allocation */
}

/* Alpha-batched stroke buckets — group lines of similar alpha into one stroke() call */
const ALPHA_BUCKETS = 10;
const STROKE_STYLES: string[] = [];
for (let i = 0; i < ALPHA_BUCKETS; i++) {
  const alpha = ((i + 1) / ALPHA_BUCKETS) * 0.22;
  STROKE_STYLES.push(`rgba(201,168,76,${alpha.toFixed(4)})`);
}

/* Same-cell + 4 forward neighbors → each pair visited once */
const NEIGHBOR_OFFSETS: [number, number][] = [
  [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1],
];

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let raf: number;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();

    const count = Math.min(Math.floor((W * H) / 12000), 110);
    const MAX_DIST = Math.min(W, H) * 0.27;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const INV_MAX_DIST = 1 / MAX_DIST;

    const particles: Particle[] = Array.from({ length: count }, () => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      const opacity = Math.random() * 0.47 + 0.30;
      return {
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        r:  Math.random() * 1.5 + 0.55,
        opacity,
        cr: c.r, cg: c.g, cb: c.b,
        fillStyle: `rgba(${c.r},${c.g},${c.b},${opacity.toFixed(3)})`,
      };
    });

    /* Pre-allocate spatial grid + path buckets to avoid per-frame GC pressure */
    let cellSize = MAX_DIST;
    let cols = Math.ceil(W / cellSize) + 1;
    let rows = Math.ceil(H / cellSize) + 1;
    let grid: number[][] = Array.from({ length: cols * rows }, () => []);
    const buckets: Path2D[] = Array.from({ length: ALPHA_BUCKETS }, () => new Path2D());

    const rebuildGrid = () => {
      cellSize = MAX_DIST;
      cols = Math.ceil(W / cellSize) + 1;
      rows = Math.ceil(H / cellSize) + 1;
      grid = Array.from({ length: cols * rows }, () => []);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Move + reset grid cells (reuse arrays — just clear length) */
      const N = particles.length;
      for (let g = 0; g < grid.length; g++) grid[g].length = 0;

      for (let i = 0; i < N; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        else if (p.y > H) p.y = 0;

        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        if (cx >= 0 && cx < cols && cy >= 0 && cy < rows) {
          grid[cy * cols + cx].push(i);
        }
      }

      /* Reset path buckets for this frame */
      for (let b = 0; b < ALPHA_BUCKETS; b++) buckets[b] = new Path2D();

      /* Spatial-grid line connections — each pair visited at most once */
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const cellA = grid[cy * cols + cx];
          if (!cellA.length) continue;

          for (let n = 0; n < NEIGHBOR_OFFSETS.length; n++) {
            const dx = NEIGHBOR_OFFSETS[n][0];
            const dy = NEIGHBOR_OFFSETS[n][1];
            const ncx = cx + dx;
            const ncy = cy + dy;
            if (ncx < 0 || ncx >= cols || ncy < 0 || ncy >= rows) continue;
            const cellB = grid[ncy * cols + ncx];
            if (!cellB.length) continue;
            const sameCell = dx === 0 && dy === 0;

            for (let ai = 0; ai < cellA.length; ai++) {
              const a = particles[cellA[ai]];
              const startBi = sameCell ? ai + 1 : 0;
              for (let bi = startBi; bi < cellB.length; bi++) {
                const b = particles[cellB[bi]];
                const ddx = a.x - b.x;
                const ddy = a.y - b.y;
                const distSq = ddx * ddx + ddy * ddy;
                if (distSq >= MAX_DIST_SQ) continue;

                const dist = Math.sqrt(distSq);
                const t = 1 - dist * INV_MAX_DIST;
                /* Quantize alpha into buckets — batches strokes by similar opacity */
                let bucket = (t * ALPHA_BUCKETS) | 0;
                if (bucket >= ALPHA_BUCKETS) bucket = ALPHA_BUCKETS - 1;
                const path = buckets[bucket];
                path.moveTo(a.x, a.y);
                path.lineTo(b.x, b.y);
              }
            }
          }
        }
      }

      /* One stroke() per alpha bucket — collapses thousands of stroke calls into ~10 */
      ctx.lineWidth = 0.65;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        ctx.strokeStyle = STROKE_STYLES[b];
        ctx.stroke(buckets[b]);
      }

      /* Dots — fillStyle is cached on the particle */
      for (let i = 0; i < N; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.fillStyle;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    /* Pause rendering when tab/window not visible — saves cycles */
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    const onResize = () => {
      resize();
      rebuildGrid();
    };

    draw();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {/* Canvas constellation */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2, mixBlendMode: "screen", transform: "translateZ(0)", willChange: "contents" }}
      />

      {/* Subtle coral blob — top right */}
      <div
        aria-hidden
        className="fixed pointer-events-none"
        style={{
          zIndex: 1,
          top: "-20%", right: "-15%",
          width: "55vw", height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(194,91,82,0.18) 0%, transparent 65%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Subtle teal blob — bottom centre-left */}
      <div
        aria-hidden
        className="fixed pointer-events-none"
        style={{
          zIndex: 1,
          bottom: "-20%", left: "15%",
          width: "50vw", height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(74,154,178,0.15) 0%, transparent 65%)",
          filter: "blur(100px)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
