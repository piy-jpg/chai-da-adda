"use client";

import React from "react";
import { motion } from "framer-motion";
import { COMPARISON_DATA } from "@/lib/data";
import { Check, X, Sparkles, Shield, Award, HeartHandshake, Leaf } from "lucide-react";

export function WhyChooseUs() {
  const metrics = [
    { value: "500K+", label: "Kulhads Served", icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
    { value: "24K", label: "Pure Mogra Saffron", icon: <Award className="w-5 h-5 text-amber-400" /> },
    { value: "0%", label: "Artificial Flavors", icon: <Shield className="w-5 h-5 text-emerald-400" /> },
    { value: "100%", label: "Biodegradable Clay", icon: <Leaf className="w-5 h-5 text-lime-400" /> },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 md:py-32 bg-obsidian-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>The Adda Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-50 leading-tight mb-4">
            Why Discerning Tea Lovers Choose <span className="text-gold-gradient italic font-normal">Chai Ka Adda</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-200/70 font-sans">
            We rejected industrial shortcuts, microplastic cups, and chemical syrups to restore the sacred majesty of pure Indian chai.
          </p>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  {m.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient mb-1">
                {m.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-300/70">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 overflow-hidden shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-serif text-amber-100">
              The Transparent Quality Standard
            </h3>
            <p className="text-xs text-amber-300/60 mt-1 font-sans">
              Side-by-side comparison of ordinary commercial chai vs our authentic artisanal process
            </p>
          </div>

          <div className="space-y-4">
            {COMPARISON_DATA.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-black/40 border border-amber-500/10 items-center hover:border-amber-400/30 transition-colors"
              >
                <div className="md:col-span-4 text-sm font-semibold text-amber-100 font-serif">
                  {row.feature}
                </div>

                {/* Ordinary */}
                <div className="md:col-span-4 flex items-start gap-2 text-xs text-neutral-400">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{row.ordinary}</span>
                </div>

                {/* Chai Ka Adda */}
                <div className="md:col-span-4 flex items-start gap-2 text-xs text-amber-200 font-medium">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{row.chaiKaAdda}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs text-amber-200/80">
                100% Sourced with Fair-Trade Transparency from Upper Assam & Kashmir
              </span>
            </div>
            <a
              href="#adda-locations"
              className="px-6 py-2.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 border border-amber-400/30 transition-colors"
            >
              Taste The Difference Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
