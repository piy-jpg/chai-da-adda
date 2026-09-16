"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Coffee, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("HOME");
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: "HOME", href: "#home", id: "home" },
    { name: "OUR STORY", href: "#story", id: "story" },
    { name: "SIGNATURE CHAI", href: "#chai", id: "chai" },
    { name: "EXPERIENCE", href: "#experience", id: "experience" },
    { name: "WHY US", href: "#why", id: "why" },
    { name: "CONTACT", href: "#visit", id: "visit" },
  ];

  // 1. Scroll & Active Section Sensing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Detect active section
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cinematicEase = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: cinematicEase }}
      className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-3 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Subtle Floating Oscillation Container */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -1.5, 0],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7,
          }}
          className="w-full"
        >
          {/* Floating Glassmorphic Brand & Nav Bar Pill Container */}
          <nav
            aria-label="Main Navigation"
            className={`w-full flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 transition-all duration-500 rounded-full relative overflow-hidden ${
              isScrolled
                ? "py-2 sm:py-2 bg-[#100906]/94 backdrop-blur-2xl border border-[#C69247]/40 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(198,146,71,0.08)]"
                : "py-2.5 sm:py-2.5 bg-[#140C08]/80 backdrop-blur-xl border border-[#C69247]/25 shadow-2xl"
            }`}
          >
            {/* 4. Polished Brass Gold Light Sweep along the Border */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 8.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#DFAB5F]/15 to-transparent pointer-events-none -skew-x-12"
              />
            )}

            {/* 5. Brand Logo with Stable Text & Scaled Cup on Hover */}
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href="#home"
              className="flex items-center gap-2.5 group cursor-pointer shrink-0 z-10"
            >
              <div className="relative">
                {/* Soft warm-gold glow behind cup */}
                <div className="absolute -inset-1 rounded-full bg-[#DFAB5F]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                  transition={{ duration: 0.3, ease: cinematicEase }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#C69247]/45 bg-[#1E130D] flex items-center justify-center text-[#DFAB5F] group-hover:border-[#DFAB5F] group-hover:shadow-[0_0_14px_rgba(223,171,95,0.35)] transition-all duration-300 relative z-10"
                >
                  <Coffee className="w-4 h-4 text-[#DFAB5F]" />
                </motion.div>
              </div>

              <div className="flex flex-col select-none">
                <span className="font-serif text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors leading-tight">
                  CHAI KA ADDA
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.28em] text-[#DFAB5F]/80 leading-tight">
                  Varanasi Heritage
                </span>
              </div>
            </motion.a>

            {/* 6 & 7. Desktop Navigation Links with Active Detection & Center-Outward Underline */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 z-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                const isHovered = hoveredLink === link.name;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.18em] transition-colors group"
                  >
                    {/* Active Section Rounded Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-[#1E130D]/80 border border-[#C69247]/35 shadow-inner"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}

                    {/* Navigation Link Text */}
                    <span
                      className={`relative z-10 transition-colors duration-250 ${
                        isActive || isHovered ? "text-[#DFAB5F]" : "text-[#FBF6EE]/80"
                      }`}
                    >
                      {link.name}
                    </span>

                    {/* Center-Outward Growing Thin Gold Underline on Hover */}
                    <span
                      className={`absolute bottom-0.5 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-[#DFAB5F] to-transparent origin-center transition-transform duration-300 ease-out z-10 ${
                        isHovered && !isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* 8. Visit Adda Button with Lift, Shimmer Sweep, and Arrow Glide */}
            <div className="hidden sm:flex items-center shrink-0 z-10">
              <motion.a
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.35, ease: cinematicEase }}
                href="#visit"
                className="relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md shadow-[#C69247]/25 hover:shadow-[0_0_20px_rgba(223,171,95,0.4)] group overflow-hidden cursor-pointer"
              >
                {/* Soft Inner Highlight Sweep from Left to Right */}
                <span className="absolute inset-0 w-1/2 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />

                <span className="relative z-10">Visit Adda</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              </motion.a>
            </div>

            {/* Mobile Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-[#C69247]/30 text-[#FBF6EE] hover:text-[#DFAB5F] bg-[#1E130D] z-10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </nav>
        </motion.div>
      </div>

      {/* 10. Mobile Glassmorphic Drawer with Smooth Downward Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: cinematicEase }}
            className="lg:hidden mt-2 mx-auto max-w-lg rounded-3xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-2xl overflow-hidden shadow-2xl p-5 space-y-3 pointer-events-auto"
          >
            <div className="space-y-1 pb-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                      isActive
                        ? "text-[#DFAB5F] bg-[#1E130D] border border-[#C69247]/30"
                        : "text-[#FBF6EE]/90 hover:text-[#DFAB5F] hover:bg-[#1E130D]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#C69247]/20 flex flex-col gap-2">
              <a
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#DFAB5F] to-[#C69247] text-[#0D0806] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg"
              >
                <span>Visit The Adda</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



