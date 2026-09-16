"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ADDA_PILLARS } from "@/lib/data";
import { Flame, Sparkles, Sprout, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";

export function CraftHeritage() {
  const [activePillar, setActivePillar] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-6 h-6 text-emerald-400" />;
      case "ShieldAlert":
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case "Flame":
        return <Flame className="w-6 h-6 text-orange-500" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-amber-300" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="craft-heritage" className="relative py-24 md:py-32 bg-obsidian-light overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-clay-rust/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 4 Pillars of Craft</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-amber-50 tracking-tight leading-tight mb-5">
            Crafted with <span className="text-gold-gradient italic font-normal">Authentic Tradition</span>, Not Fast Food Machines
          </h2>
          <p className="text-base sm:text-lg text-amber-200/70 font-sans leading-relaxed">
            In a world of instant tea bags and synthetic syrup pumps, Chai Ka Adda honors the authentic Indian discipline of slow simmering, stone-crushed botanicals, and living terracotta clay.
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Pillar Selector Tabs (Left Col) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {ADDA_PILLARS.map((pillar, idx) => {
              const isSelected = activePillar === idx;
              return (
                <motion.div
                  key={pillar.id}
                  whileHover={{ x: 6 }}
                  onClick={() => setActivePillar(idx)}
                  className={`cursor-pointer p-5 rounded-2xl transition-all duration-300 border text-left ${
                    isSelected
                      ? "glass-panel-gold border-amber-400/60 bg-amber-950/30 gold-glow"
                      : "glass-panel border-amber-500/15 hover:border-amber-500/30 hover:bg-neutral-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-amber-500">
                      PILLAR {pillar.number}
                    </span>
                    <div className="p-2 rounded-xl glass-panel border-amber-500/20">
                      {getIcon(pillar.icon)}
                    </div>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-amber-100 mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-amber-300/60 font-sans">
                    {pillar.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Active Pillar Deep Dive Card (Right Col) */}
          <div className="lg:col-span-7">
            <div className="h-full glass-panel-gold rounded-3xl p-8 sm:p-10 border border-amber-500/30 relative flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Background watermark */}
              <div className="absolute -bottom-10 -right-10 text-[180px] font-serif font-bold text-amber-500/5 select-none pointer-events-none">
                {ADDA_PILLARS[activePillar].number}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg">
                    <div className="w-full h-full bg-obsidian rounded-[14px] flex items-center justify-center">
                      {getIcon(ADDA_PILLARS[activePillar].icon)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                      Craft Protocol #{ADDA_PILLARS[activePillar].number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-amber-50">
                      {ADDA_PILLARS[activePillar].title}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-amber-100/90 font-sans leading-relaxed mb-8">
                  {ADDA_PILLARS[activePillar].description}
                </p>

                {/* Key Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {[
                    "Zero Industrial Essence or Concentrates",
                    "Hand-Inspected Batch Calibration",
                    "A2 Gir Cow Milk & Artisanal Oat/Almond Options",
                    "100% Recyclable / Bio-Degradable Terracotta",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-amber-200/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stat Callout */}
              <div className="pt-6 border-t border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient">
                    {ADDA_PILLARS[activePillar].stat}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
                    {ADDA_PILLARS[activePillar].statLabel}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-amber-300/60 block">Daily Handcrafting</span>
                  <span className="text-sm font-semibold text-amber-100">Varanasi • Delhi • Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
