"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, MessageCircle } from "lucide-react";

interface ChaiMatch {
  name: string;
  hindi: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  spices: string[];
  vibe: string;
  matchScore: string;
}

const CHAI_DATABASE: Record<string, ChaiMatch> = {
  masala: {
    name: "Maharaja Masala Chai",
    hindi: "मसाला चाय",
    tagline: "Bold Indian Character & 18 Hand-Crushed Spices",
    description: "Slow-simmered with cloves, cinnamon bark, black pepper, and whole ginger in single-estate Assam CTC leaves.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=85",
    price: "₹140",
    spices: ["Clove & Cinnamon", "Assam CTC", "Varanasi Kulhad"],
    vibe: "Energizing • Bold • Classic",
    matchScore: "99% Match",
  },
  adrak: {
    name: "Pahadi Adrak Chai",
    hindi: "अदरक चाय",
    tagline: "Crushed Mountain Ginger with a Fiery Soothing Finish",
    description: "Stone-crushed fresh ginger root boiled vigorously with rich buffalo milk and caramelized whole jaggery.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=85",
    price: "₹130",
    spices: ["Crushed Ginger", "Bold Heat", "Digestive Warmth"],
    vibe: "Soothing • Cozy • Immunity",
    matchScore: "98% Match",
  },
  elaichi: {
    name: "Idukki Elaichi Chai",
    hindi: "इलायची चाय",
    tagline: "Fragrant Green Cardamom with a Velvety Floral Aroma",
    description: "Freshly podded Idukki green cardamom slow-infused into creamy milk tea, creating an unmatched sweet soothing fragrance.",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&auto=format&fit=crop&q=85",
    price: "₹130",
    spices: ["Idukki Cardamom", "Floral Aroma", "Velvet Texture"],
    vibe: "Aromatic • Calming • Fragrant",
    matchScore: "97% Match",
  },
  kesar: {
    name: "Shahi 24K Kesar Chai",
    hindi: "केसर चाय",
    tagline: "Pure Kashmiri Saffron & Golden Tips for Royal Indulgence",
    description: "Infused with Grade-1 Kashmiri saffron strands and slow-caramelized over gentle charcoal embers in brass handis.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85",
    price: "₹180",
    spices: ["24K Kashmiri Kesar", "Caramelized Dum", "Golden Tips"],
    vibe: "Royal • Luxurious • Rich",
    matchScore: "100% Match",
  },
};

export function ChaiMatcher() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null);
  const [matchedChaiKey, setMatchedChaiKey] = useState<string>("masala");

  const moods = [
    {
      id: "morning",
      icon: "🌅",
      title: "Morning Wake-Up",
      subtitle: "Need high energy, bold aroma & mental clarity",
    },
    {
      id: "rainy",
      icon: "🌧️",
      title: "Rainy & Cozy",
      subtitle: "Craving deep warmth, comfort & soothing spices",
    },
    {
      id: "royal",
      icon: "👑",
      title: "Royal Indulgence",
      subtitle: "Special treat with rich saffron & creamy texture",
    },
    {
      id: "calm",
      icon: "🧘",
      title: "Calm & Fragrant",
      subtitle: "Aromatic sweetness to unwind with friends",
    },
  ];

  const tastes = [
    {
      id: "spicy",
      icon: "🔥",
      title: "Bold & Spicy Kick",
      subtitle: "Clove, black pepper & deep heat",
    },
    {
      id: "ginger",
      icon: "🫚",
      title: "Fiery Fresh Ginger",
      subtitle: "Sharp mountain adrak soothing the throat",
    },
    {
      id: "cardamom",
      icon: "🍃",
      title: "Sweet Aromatic Cardamom",
      subtitle: "Gentle green pods and velvet aroma",
    },
    {
      id: "saffron",
      icon: "✨",
      title: "Royal Saffron Dum",
      subtitle: "Kashmiri kesar & golden warmth",
    },
  ];

  const handleSelectMood = (moodId: string) => {
    setSelectedMood(moodId);
    setStep(2);
  };

  const handleSelectTaste = (tasteId: string) => {
    setSelectedTaste(tasteId);

    let result = "masala";
    if (tasteId === "saffron" || selectedMood === "royal") {
      result = "kesar";
    } else if (tasteId === "ginger" || selectedMood === "rainy") {
      result = "adrak";
    } else if (tasteId === "cardamom" || selectedMood === "calm") {
      result = "elaichi";
    } else {
      result = "masala";
    }

    setMatchedChaiKey(result);
    setStep(3);
  };

  const resetQuiz = () => {
    setSelectedMood(null);
    setSelectedTaste(null);
    setStep(1);
  };

  const matchedChai = CHAI_DATABASE[matchedChaiKey] || CHAI_DATABASE.masala;

  const whatsappOrderUrl = `https://wa.me/917300212948?text=${encodeURIComponent(
    `Namaste Chai Da Adda! I just did the Flavor Matcher and my signature chai is ${matchedChai.name} (${matchedChai.price}). I'd love to order / visit!`
  )}`;

  return (
    <section id="sommelier" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#0A0604] via-[#120B08] to-[#0A0604] border-t border-b border-[#C69247]/20 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#DFAB5F]/8 blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/35 bg-[#1E130D]/90 backdrop-blur-md text-[#DFAB5F] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#DFAB5F]" />
            <span>AI Flavor Sommelier</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EE] leading-tight mb-3">
            Find Your <span className="text-gold-gradient italic font-normal">Signature Chai</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#D8CCC0]/85 font-sans font-light leading-relaxed">
            Answer 2 quick questions to discover your personalized handcrafted Varanasi brew.
          </p>
        </div>

        {/* Quiz Steps Container */}
        <div className="bg-[#140C08]/90 border border-[#C69247]/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C69247]/20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#DFAB5F]">
                {step === 1 ? "Step 1 of 2: Current Vibe" : step === 2 ? "Step 2 of 2: Spice Profile" : "Your Match Is Ready"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className={`w-7 h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? "bg-[#DFAB5F]" : "bg-[#2A1C14]"}`} />
              <div className={`w-7 h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? "bg-[#DFAB5F]" : "bg-[#2A1C14]"}`} />
              <div className={`w-7 h-1.5 rounded-full transition-all duration-300 ${step === 3 ? "bg-[#DFAB5F]" : "bg-[#2A1C14]"}`} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: MOOD */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-serif text-[#FBF6EE] text-center">
                  What is your mood right now?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMood(m.id)}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1E130D]/80 hover:bg-[#251710] border border-[#C69247]/25 hover:border-[#DFAB5F] text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group flex items-start gap-3.5 cursor-pointer"
                    >
                      <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-[#140C08] border border-[#C69247]/20 group-hover:border-[#DFAB5F]/40 transition-colors">
                        {m.icon}
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                          {m.title}
                        </h4>
                        <p className="text-xs text-[#D8CCC0]/70 font-sans mt-0.5 leading-snug">
                          {m.subtitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: TASTE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-serif text-[#FBF6EE]">
                    Which aroma calls to you most?
                  </h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-[#DFAB5F] hover:underline"
                  >
                    ← Back
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {tastes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTaste(t.id)}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1E130D]/80 hover:bg-[#251710] border border-[#C69247]/25 hover:border-[#DFAB5F] text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group flex items-start gap-3.5 cursor-pointer"
                    >
                      <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-[#140C08] border border-[#C69247]/20 group-hover:border-[#DFAB5F]/40 transition-colors">
                        {t.icon}
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                          {t.title}
                        </h4>
                        <p className="text-xs text-[#D8CCC0]/70 font-sans mt-0.5 leading-snug">
                          {t.subtitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: RESULT MATCH */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* Image Container */}
                  <div className="relative w-full md:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden border border-[#DFAB5F]/40 shadow-2xl shrink-0">
                    <img
                      src={matchedChai.image}
                      alt={matchedChai.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806]/90 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0D0806]/90 border border-[#DFAB5F] text-[10px] font-mono font-bold text-[#DFAB5F] backdrop-blur-md shadow-lg">
                      {matchedChai.matchScore}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="w-full md:w-7/12 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-xs font-serif text-[#DFAB5F]/90">
                        {matchedChai.hindi} • {matchedChai.vibe}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF6EE] text-gold-gradient mt-0.5">
                        {matchedChai.name}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#DFAB5F] mt-1">
                        {matchedChai.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-[#D8CCC0]/90 font-sans font-light mt-2 leading-relaxed">
                        {matchedChai.description}
                      </p>
                    </div>

                    {/* Spices tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {matchedChai.spices.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#1E130D] border border-[#C69247]/30 text-[10px] font-mono text-[#DFAB5F]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-[#C69247]/20 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#D8CCC0]/60 block">
                          Served in Varanasi Terracotta
                        </span>
                        <span className="text-2xl font-serif font-bold text-[#DFAB5F]">
                          {matchedChai.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={resetQuiz}
                          className="p-2.5 rounded-full border border-[#C69247]/30 bg-[#1E130D] text-[#DFAB5F] hover:bg-[#251710] transition-colors cursor-pointer"
                          title="Try Again"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>

                        <a
                          href={whatsappOrderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Taste At Adda</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
