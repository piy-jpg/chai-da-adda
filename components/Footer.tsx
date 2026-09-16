"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, MessageCircle, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060403] border-t border-[#C69247]/20 pt-14 pb-10 overflow-hidden text-[#D8CCC0] text-xs font-sans select-none">
      {/* Animated Floating Background Particle Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 16 + 6) % 100}%`,
              y: "110%",
              opacity: 0,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0.8, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.3,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#DFAB5F]/40 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Atmospheric Amber Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-b from-[#C69247]/8 via-[#A84924]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Main 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#C69247]/15">
          {/* Col 1: Brand & Heritage (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <motion.div whileHover={{ x: 2 }} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#C69247]/40 bg-[#1E130D] flex items-center justify-center text-[#DFAB5F] shadow-inner">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-[0.18em] text-[#FBF6EE]">
                CHAI KA ADDA
              </span>
            </motion.div>

            <p className="font-serif text-sm sm:text-base italic text-[#DFAB5F]/90 font-light">
              &ldquo;Chai. Conversations. Memories.&rdquo;
            </p>

            <p className="text-xs text-[#D8CCC0]/80 leading-relaxed max-w-sm font-sans font-light">
              Reclaiming the timeless warmth of Indian tea stalls. Slow brass handi brewing, 100% whole single-estate leaves, and kiln-baked Varanasi earthen terracotta.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[#C69247]/25 bg-[#140C08] text-[#DFAB5F] hover:bg-[#C69247] hover:text-[#0D0806] transition-all duration-300 shadow-md"
                aria-label="Follow Chai Ka Adda on Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href="https://wa.me/917300212948"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[#25D366]/30 bg-[#140C08] text-[#25D366] hover:bg-[#25D366] hover:text-[#0D0806] transition-all duration-300 shadow-md"
                aria-label="Chat with Chai Ka Adda on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#FBF6EE] uppercase tracking-wider flex items-center gap-1.5">
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#D8CCC0]/80">
              <li><a href="#home" className="hover:text-[#DFAB5F] transition-colors">Home</a></li>
              <li><a href="#story" className="hover:text-[#DFAB5F] transition-colors">Our Story</a></li>
              <li><a href="#chai" className="hover:text-[#DFAB5F] transition-colors">Signature Chai</a></li>
              <li><a href="#experience" className="hover:text-[#DFAB5F] transition-colors">The Experience</a></li>
              <li><a href="#why" className="hover:text-[#DFAB5F] transition-colors">Why Us</a></li>
              <li><a href="#visit" className="hover:text-[#DFAB5F] transition-colors">Visit The Adda</a></li>
            </ul>
          </div>

          {/* Col 3: Single Flagship Sanctuary (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#FBF6EE] uppercase tracking-wider">
              Flagship Sanctuary
            </h4>
            <div className="space-y-1.5 text-xs text-[#D8CCC0]/80">
              <strong className="text-[#FBF6EE] block">Chai Ka Adda • New Delhi</strong>
              <p className="leading-relaxed text-[11px]">Plot 18, Heritage Courtyard, Inner Circle, Connaught Place</p>
              <p className="text-[10px] font-mono text-[#DFAB5F]">📍 Near Central Park Gate 3</p>
              <p className="text-[10px] font-mono text-[#DFAB5F]">
                📞 <a href="tel:+917300212948" className="hover:underline">+91 73002 12948</a>
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-[#121B14] px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Open Daily • 6 AM – 2 AM
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Craft Pillars & Certifications (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#FBF6EE] uppercase tracking-wider">
              Craft Pillars
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#140C08]/90 border border-[#C69247]/20">
                <span className="text-base">🏺</span>
                <span className="text-[11px] text-[#FBF6EE]">100% Varanasi Terracotta</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#140C08]/90 border border-[#C69247]/20">
                <span className="text-base">🌿</span>
                <span className="text-[11px] text-[#FBF6EE]">Single-Estate Assam Leaf</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#140C08]/90 border border-[#C69247]/20">
                <span className="text-base">🔥</span>
                <span className="text-[11px] text-[#FBF6EE]">25-Min Slow Handi Dum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D8CCC0]/60">
          <p>© {new Date().getFullYear()} CHAI KA ADDA. All rights reserved.</p>

          <p className="flex items-center gap-1.5 text-[#DFAB5F]/80">
            <span>Brewed with love & tradition in India</span>
            <Heart className="w-3.5 h-3.5 fill-[#DFAB5F] text-[#DFAB5F] inline animate-pulse" />
          </p>

          {/* Back to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[11px] font-mono text-[#DFAB5F] hover:text-[#FBF6EE] transition-colors p-1.5 rounded-lg bg-[#140C08] border border-[#C69247]/25 cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
