"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SIGNATURE_BREWS, MenuItem } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import { Sparkles, Plus, Eye, Flame, Clock, Award, Star } from "lucide-react";

export function SignatureBrews() {
  const { addItem, openQuickView } = useCart();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="featured-brews" className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Imperial Adda Selection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-amber-50 leading-tight">
              Signature <span className="text-gold-gradient italic font-normal">Royal Brews</span>
            </h2>
            <p className="text-base sm:text-lg text-amber-200/70 font-sans mt-3">
              Each cup is formulated with precise spice ratios, single-estate leaves, and simmered for over 25 minutes in handcrafted brass urns.
            </p>
          </div>

          <a
            href="#full-menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
          >
            <span>View Complete Menu</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Brew Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIGNATURE_BREWS.map((item: MenuItem, index: number) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-3xl glass-panel border border-amber-500/20 hover:border-amber-400/50 transition-all duration-500 p-6 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-amber-950/50"
              >
                {/* Background Accent Sheen */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[70px] pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-60"
                  style={{ backgroundColor: item.accentColor }}
                />

                <div>
                  {/* Top Bar: Badge & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    {item.badge ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-amber-400/60 uppercase">
                        Adda Selection
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-black/40 px-2.5 py-1 rounded-full border border-amber-500/10">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{item.rating}</span>
                      <span className="text-neutral-500">({item.reviewCount})</span>
                    </div>
                  </div>

                  {/* Hindi & English Names */}
                  {item.hindiName && (
                    <div className="text-xs font-serif text-amber-400/70 mb-1">
                      {item.hindiName}
                    </div>
                  )}
                  <h3 className="text-2xl font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-amber-200/70 font-sans leading-relaxed mb-6">
                    {item.tagline}
                  </p>

                  {/* Spice & Heat Metrics */}
                  <div className="glass-panel p-3 rounded-xl border-amber-500/15 mb-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-300/70 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" /> Spiciness
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className={`w-2 h-2 rounded-full ${
                              lvl <= item.spiciness
                                ? "bg-orange-500"
                                : "bg-neutral-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-300/70 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" /> Slow Dum
                      </span>
                      <span className="font-mono text-amber-200 font-semibold">
                        {item.prepTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-300/70 flex items-center gap-1">
                        <Award className="w-3 h-3 text-emerald-400" /> Caffeine
                      </span>
                      <span className="font-mono text-emerald-300 font-semibold">
                        {item.caffeine}
                      </span>
                    </div>
                  </div>

                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-900/80 text-amber-300/80 border border-amber-500/10"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-neutral-500 font-mono">
                        +{item.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 block">Price / Kulhad</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-bold text-amber-100">
                        ₹{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openQuickView(item)}
                      title="Inspect Tasting Notes"
                      className="p-2.5 rounded-xl glass-panel border-amber-500/30 text-amber-300 hover:text-amber-100 hover:border-amber-400 hover:bg-amber-500/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => addItem(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs transition-all active:scale-95 shadow-lg"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
