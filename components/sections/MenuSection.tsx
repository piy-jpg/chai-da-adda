"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FULL_MENU, MenuItem } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import { Search, Plus, Eye, Sparkles, Filter, Check, Star } from "lucide-react";

export function MenuSection() {
  const { addItem, openQuickView } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDietary, setSelectedDietary] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Offerings" },
    { id: "signature", label: "Signature Chais" },
    { id: "kahwa", label: "Royal Kahwas" },
    { id: "bakery", label: "Irani Bakery" },
    { id: "street-bites", label: "Adda Street Bites" },
    { id: "artisanal-tins", label: "Artisanal Tins & Potlis" },
  ];

  const dietaryFilters = [
    { id: "all", label: "All Diets" },
    { id: "chef-special", label: "Chef Special" },
    { id: "pure-ghee", label: "Pure Desi Ghee" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten Free" },
  ];

  const filteredItems = FULL_MENU.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesDietary =
      selectedDietary === "all" ||
      item.dietary.includes(selectedDietary as MenuItem["dietary"][number]);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hindiName && item.hindiName.includes(searchQuery)) ||
      item.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesDietary && matchesSearch;
  });

  return (
    <section id="full-menu" className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Complete Adda Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-50 leading-tight mb-4">
            Artisanal <span className="text-gold-gradient italic font-normal">Chais & Street Delights</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-200/70 font-sans">
            From slow-boiled brass handi elixirs to butter-drenched bun maska and single-estate souvenir tins.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-amber-500/20 mb-10 space-y-4">
          {/* Top Row: Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              placeholder="Search by chai name, spice, saffron, bun maska, samosa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/60 border border-amber-500/20 text-amber-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400/60 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-black shadow-md"
                    : "glass-panel border-amber-500/20 text-amber-200/70 hover:text-amber-100 hover:border-amber-400/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-amber-500/10 text-xs">
            <span className="text-neutral-400 flex items-center gap-1 font-mono text-[11px] uppercase mr-2">
              <Filter className="w-3 h-3 text-amber-400" /> Filter:
            </span>
            {dietaryFilters.map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedDietary === diet.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-5 border border-amber-500/15 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between hover:bg-neutral-900/40 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {item.badge ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        {item.category}
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-amber-300">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {item.hindiName && (
                    <div className="text-xs font-serif text-amber-400/70 mb-0.5">
                      {item.hindiName}
                    </div>
                  )}

                  <h3 className="text-lg font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
                    {item.name}
                  </h3>

                  <p className="text-xs text-amber-200/60 font-sans line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300/60"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-serif font-bold text-amber-100">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openQuickView(item)}
                      title="Inspect Tasting Notes"
                      className="p-2 rounded-xl text-neutral-400 hover:text-amber-200 hover:bg-neutral-800 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => addItem(item)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-transform active:scale-95 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-base">No items found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDietary("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-amber-400 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
