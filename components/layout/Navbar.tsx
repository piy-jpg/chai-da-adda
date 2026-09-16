"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ShoppingBag, Calendar, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { chaiAmbience } from "@/lib/audioAmbience";

export function Navbar() {
  const { totalCount, setIsOpen, setIsReservationOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const active = chaiAmbience.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { name: "Adda Craft", href: "#craft-heritage" },
    { name: "Signature Brews", href: "#featured-brews" },
    { name: "Flavor Finder", href: "#chai-alchemist" },
    { name: "Artisanal Menu", href: "#full-menu" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Locations", href: "#adda-locations" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-obsidian/90 backdrop-blur-xl border-b border-amber-500/20 py-3.5 shadow-2xl shadow-black/80"
          : "bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-obsidian rounded-[10px] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-amber-100 flex items-center gap-1.5">
              CHAI KA <span className="text-gold-gradient">ADDA</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/80 font-mono -mt-1">
              Authentic Indian Chai
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-amber-200/70 hover:text-amber-300 transition-colors relative py-1 group tracking-wide"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Sound Ambience Button */}
          <button
            onClick={toggleSound}
            title={isAudioActive ? "Mute Chai Stall Ambience" : "Play Chai Stall Ambience"}
            className={`hidden sm:flex p-2 rounded-full border transition-all duration-300 items-center justify-center ${
              isAudioActive
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300 gold-glow"
                : "border-amber-500/20 text-amber-400/60 hover:text-amber-200 hover:border-amber-500/40"
            }`}
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Table Reservation Button */}
          <button
            onClick={() => setIsReservationOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-amber-500/30 text-xs font-semibold text-amber-200 hover:text-amber-100 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Table</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 transition-all duration-300 active:scale-95 shadow-md flex items-center justify-center"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 border-2 border-obsidian text-white text-[10px] font-bold flex items-center justify-center shadow"
              >
                {totalCount}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-panel border-amber-500/20 text-amber-200 hover:text-amber-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-panel border-b border-amber-500/30 overflow-hidden bg-obsidian/95 backdrop-blur-2xl"
          >
            <div className="px-5 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-amber-100 hover:text-amber-400 py-1.5 transition-colors border-b border-amber-500/10"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsReservationOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve an Adda Table</span>
                </button>

                <button
                  onClick={toggleSound}
                  className="w-full py-2.5 rounded-xl glass-panel border-amber-500/30 text-amber-300 text-xs flex items-center justify-center gap-2"
                >
                  {isAudioActive ? <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                  <span>{isAudioActive ? "Atmosphere Audio On" : "Enable Chai Stall Sound"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
