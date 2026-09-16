"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Award } from "lucide-react";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[currentIndex];

  const pressPartners = [
    "VOGUE INDIA",
    "ARCHITECTURAL DIGEST",
    "MASTERCHEF INDIA",
    "THE HINDU",
    "CONDE NAST TRAVELLER",
  ];

  return (
    <section className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Quote className="w-3.5 h-3.5" />
            <span>The Connoisseur Verdict</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-50 leading-tight">
            Loved by <span className="text-gold-gradient italic font-normal">Masters of Taste</span>
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-amber-500/30 relative overflow-hidden shadow-2xl mb-16">
          <Quote className="w-16 h-16 text-amber-500/15 absolute top-6 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 to-amber-700 shadow-xl overflow-hidden">
                  <img
                    src={active.avatar}
                    alt={active.author}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-500 text-black shadow">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {/* Quote & Author Info */}
              <div className="flex-1">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg sm:text-2xl font-serif italic text-amber-100/90 leading-relaxed mb-6">
                  "{active.quote}"
                </p>

                <div>
                  <h4 className="text-lg font-serif font-bold text-amber-200">
                    {active.author}
                  </h4>
                  <p className="text-xs text-amber-400/80 font-mono">
                    {active.role} • {active.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-amber-500/20">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? "w-8 bg-amber-400" : "w-2 bg-neutral-700"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-full glass-panel border-amber-500/30 text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-full glass-panel border-amber-500/30 text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Press Logotypes */}
        <div className="pt-8 border-t border-amber-500/10 text-center">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-500 block mb-6">
            Featured In Leading Publications
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all">
            {pressPartners.map((press, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm font-serif tracking-widest text-amber-200/60 font-semibold"
              >
                {press}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
