"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default function WorkHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Scene ───────────────────────────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00018);

    /* ── Camera ──────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(
      72,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 20, 120);

    const smoothPos = { x: 0, y: 20, z: 120 };

    /* ── Renderer ────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.6;

    /* ── Post-processing ─────────────────────── */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
      0.9,   // strength
      0.5,   // radius
      0.82   // threshold
    );
    composer.addPass(bloom);

    /* ── Stars ───────────────────────────────── */
    const starFields: THREE.Points[] = [];
    for (let layer = 0; layer < 3; layer++) {
      const count = 4000;
      const positions = new Float32Array(count * 3);
      const colors    = new Float32Array(count * 3);
      const sizes     = new Float32Array(count);

      for (let j = 0; j < count; j++) {
        const r   = 250 + Math.random() * 700;
        const phi = Math.acos(2 * Math.random() - 1);
        const th  = Math.random() * Math.PI * 2;
        positions[j*3]   = r * Math.sin(phi) * Math.cos(th);
        positions[j*3+1] = r * Math.sin(phi) * Math.sin(th);
        positions[j*3+2] = r * Math.cos(phi);

        // Mostly cream/warm-white, occasionally red-tinted
        const c = new THREE.Color();
        const rng = Math.random();
        if (rng < 0.72)      c.setHSL(0.08, 0.15, 0.82 + Math.random() * 0.18); // warm white
        else if (rng < 0.90) c.setHSL(0.04, 0.55, 0.75); // warm amber
        else                  c.setHSL(0.00, 0.70, 0.65); // red accent

        colors[j*3] = c.r; colors[j*3+1] = c.g; colors[j*3+2] = c.b;
        sizes[j] = Math.random() * 2.2 + 0.4;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, layer: { value: layer } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float layer;
          void main() {
            vColor = color;
            vec3 p = position;
            float speed = 0.018 * (1.0 - layer * 0.25);
            float a = time * speed;
            mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
            p.xz = rot * p.xz;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (280.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      starFields.push(pts);
    }

    /* ── Nebula (red brand color) ────────────── */
    const nebulaGeo = new THREE.PlaneGeometry(6000, 3000, 80, 80);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time:    { value: 0 },
        colorA:  { value: new THREE.Color(0xb91c1c) },  // brand red
        colorB:  { value: new THREE.Color(0x3d0000) },  // deep dark red
        opacity: { value: 0.28 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin(p.x * 0.008 + time) * cos(p.y * 0.008 + time) * 18.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        void main() {
          float m = sin(vUv.x * 8.0 + time * 0.4) * cos(vUv.y * 8.0 + time * 0.3);
          vec3 col = mix(colorB, colorA, m * 0.5 + 0.5);
          float a = opacity * (1.0 - length(vUv - 0.5) * 1.8);
          a = max(a, 0.0);
          gl_FragColor = vec4(col, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -900;
    scene.add(nebula);

    /* ── Silhouette layers ───────────────────── */
    // Dark angular shapes that give depth — like distant terrain
    const layerDefs = [
      { z: -40,  h: 55,  col: 0x0d0d0d },
      { z: -90,  h: 72,  col: 0x0a0a0a },
      { z: -140, h: 92,  col: 0x080810 },
      { z: -200, h: 110, col: 0x050508 },
    ];

    const silhouettes = layerDefs.map((def) => {
      const pts: THREE.Vector2[] = [];
      const segs = 60;
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs - 0.5) * 1200;
        const y =
          Math.sin(i * 0.12) * def.h * 0.8 +
          Math.sin(i * 0.06 + 1.2) * def.h * 0.4 +
          Math.sin(i * 0.03 + 2.4) * def.h * 0.25 -
          110;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(700, -400));
      pts.push(new THREE.Vector2(-700, -400));

      const shape = new THREE.Shape(pts);
      const geo   = new THREE.ShapeGeometry(shape);
      const mat   = new THREE.MeshBasicMaterial({
        color: def.col,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, def.z * 0.5, def.z);
      mesh.userData.baseZ = def.z;
      scene.add(mesh);
      return mesh;
    });

    /* ── Mouse parallax ──────────────────────── */
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── Animation loop ──────────────────────── */
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      // Star rotation
      starFields.forEach((sf) => {
        (sf.material as THREE.ShaderMaterial).uniforms.time.value = t;
      });

      // Nebula pulse
      (nebulaMat as THREE.ShaderMaterial).uniforms.time.value = t * 0.5;

      // Camera: smooth float + mouse parallax
      const targetX = mouseX * 6;
      const targetY = 20 + mouseY * -3 + Math.sin(t * 0.12) * 1.5;
      const targetZ = 120 + Math.cos(t * 0.08) * 2;

      smoothPos.x += (targetX - smoothPos.x) * 0.04;
      smoothPos.y += (targetY - smoothPos.y) * 0.04;
      smoothPos.z += (targetZ - smoothPos.z) * 0.04;

      camera.position.set(smoothPos.x, smoothPos.y, smoothPos.z);
      camera.lookAt(0, 8, -400);

      // Silhouette gentle sway
      silhouettes.forEach((s, i) => {
        s.position.x = Math.sin(t * 0.06 + i) * (2 + i * 1.5);
      });

      composer.render();
    };
    animate();

    /* ── Resize ──────────────────────────────── */
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ─────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      starFields.forEach((sf) => { sf.geometry.dispose(); (sf.material as THREE.Material).dispose(); });
      silhouettes.forEach((s)  => { s.geometry.dispose();  (s.material  as THREE.Material).dispose(); });
      nebulaGeo.dispose();
      nebulaMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
