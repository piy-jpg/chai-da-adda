"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Flame, Crown, Snowflake, Cookie, Sparkles } from "lucide-react";

interface MenuItemEntry {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  badge?: string;
  tag?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  icon: typeof Flame;
  items: MenuItemEntry[];
}

export const CAFE_MENU: MenuCategory[] = [
  {
    id: "classic-chai",
    name: "Classic Chai",
    icon: Flame,
    items: [
      {
        id: "c1",
        name: "Kulhad Masala Chai",
        hindiName: "कुल्हड़ मसाला चाय",
        description: "Assam CTC simmered with crushed ginger, black pepper, cardamom, clove & cinnamon.",
        price: 140,
        badge: "Bestseller",
        tag: "Kadak",
      },
      {
        id: "c2",
        name: "Kadak Adrak Chai",
        hindiName: "कड़क अदरक चाय",
        description: "Fresh-crushed mountain ginger slow-boiled with rich whole milk.",
        price: 130,
        tag: "Ginger",
      },
      {
        id: "c3",
        name: "Idukki Elaichi Chai",
        hindiName: "इडुक्की इलायची चाय",
        description: "Green cardamom pods crushed fresh with velvety sweet milk finish.",
        price: 130,
        tag: "Aromatic",
      },
      {
        id: "c4",
        name: "Cutting Tapri Chai",
        hindiName: "कटिंग टपरी चाय",
        description: "Street-style intense double decoction brew in a traditional cutting glass.",
        price: 90,
        tag: "Tapri Brew",
      },
    ],
  },
  {
    id: "special-chai",
    name: "Special Chai",
    icon: Crown,
    items: [
      {
        id: "s1",
        name: "Shahi Kesar Dum Chai",
        hindiName: "शाही केसर दम चाय",
        description: "24K Kashmiri Mogra saffron, green cardamom, mace, and caramelized dum milk.",
        price: 180,
        badge: "Chef's Special",
        tag: "Royal",
      },
      {
        id: "s2",
        name: "Kashmiri Shahi Kahwa",
        hindiName: "कश्मीरी शाही कहवा",
        description: "Samovar green tea with saffron strands, slivered almonds, rose petals & cinnamon.",
        price: 210,
        badge: "Royal",
        tag: "Samovar",
      },
      {
        id: "s3",
        name: "Irani Karak Malai Chai",
        hindiName: "ईरानी कड़क मलाई चाय",
        description: "Slow decoction with condensed milk, topped with thick clotted malai.",
        price: 160,
        tag: "Rich Malai",
      },
      {
        id: "s4",
        name: "Pahari Lemongrass Tisane",
        hindiName: "पहाड़ी लेमनग्रास टिसेन",
        description: "Himalayan lemongrass steeped with liquorice root (Mulethi). Milk-free.",
        price: 150,
        tag: "Herbal",
      },
    ],
  },
  {
    id: "cold-beverages",
    name: "Cold Beverages",
    icon: Snowflake,
    items: [
      {
        id: "b1",
        name: "Iced Masala Chai Latte",
        hindiName: "आइस मसाला चाय",
        description: "Cold-shaken spiced chai concentrate with creamy whole milk over crushed ice.",
        price: 170,
        badge: "Summer Hit",
        tag: "Chilled",
      },
      {
        id: "b2",
        name: "Kesar Badam Thandai",
        hindiName: "केसर बादाम ठंडाई",
        description: "Stone-ground almonds, fennel, poppy seeds, black pepper, and chilled saffron milk.",
        price: 190,
        tag: "Heritage",
      },
      {
        id: "b3",
        name: "Himalayan Peach Iced Tea",
        hindiName: "पीच आइस्ड टी",
        description: "First-flush Darjeeling orthodox tea cold-brewed with wild peach nectar & mint.",
        price: 160,
        tag: "First Flush",
      },
      {
        id: "b4",
        name: "Spiced Rooh Afza Mojito",
        hindiName: "रूह अफ़ज़ा मोजितो",
        description: "Old Delhi rose herb cooler with crushed mint, roasted jeera, lime & sparkling soda.",
        price: 150,
        tag: "Cooler",
      },
    ],
  },
  {
    id: "snacks",
    name: "Snacks & Bites",
    icon: Cookie,
    items: [
      {
        id: "k1",
        name: "Truffle & Amul Bun Maska",
        hindiName: "अमूल बन मस्का",
        description: "Warm brioche bun loaded with hand-whipped salted Amul butter.",
        price: 110,
        badge: "Classic Pairing",
        tag: "Fresh Bake",
      },
      {
        id: "k2",
        name: "Kulhad Samosa Chaat",
        hindiName: "कुल्हड़ समोसा चाट",
        description: "Crushed potato samosas in clay bowl with pindi chole, sweet dahi & imli chutney.",
        price: 190,
        badge: "Crowd Favorite",
        tag: "Street Style",
      },
      {
        id: "k3",
        name: "Pista Desi Ghee Nankhatai (4 Pcs)",
        hindiName: "शाही पिस्ता नानखटाई",
        description: "Traditional shortbread baked in slow wood oven with pure cow ghee.",
        price: 150,
        tag: "Wood Oven",
      },
      {
        id: "k4",
        name: "Tandoori Paneer Sliders (2 Pcs)",
        hindiName: "तंदूरी पनीर स्लाइडर",
        description: "Clay-oven smoked cottage cheese with sirka pyaz and mint coriander emulsion.",
        price: 240,
        tag: "Tandoori",
      },
    ],
  },
];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("classic-chai");

  const activeData = CAFE_MENU.find((cat) => cat.id === activeCategory) || CAFE_MENU[0];

  return (
    <section id="menu" className="relative py-16 md:py-22 bg-[#0A0604] overflow-hidden film-grain select-none">
      {/* Subtle Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#C69247]/10 via-[#A84924]/8 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header - Crisp & Snug */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/80 backdrop-blur-md text-[#DFAB5F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2 shadow-sm"
          >
            <Utensils className="w-3 h-3 text-[#DFAB5F]" />
            <span>CAFÉ MENU</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EE] leading-tight mb-2 tracking-tight"
          >
            Artisanal <span className="text-gold-gradient italic font-normal">Chais & Bites</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#D8CCC0] font-sans font-light"
          >
            Brewed fresh to order. Pair your favorite cup with warm buttered buns or oven-baked nankhatais.
          </motion.p>
        </div>

        {/* Category Tabs - Sleek Minimal Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {CAFE_MENU.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "text-[#0D0806] font-bold shadow-lg shadow-[#C69247]/20 scale-105"
                    : "text-[#D8CCC0] hover:text-[#FBF6EE] border border-[#C69247]/20 bg-[#140C08]/90 hover:border-[#DFAB5F]/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-crisp-menu-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C69247] via-[#DFAB5F] to-[#C69247]"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0D0806]" : "text-[#DFAB5F]"}`} />
                  <span>{cat.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Crisp Menu Board */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E130D]/90 via-[#140C08]/95 to-[#0A0604] border border-[#C69247]/30 backdrop-blur-xl shadow-2xl"
          >
            {/* Crisp 2-Column Item Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {activeData.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  whileHover={{ x: 2 }}
                  className="pb-4 border-b border-[#C69247]/15 flex flex-col justify-between group"
                >
                  {/* Top Row: Name, Hindi Subtitle, Leader Line, Price */}
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <h4 className="text-sm sm:text-base font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors truncate">
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider bg-[#C69247]/20 text-[#DFAB5F] border border-[#C69247]/40 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="font-serif font-bold text-sm sm:text-base text-gold-gradient shrink-0">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Description & Mini Tag */}
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <p className="text-[#D8CCC0]/80 font-sans font-light text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.tag && (
                      <span className="text-[9px] font-mono text-[#DFAB5F]/70 shrink-0 hidden sm:inline">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="pt-5 mt-2 flex items-center justify-between text-[11px] text-[#D8CCC0]/70 font-sans">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DFAB5F]" />
                Served in authentic unglazed Varanasi terracotta kulhads
              </span>
              <span className="font-mono text-[#DFAB5F] text-[10px]">Taxes included</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
