"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/data/content";

const SOUTH_SCRIPTS = [
  "తమడా", "ತಮಡಾ", "தமடா", "TAMADA", "തമഡ", "তমডা",
  "TAMADA", "తమడా", "ತಮಡಾ", "தமடா",
];

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer className="bg-[#0A0A0A] text-[#F5E6D0] overflow-hidden" ref={ref}>
      {/* Scrolling ticker */}
      <div className="border-t border-[#F5E6D0]/[0.07] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker-slow">
          {[...SOUTH_SCRIPTS, ...SOUTH_SCRIPTS, ...SOUTH_SCRIPTS].map((text, i) => (
            <span key={i} className="font-display text-sm mx-10 text-[#F5E6D0]/20 tracking-widest">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8">

          {/* Brand column */}
          <motion.div
            className="md:col-span-5 lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: ENTRANCE_EASE }}
          >
            <img
              src="/logo.png"
              alt="Tamada Media"
              className="w-56 lg:w-72 h-auto object-contain mb-2 -ml-2"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
            />
            <p className="text-[#F5E6D0]/45 text-sm leading-[1.8] max-w-xs">
              South India&apos;s largest content ecosystem. Creator network, IP builder,
              OTT partner, production house.
            </p>
            <div className="mt-10">
              <GetInTouchButton />
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Navigation */}
          <motion.div
            className="md:col-span-3 lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: ENTRANCE_EASE }}
          >
            <h3 className="text-[9px] tracking-[0.4em] uppercase text-[#F5E6D0]/30 mb-8 font-semibold">
              Navigate
            </h3>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative w-fit text-[#F5E6D0]/50 hover:text-[#F5E6D0] text-sm transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-[2px] left-0 w-0 h-[1px] bg-[#F5E6D0]/40 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease: ENTRANCE_EASE }}
          >
            <h3 className="text-[9px] tracking-[0.4em] uppercase text-[#F5E6D0]/30 mb-8 font-semibold">
              Contact
            </h3>
            <div className="flex flex-col gap-5">
              <a
                href={`mailto:${BRAND.email.primary}`}
                className="group relative w-fit text-[#F5E6D0]/50 hover:text-[#C9A84C] text-sm transition-colors duration-300 break-all"
              >
                {BRAND.email.primary}
                <span className="absolute -bottom-[2px] left-0 w-0 h-[1px] bg-[#C9A84C]/60 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>

              <div className="mt-6 pt-6 border-t border-[#F5E6D0]/[0.07] space-y-1.5">
                <p className="text-[9px] text-[#F5E6D0]/25 tracking-[0.3em] uppercase">
                  Hyderabad, India
                </p>
                <p className="text-[10px] text-[#F5E6D0]/25">
                  Operating across 5 states
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-20 pt-8 border-t border-[#F5E6D0]/[0.07] flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[#F5E6D0]/18 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Tamada Media. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[#F5E6D0]/18 text-xs">YouTube Enterprise Partner</span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#C9A84C]" />
            <span className="text-[#F5E6D0]/18 text-xs">1 of 12 in India</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function GetInTouchButton() {
  return (
    <a
      href="mailto:info@tamadamedia.com"
      className="relative inline-flex items-center gap-3 px-6 py-3 border border-[#C9A84C] text-[#C9A84C] text-[10px] font-bold tracking-[0.2em] uppercase overflow-hidden group transition-colors duration-500"
    >
      <span className="absolute inset-0 bg-[#C9A84C] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <span className="relative z-10 group-hover:text-[#F5E6D0] transition-colors duration-500">
        Get In Touch
      </span>
      <svg
        className="relative z-10 w-3 h-3 group-hover:text-[#F5E6D0] transition-colors duration-500 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
