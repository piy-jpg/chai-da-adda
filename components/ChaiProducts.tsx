"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowUpRight, Play, Pause, Flame } from "lucide-react";

export interface SignatureChaiItem {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  notes: string[];
  accent: string;
}

export const SIGNATURE_CHAIS: SignatureChaiItem[] = [
  {
    id: "masala-chai",
    name: "Masala Chai",
    hindiName: "मसाला चाय",
    tagline: "Aromatic spices with bold Indian character.",
    description: "Hand-pounded black pepper, clove, cinnamon, and ginger simmered slowly with strong Assam CTC leaf. Robust, earthy and warming.",
    price: 140,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=85",
    badge: "Bestseller",
    notes: ["Clove & Cinnamon", "Assam CTC", "Varanasi Kulhad"],
    accent: "from-amber-600/30 to-amber-950/10",
  },
  {
    id: "adrak-chai",
    name: "Adrak Chai",
    hindiName: "अदरक चाय",
    tagline: "Fresh mountain ginger with a fiery soothing finish.",
    description: "Crushed mountain ginger roots simmered until fiery and soothing, paired with rich whole milk. The ultimate monsoon comfort.",
    price: 130,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=85",
    badge: "Adda Favorite",
    notes: ["Crushed Ginger", "Bold Heat", "Digestive Warmth"],
    accent: "from-orange-600/30 to-amber-950/10",
  },
  {
    id: "elaichi-chai",
    name: "Elaichi Chai",
    hindiName: "इलायची चाय",
    tagline: "Fragrant cardamom with a velvety floral finish.",
    description: "Whole green cardamom pods from the hills of Idukki crushed fresh per order. Delicately sweet, floral and velvety smooth.",
    price: 130,
    badge: "Aromatic",
    notes: ["Idukki Cardamom", "Floral Aroma", "Velvet Texture"],
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&auto=format&fit=crop&q=85",
    accent: "from-amber-700/30 to-neutral-950/10",
  },
  {
    id: "kesar-chai",
    name: "Kesar Chai",
    hindiName: "केसर चाय",
    tagline: "Rich saffron for a royal slow-simmered experience.",
    description: "Pure Mogra saffron strands from Pampore infused into rich caramelized full-cream milk and golden Assam tips. A royal indulgence.",
    price: 180,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85",
    badge: "Royal Special",
    notes: ["24K Kashmiri Kesar", "Caramelized Dum", "Golden Tips"],
    accent: "from-yellow-600/30 to-amber-950/10",
  },
];

export function ChaiProducts() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Duplicate items 3x for a seamless infinite running loop
  const runningItems = [
    ...SIGNATURE_CHAIS,
    ...SIGNATURE_CHAIS,
    ...SIGNATURE_CHAIS,
  ];

  return (
    <section id="chai" className="relative py-16 md:py-24 bg-[#0A0604] overflow-hidden film-grain select-none">
      {/* Animated Floating Amber Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 14 + 6) % 100}%`,
              y: "110%",
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0.8, 0],
              scale: [0.8, 1.3, 0.9],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.2,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#DFAB5F]/60 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-l from-[#C69247]/10 via-[#A84924]/8 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Crisp Header with Running Track Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/80 backdrop-blur-md text-[#DFAB5F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-[#DFAB5F] animate-spin" style={{ animationDuration: "10s" }} />
              <span>Signature Brews</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EE] leading-tight"
            >
              Four Crafted <span className="text-gold-gradient italic font-normal">Icons</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm text-[#D8CCC0] font-sans font-light mt-1.5"
            >
              Every cup is slow-simmered in brass handis and poured fresh into unglazed earthen terracotta kulhads.
            </motion.p>
          </div>

          {/* Running Track Controls & Menu Link */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full border border-[#C69247]/30 bg-[#1E130D] text-[#DFAB5F] hover:bg-[#C69247]/20 transition-colors shadow-sm"
              title={isPaused ? "Resume Running Track" : "Pause Running Track"}
            >
              {isPaused ? <Play className="w-3 h-3 fill-[#DFAB5F]" /> : <Pause className="w-3 h-3" />}
            </button>

            <a
              href="#visit"
              className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold tracking-[0.16em] text-[#DFAB5F] hover:text-[#FBF6EE] transition-colors group"
            >
              <span>Taste At The Adda</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Infinite Continuous Running Horizontal Track */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#0A0604] via-[#0A0604]/85 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#0A0604] via-[#0A0604]/85 to-transparent z-20 pointer-events-none" />

        {/* Continuous Running Animation Track */}
        <div
          className={`flex gap-5 sm:gap-6 w-max ${
            isPaused ? "animate-none" : "animate-marquee-rtl"
          }`}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: "42s",
          }}
        >
          {runningItems.map((chai, idx) => {
            const isHovered = hoveredId === `${chai.id}-${idx}`;

            return (
              <div
                key={`${chai.id}-${idx}`}
                onMouseEnter={() => setHoveredId(`${chai.id}-${idx}`)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-[280px] sm:w-[320px] p-5 rounded-3xl bg-gradient-to-br from-[#1E130D]/95 via-[#140C08]/98 to-[#0A0604] border border-[#C69247]/30 hover:border-[#DFAB5F] backdrop-blur-xl shadow-xl hover:shadow-[0_20px_45px_rgba(198,146,71,0.25)] hover:scale-105 transition-all duration-400 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing relative shrink-0 group"
              >
                {/* Dynamic Radial Ambient Light Halo on Hover */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${chai.accent} rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
                    isHovered ? "scale-150 opacity-100" : "opacity-40"
                  }`}
                />

                {/* Animated Running Border Beam */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-transparent via-[#DFAB5F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Image Container with Zoom & Badge */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3.5 border border-[#C69247]/20 bg-[#140C08]">
                    <img
                      src={chai.image}
                      alt={chai.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806]/85 via-transparent to-transparent" />

                    {chai.badge && (
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-[#0D0806]/90 text-[#DFAB5F] border border-[#C69247]/40 backdrop-blur-md shadow-md">
                        {chai.badge}
                      </div>
                    )}
                  </div>

                  {/* Hindi & English Name */}
                  <div className="text-[10px] font-serif text-[#DFAB5F]/80 mb-0.5">
                    {chai.hindiName}
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors mb-1 leading-snug">
                    {chai.name}
                  </h3>

                  <p className="text-xs font-sans text-[#D8CCC0]/85 font-light leading-relaxed mb-3 line-clamp-2">
                    {chai.tagline}
                  </p>

                  {/* Notes Pills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {chai.notes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-[#1E130D] text-[#DFAB5F] border border-[#C69247]/20 group-hover:border-[#DFAB5F]/40 transition-colors"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 border-t border-[#C69247]/15 flex items-center justify-between relative z-10">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[#D8CCC0]/60 block">
                      Varanasi Kulhad
                    </span>
                    <span className="text-xl font-serif font-bold text-gold-gradient">
                      ₹{chai.price}
                    </span>
                  </div>

                  <a
                    href="#visit"
                    className="px-4 py-1.5 rounded-full border border-[#C69247]/40 bg-[#1E130D]/90 group-hover:bg-[#C69247] text-[#FBF6EE] group-hover:text-[#0D0806] text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 shadow-md"
                  >
                    <span>Order</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
