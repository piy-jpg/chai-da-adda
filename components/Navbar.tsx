"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Coffee, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isOurStoryPage = pathname === "/our-story";
  const isSignatureChaiPage = pathname === "/signature-chai";
  const isExperiencePage = pathname === "/experience";
  const isWhyUsPage = pathname === "/why-us";
  const isContactPage = pathname === "/contact";
  const isStandalonePage = isOurStoryPage || isSignatureChaiPage || isExperiencePage || isWhyUsPage || isContactPage;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(
    isOurStoryPage
      ? "OUR STORY"
      : isSignatureChaiPage
      ? "SIGNATURE CHAI"
      : isExperiencePage
      ? "EXPERIENCE"
      : isWhyUsPage
      ? "WHY US"
      : isContactPage
      ? "CONTACT"
      : "HOME"
  );
  const shouldReduceMotion = useReducedMotion();

  // Live IST Open Status (6:00 AM - 2:00 AM)
  const [mounted, setMounted] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkOpenStatus = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);
      const hours = istDate.getHours();
      // Open 6:00 AM to 2:00 AM daily
      const open = hours >= 6 || hours < 2;
      setIsOpenNow(open);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "HOME", href: isStandalonePage ? "/#home" : "#home", id: "home", isExternalPage: false },
    { name: "OUR STORY", href: "/our-story", id: "story", isExternalPage: true },
    { name: "SIGNATURE CHAI", href: "/signature-chai", id: "chai", isExternalPage: true },
    { name: "EXPERIENCE", href: "/experience", id: "experience", isExternalPage: true },
    { name: "WHY US", href: "/why-us", id: "why", isExternalPage: true },
    { name: "CONTACT", href: "/contact", id: "contact", isExternalPage: true },
  ];

  // Scroll & Active Section Sensing
  useEffect(() => {
    if (isOurStoryPage) {
      setActiveSection("OUR STORY");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (isSignatureChaiPage) {
      setActiveSection("SIGNATURE CHAI");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (isExperiencePage) {
      setActiveSection("EXPERIENCE");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (isWhyUsPage) {
      setActiveSection("WHY US");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (isContactPage) {
      setActiveSection("CONTACT");
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 25);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Detect active section on homepage
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        if (link.isExternalPage) continue;
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
  }, [isOurStoryPage, isSignatureChaiPage, isExperiencePage, isWhyUsPage, isContactPage]);

  const cinematicEase = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: cinematicEase }}
      className="fixed top-0 left-0 right-0 z-50 py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Ambient Oscillation Wrapper */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -2, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="w-full"
        >
          {/* Main Floating Glass Capsule */}
          <nav
            aria-label="Main Navigation"
            className={`w-full flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 transition-all duration-300 rounded-full relative overflow-hidden min-h-[64px] sm:min-h-[70px] ${
              isScrolled
                ? "py-2 bg-[#0D0806]/96 backdrop-blur-2xl border border-[#DFAB5F]/45 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(223,171,95,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                : "py-2.5 bg-[#120B08]/92 backdrop-blur-xl border border-[#C69247]/40 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_20px_rgba(198,146,71,0.1),inset_0_1px_1px_rgba(255,255,255,0.08)]"
            }`}
          >
            {/* Top Specular Rim Reflection */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#DFAB5F]/60 to-transparent pointer-events-none" />

            {/* Bottom Subtle Rim Glow */}
            <div className="absolute bottom-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-[#C69247]/25 to-transparent pointer-events-none" />

            {/* Polished Gold Light Sweep */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "250%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#DFAB5F]/15 to-transparent pointer-events-none -skew-x-12"
              />
            )}

            {/* Brand Logo with Concentric Gold Seal Emblem */}
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer shrink-0 z-10"
            >
              <div className="relative shrink-0">
                {/* Soft Ambient Golden Halo Behind Logo */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#DFAB5F]/50 via-[#C69247]/30 to-transparent blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.3, ease: cinematicEase }}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 aspect-square rounded-full border-2 border-[#DFAB5F] bg-[#160D09] p-0.5 shadow-[0_0_18px_rgba(223,171,95,0.45)] group-hover:border-[#F8D595] group-hover:shadow-[0_0_25px_rgba(223,171,95,0.7)] transition-all duration-300 relative z-10 overflow-hidden flex items-center justify-center shrink-0 ring-1 ring-[#DFAB5F]/30 ring-offset-2 ring-offset-[#120B08]"
                >
                  <img
                    src="/logo.png"
                    alt="Chai Da Adda Official Logo"
                    className="w-full h-full object-cover rounded-full aspect-square block"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col select-none">
                <span className="font-serif text-[13px] sm:text-[14px] font-bold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5EA] via-[#DFAB5F] to-[#E5BE7E] group-hover:from-white group-hover:to-[#DFAB5F] transition-all leading-tight drop-shadow-sm">
                  CHAI DA ADDA
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.28em] text-[#DFAB5F]/90 leading-tight flex items-center gap-1 mt-0.5">
                  <span>Good Tea • Better Vibes</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Spring Active Pill */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 z-10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                const isHovered = hoveredLink === link.name;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.2em] transition-colors group"
                  >
                    {/* Active Section Rounded Pill Indicator with Inner Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2C1910] via-[#20120B] to-[#2C1910] border border-[#DFAB5F]/75 shadow-[0_0_18px_rgba(223,171,95,0.3),inset_0_1px_2px_rgba(255,255,255,0.15)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}

                    {/* Navigation Link Text */}
                    <span
                      className={`relative z-10 transition-colors duration-250 flex items-center gap-1.5 font-medium ${
                        isActive
                          ? "text-[#DFAB5F] font-bold drop-shadow-[0_0_10px_rgba(223,171,95,0.5)]"
                          : isHovered
                          ? "text-[#DFAB5F]"
                          : "text-[#FBF6EE]/80"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DFAB5F] shadow-[0_0_8px_#DFAB5F] inline-block animate-pulse" />
                      )}
                      <span>{link.name}</span>
                    </span>

                    {/* Center-Outward Growing Thin Gold Underline on Hover */}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-[#DFAB5F] to-transparent origin-center transition-transform duration-300 ease-out z-10 ${
                        isHovered && !isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Group: Live Adda Status & Visit Adda Gold Pill CTA Button */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 z-10">
              {/* Live Operating Status Badge */}
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#180E09]/95 border border-[#C69247]/35 text-[10.5px] font-mono text-[#DFAB5F] shadow-inner">
                <span
                  className={`w-2 h-2 rounded-full ${
                    mounted && isOpenNow
                      ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"
                      : "bg-amber-400"
                  }`}
                />
                <span className="font-semibold tracking-wider">
                  {mounted && isOpenNow ? "OPEN NOW" : "6 AM–2 AM"}
                </span>
              </div>

              {/* Visit Adda Gold Pill Button */}
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#F3CE85] to-[#C69247] text-[#0D0806] font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_4px_25px_rgba(223,171,95,0.4)] hover:shadow-[0_0_30px_rgba(223,171,95,0.7)] hover:scale-[1.05] active:scale-[0.96] group overflow-hidden cursor-pointer"
              >
                {/* Continuous Shimmer Light Sweep */}
                <span className="absolute inset-0 w-1/2 bg-white/35 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />

                <Sparkles className="w-3.5 h-3.5 text-[#0D0806] opacity-90 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Visit Adda</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 relative z-10 stroke-[2.5]" />
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#DFAB5F]/45 text-[#FBF6EE] hover:text-[#DFAB5F] bg-[#1E130D] z-10 transition-all shadow-md active:bg-[#2A1910]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-[#DFAB5F]" /> : <Menu className="w-4.5 h-4.5" />}
            </motion.button>
          </nav>
        </motion.div>
      </div>

      {/* Mobile Glassmorphic Drawer with Smooth Downward Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: cinematicEase }}
            className="lg:hidden mt-3 mx-auto max-w-lg rounded-3xl bg-[#140C08]/98 border border-[#DFAB5F]/45 backdrop-blur-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(198,146,71,0.2)] p-5 space-y-4 pointer-events-auto"
          >
            {/* Live Status Header in Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-[#C69247]/25">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    mounted && isOpenNow
                      ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"
                      : "bg-amber-400"
                  }`}
                />
                <span className="text-[11.5px] font-mono font-bold text-[#DFAB5F] tracking-wide">
                  {mounted && isOpenNow ? "OPEN NOW • Fresh Dum Brewing" : "Open 6:00 AM – 2:00 AM Daily"}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#DFAB5F]/70 px-2 py-0.5 rounded-md bg-[#1C110B] border border-[#C69247]/30">
                Varanasi, UP
              </span>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1.5 pb-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                      isActive
                        ? "text-[#DFAB5F] bg-[#22140D] border border-[#DFAB5F]/50 font-bold shadow-inner"
                        : "text-[#FBF6EE]/85 hover:text-[#DFAB5F] hover:bg-[#1E130D]/70 active:scale-[0.98]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DFAB5F] shadow-[0_0_8px_#DFAB5F] animate-pulse" />}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons in Mobile Drawer */}
            <div className="pt-2 border-t border-[#C69247]/25 space-y-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#DFAB5F] via-[#F3CE85] to-[#C69247] text-[#0D0806] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#0D0806]" />
                <span>Visit The Adda</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



