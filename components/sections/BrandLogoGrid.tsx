"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const BRAND_IMAGES = [
  "/brands/Zomato_logo.png",
  "/brands/spotify-1759471_1280.webp",
  "/brands/Swiggy.png",
  "/brands/Meesho_logo.png.webp",
  "/brands/mia.png",
  "/brands/Kellogs logo.png",
  "/brands/ather-logo-1.webp",
  "/brands/Dove.jpg",
  "/brands/JioCinema.png",
  "/brands/indus valley.png",
  "/brands/Endowus (Abby) - Pizza Hut Logo.webp",
  "/brands/mahindra.webp",
  "/brands/bumble logo.jpg",
  "/brands/dr.reddys.jpg",
  "/brands/itc-agarbattis-dhoop-brands-2.webp",
  "/brands/Swadesh.jpg",
  "/brands/IDBI.NS-1e2d35e6.png",
  "/brands/Coca Cola.png",
  "/brands/images (2).png",
  "/brands/unnamed.webp",
  "/brands/original-samsung-logo-10.png",
  "/brands/The_Himalaya.webp",
  "/brands/banner-right-logo.png",
  "/brands/rv6sgdmwgnhtyqmnr9et.avif",
  "/brands/b81ff9bd21422a49027ce93549de1cdbae8c46b1.webp",
  "/brands/ac763c0e47482298614736233fde33b62e2bfaa0-1080x1080.avif",
  "/brands/95b631e22b9e94be9b99a738e7e17292.jpg",
  "/brands/9fcbcd192336225.Y3JvcCw2MDIsNDcxLDEwMiwxODA.jpg",
  "/brands/images.jpg",
  "/brands/images (1).jpg",
  "/brands/images (2).jpg",
  "/brands/images (4).jpg",
  "/brands/images (2) (1).jpg",
  "/brands/images.png",
  "/brands/images (1).png",
];

export default function BrandLogoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F5E6D0] overflow-hidden">
      <div className="section-padding">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block w-5 h-px bg-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] font-bold">Brand Partners</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[#080808] leading-[0.88]"
                style={{ fontSize: "clamp(2.5rem,5vw,7rem)" }}
                initial={{ y: "106%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
              >
                200+ BRANDS.
                <br />
                <span className="text-[#080808]/20">ONE NETWORK.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="text-[#080808]/40 text-sm max-w-xs leading-[1.85] lg:text-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From challenger brands to Fortune 500s — campaigns built for the most recognised names in the country.
          </motion.p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-[#080808]/[0.08]">
          {BRAND_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="bg-[#F5E6D0] flex items-center justify-center p-4 lg:p-5 aspect-[3/2] group cursor-default"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.016 }}
            >
              <img
                src={src}
                alt=""
                className="max-h-16 lg:max-h-20 max-w-full object-contain transition-opacity duration-300 opacity-100 sm:opacity-60 sm:group-hover:opacity-100"
                style={{ mixBlendMode: "multiply" }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
