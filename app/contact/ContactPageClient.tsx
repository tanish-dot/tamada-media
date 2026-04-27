"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/data/content";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES_OPTIONS = [
  "Influencer Marketing",
  "Content Production",
  "Brand IP Creation",
  "Social Media Management",
  "Platform Partnerships",
  "OTT / Long-Form",
  "Brand Solutions",
  "Creator-Led Storytelling",
  "Not sure yet",
];

export default function ContactPageClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [formState, setFormState] = useState({
    name: "",
    brand: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-[#0A0A0A]">
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="min-h-[65vh] flex flex-col justify-end section-padding pt-36 relative overflow-hidden"
        ref={heroRef}
      >
        {/* Ambient background text */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[26vw] leading-none text-[#F5E6D0]/[0.025] pointer-events-none select-none"
          aria-hidden
        >
          BRIEF
        </div>

        <motion.p
          className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold mb-8 relative z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: ENTRANCE_EASE }}
        >
          Get In Touch
        </motion.p>

        <div className="relative z-10">
          {["ANY", "BRIEFS?"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className="font-display text-[clamp(5.5rem,15vw,20rem)] leading-[0.84] text-[#F5E6D0]"
                initial={{ y: "110%" }}
                animate={heroInView ? { y: "0%" } : {}}
                transition={{ duration: 0.95, delay: 0.35 + i * 0.12, ease: ENTRANCE_EASE }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#F5E6D0]/[0.07]"
          initial={{ scaleX: 0 }}
          animate={heroInView ? { scaleX: 1 } : {}}
          style={{ originX: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: ENTRANCE_EASE }}
        />
      </section>

      {/* ── Contact split ─────────────────────────── */}
      <section className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
        {/* Left — info */}
        <ContactInfo />

        {/* Right — form */}
        <div>
          {!submitted ? (
            <ContactForm
              formState={formState}
              setFormState={setFormState}
              onSubmit={handleSubmit}
            />
          ) : (
            <SuccessMessage />
          )}
        </div>
      </section>
    </main>
  );
}

/* ── Contact Info ─────────────────────────────── */
function ContactInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <motion.p
        className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        Direct Contact
      </motion.p>

      <div className="flex flex-col gap-10 divide-y divide-[#F5E6D0]/[0.07]">
        {[
          { label: "Partnerships & Briefs", email: BRAND.email.primary },
          { label: "Brand Solutions", email: BRAND.email.secondary },
        ].map((c, i) => (
          <motion.div
            key={i}
            className={i > 0 ? "pt-10" : ""}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: ENTRANCE_EASE }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#F5E6D0]/28 mb-3">
              {c.label}
            </p>
            <a
              href={`mailto:${c.email}`}
              className="group relative font-display text-xl lg:text-2xl text-[#F5E6D0] hover:text-[#B91C1C] transition-colors duration-400 break-all inline-block"
            >
              {c.email}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B91C1C] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Location */}
      <motion.div
        className="mt-14 pt-10 border-t border-[#F5E6D0]/[0.07]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#F5E6D0]/28 mb-3">Based In</p>
        <p className="text-[#F5E6D0]/65 text-sm font-medium">Hyderabad, India</p>
        <p className="text-[#F5E6D0]/35 text-xs mt-1.5 leading-[1.6]">
          Operating across Hyderabad · Chennai · Bangalore · Mumbai · Delhi
        </p>
      </motion.div>

      {/* Quick stats grid */}
      <motion.div
        className="mt-14 grid grid-cols-2 gap-px bg-[#F5E6D0]/[0.06]"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.65, ease: ENTRANCE_EASE }}
      >
        {[
          { v: "250+", l: "Team Members" },
          { v: "5",    l: "States" },
          { v: "15+",  l: "Years" },
          { v: "200+", l: "Brand Partners" },
        ].map((s, i) => (
          <div key={i} className="bg-[#0A0A0A] px-7 py-8 group">
            <p className="font-display text-3xl lg:text-4xl text-[#F5E6D0] group-hover:text-[#B91C1C] transition-colors duration-300">
              {s.v}
            </p>
            <p className="text-[9px] text-[#F5E6D0]/28 tracking-[0.3em] uppercase mt-2">
              {s.l}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Contact Form ─────────────────────────────── */
type FormState = {
  name: string;
  brand: string;
  email: string;
  service: string;
  message: string;
};

function ContactForm({
  formState,
  setFormState,
  onSubmit,
}: {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const fieldClass =
    "w-full bg-transparent border-b border-[#F5E6D0]/15 focus:border-[#B91C1C] outline-none text-[#F5E6D0] placeholder-[#F5E6D0]/20 py-4 text-sm transition-colors duration-400 leading-relaxed";

  return (
    <motion.form
      ref={ref}
      onSubmit={onSubmit}
      className="flex flex-col gap-10"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: ENTRANCE_EASE }}
    >
      <p className="text-[10px] tracking-[0.42em] uppercase text-[#B91C1C] font-bold">
        Drop A Brief
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <label className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/28 block mb-3">
            Your Name
          </label>
          <input
            required
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/28 block mb-3">
            Brand / Company
          </label>
          <input
            required
            type="text"
            placeholder="Brand name"
            value={formState.brand}
            onChange={(e) => setFormState((s) => ({ ...s, brand: e.target.value }))}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/28 block mb-3">
          Email
        </label>
        <input
          required
          type="email"
          placeholder="your@email.com"
          value={formState.email}
          onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/28 block mb-5">
          Service Interest
        </label>
        <div className="flex flex-wrap gap-2.5">
          {SERVICES_OPTIONS.map((opt) => (
            <motion.button
              key={opt}
              type="button"
              onClick={() => setFormState((s) => ({ ...s, service: opt }))}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                formState.service === opt
                  ? "bg-[#B91C1C] text-[#F5E6D0] border border-[#B91C1C]"
                  : "border border-[#F5E6D0]/15 text-[#F5E6D0]/45 hover:border-[#B91C1C]/60 hover:text-[#F5E6D0]"
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[9px] tracking-[0.35em] uppercase text-[#F5E6D0]/28 block mb-3">
          Tell Us More
        </label>
        <textarea
          rows={5}
          placeholder="Brief, goals, timeline..."
          value={formState.message}
          onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        className="relative self-start inline-flex items-center gap-4 px-10 py-4 bg-[#B91C1C] text-[#F5E6D0] text-[11px] font-bold tracking-[0.22em] uppercase overflow-hidden group"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.975 }}
        transition={{ duration: 0.25 }}
      >
        <span className="absolute inset-0 bg-[#F5E6D0] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <span className="relative z-10 group-hover:text-[#B91C1C] transition-colors duration-500">
          Send Brief
        </span>
        <svg
          className="relative z-10 w-3.5 h-3.5 group-hover:text-[#B91C1C] group-hover:translate-x-1 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </motion.form>
  );
}

/* ── Success Message ──────────────────────────── */
function SuccessMessage() {
  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: ENTRANCE_EASE }}
    >
      {/* Check mark */}
      <motion.div
        className="w-14 h-14 border border-[#B91C1C] flex items-center justify-center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: ENTRANCE_EASE }}
      >
        <svg
          className="w-6 h-6 text-[#B91C1C]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          className="font-display text-[clamp(3rem,6vw,6rem)] text-[#F5E6D0] leading-[0.89]"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: ENTRANCE_EASE }}
        >
          BRIEF RECEIVED.
        </motion.h2>
      </div>

      <motion.p
        className="text-[#F5E6D0]/45 text-base leading-[1.8] max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        We&apos;ll get back to you within 24 hours. In the meantime, feel free to reach out directly.
      </motion.p>

      <motion.a
        href={`mailto:${BRAND.email.primary}`}
        className="group relative w-fit text-[#B91C1C] text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        {BRAND.email.primary}
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B91C1C] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </motion.a>
    </motion.div>
  );
}
