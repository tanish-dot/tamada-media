"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/caas", label: "CaaS" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Pages with dark hero backgrounds that need cream nav text
  const isDarkHero = pathname === "/" || pathname === "/about" || pathname === "/caas" || pathname === "/work" || pathname === "/contact" || pathname === "/careers";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navBg = scrolled
    ? "bg-[#0A0A0A]/96 backdrop-blur-xl border-b border-[#F5E6D0]/[0.06]"
    : "bg-transparent";

  const textColor = scrolled || isDarkHero
    ? "text-[#F5E6D0]"
    : "text-[#0A0A0A]";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${navBg}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: ENTRANCE_EASE }}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Tamada Media"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ marginRight: "20px" }} className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
                textColor={textColor}
              />
            ))}
            <CtaButton />
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-[5px] p-2 ${textColor}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-current origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.4, ease: ENTRANCE_EASE }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-current"
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-current origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.4, ease: ENTRANCE_EASE }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center px-8 lg:px-16"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ENTRANCE_EASE }}
          >
            {/* Background counter text */}
            <div
              className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-[30vw] leading-none text-[#F5E6D0]/[0.025] select-none pointer-events-none"
              aria-hidden
            >
              TM
            </div>

            <nav className="flex flex-col gap-1 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.65, ease: ENTRANCE_EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`group font-display text-[clamp(3rem,10vw,6rem)] leading-[1.0] block py-1 transition-colors duration-300 ${
                      pathname === link.href ? "text-[#C9A84C]" : "text-[#F5E6D0] hover:text-[#C9A84C]"
                    }`}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C9A84C] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-16 pt-8 border-t border-[#F5E6D0]/10 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6, ease: ENTRANCE_EASE }}
            >
              <p className="text-[#F5E6D0]/30 text-[9px] tracking-[0.4em] uppercase mb-3">Contact</p>
              <a
                href="mailto:info@tamadamedia.com"
                className="text-[#F5E6D0]/60 text-sm hover:text-[#C9A84C] transition-colors duration-300 hover-underline"
              >
                info@tamadamedia.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sub-components ───────────────────────────── */

function NavLink({
  href,
  label,
  active,
  textColor,
}: {
  href: string;
  label: string;
  active: boolean;
  textColor: string;
}) {
  return (
    <Link
      href={href}
      className={`relative group text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${textColor} ${
        active ? "opacity-100" : "opacity-50 hover:opacity-100"
      }`}
    >
      {label}
      {/* Active dot */}
      {active && (
        <span className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#C9A84C]" />
      )}
      {/* Hover underline draw */}
      {!active && (
        <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      )}
    </Link>
  );
}

function CtaButton() {
  return (
    <Link
      href="/careers"
      className="relative ml-2 px-6 py-2.5 bg-[#C9A84C] text-[#F5E6D0] text-[10px] font-bold tracking-[0.2em] uppercase overflow-hidden group"
    >
      {/* Sweep fill */}
      <span className="absolute inset-0 bg-[#F5E6D0] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <span className="relative z-10 group-hover:text-[#C9A84C] transition-colors duration-500">
        We&apos;re Hiring
      </span>
    </Link>
  );
}
