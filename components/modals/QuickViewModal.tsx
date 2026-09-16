"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cartContext";
import { X, Plus, Star, Flame, Clock, Sparkles, Coffee, ShieldCheck, Heart } from "lucide-react";

export function QuickViewModal() {
  const { isQuickViewOpen, quickViewItem, closeQuickView, addItem } = useCart();

  if (!quickViewItem) return null;

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="pointer-events-auto w-full max-w-xl glass-panel-gold rounded-3xl border border-amber-500/40 p-6 sm:p-8 bg-obsidian/95 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={closeQuickView}
                className="absolute top-5 right-5 p-2 rounded-xl glass-panel text-neutral-400 hover:text-amber-200"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Badge & Category */}
              <div className="flex items-center gap-2 mb-3">
                {quickViewItem.badge && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {quickViewItem.badge}
                  </span>
                )}
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  {quickViewItem.category}
                </span>
              </div>

              {/* Names */}
              {quickViewItem.hindiName && (
                <div className="text-sm font-serif text-amber-400/80 mb-1">
                  {quickViewItem.hindiName}
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mb-3">
                {quickViewItem.name}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-neutral-300 font-mono">
                  {quickViewItem.rating} / 5.0 ({quickViewItem.reviewCount} connoisseurs)
                </span>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-amber-100/85 font-sans leading-relaxed mb-6">
                {quickViewItem.description}
              </p>

              {/* Tasting Profile Card */}
              <div className="glass-panel p-4 rounded-2xl border-amber-500/20 mb-6 space-y-3">
                <div className="text-[11px] uppercase tracking-wider font-mono text-amber-400">
                  Craft Formulation Details
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Prep Method</span>
                    <span className="text-amber-200 font-semibold">{quickViewItem.prepTime}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Caffeine Factor</span>
                    <span className="text-emerald-300 font-semibold">{quickViewItem.caffeine}</span>
                  </div>
                  {quickViewItem.calories && (
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Caloric Energy</span>
                      <span className="text-amber-200 font-semibold">{quickViewItem.calories}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Perfect Pairing</span>
                    <span className="text-amber-200 font-semibold">{quickViewItem.pairing}</span>
                  </div>
                </div>
              </div>

              {/* Full Ingredients Pills */}
              <div className="mb-6">
                <div className="text-[11px] uppercase font-mono text-amber-400/80 mb-2">
                  Key Spices & Ingredients:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewItem.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-black/60 text-amber-200/90 border border-amber-500/20 text-xs"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-gold-gradient">
                      ₹{quickViewItem.price}
                    </span>
                    {quickViewItem.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through">
                        ₹{quickViewItem.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    addItem(quickViewItem);
                    closeQuickView();
                  }}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to Order Bag</span>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
