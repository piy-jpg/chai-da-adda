"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SIGNATURE_BREWS, MenuItem } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import { Sparkles, Wand2, Coffee, Check, ArrowRight, RotateCcw } from "lucide-react";

export function ChaiAlchemist() {
  const { addItem } = useCart();

  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<string>("energy");
  const [milk, setMilk] = useState<string>("buffalo");
  const [sweetener, setSweetener] = useState<string>("jaggery");

  const moods = [
    {
      id: "energy",
      title: "Deep Focus & Kadak Energy",
      desc: "Bold Assam CTC, double ginger & black pepper punch",
      icon: "⚡",
      recommendedId: "banarasi-kulhad-masala",
    },
    {
      id: "royal",
      title: "Royal Luxury & Celebration",
      desc: "24K Kashmiri saffron, cardamom & thick malai richness",
      icon: "👑",
      recommendedId: "shahi-kesar-dum",
    },
    {
      id: "calm",
      title: "Mind Unwind & Rejuvenate",
      desc: "Kashmiri green tea, wild rose & crushed almonds",
      icon: "🌸",
      recommendedId: "kashmiri-saffron-kahwa",
    },
    {
      id: "immunity",
      title: "Herbal Immunity & Balance",
      desc: "Krishna Tulsi, crushed green cardamom & cloves",
      icon: "🌿",
      recommendedId: "kadak-tulsi-elaichi",
    },
  ];

  const milks = [
    { id: "buffalo", title: "Rich Buffalo Milk", desc: "Creamy traditional texture", icon: "🥛" },
    { id: "a2cow", title: "A2 Gir Cow Milk", desc: "Light, sweet & easily digestible", icon: "🐄" },
    { id: "oat", title: "Artisanal Oat/Almond Milk", desc: "100% Plant-powered smoothness", icon: "🌾" },
    { id: "none", title: "Pure Spring Decoction", desc: "Clear herbal infusion (No milk)", icon: "💧" },
  ];

  const sweeteners = [
    { id: "jaggery", title: "Organic Desi Gur (Jaggery)", desc: "Deep caramel mineral sweetness", icon: "🍯" },
    { id: "khandsari", title: "Raw Khandsari Sugar", desc: "Unbleached native cane crystals", icon: "🌾" },
    { id: "honey", title: "Raw Himalayan Forest Honey", desc: "Floral enzymes & gentle nectar", icon: "🐝" },
    { id: "feeka", title: "Feeka (Zero Sugar)", desc: "Pure unadulterated spice essence", icon: "🚫" },
  ];

  // Match recommended item
  const selectedMoodObj = moods.find((m) => m.id === mood) || moods[0];
  const matchedBrew: MenuItem =
    SIGNATURE_BREWS.find((b) => b.id === selectedMoodObj.recommendedId) || SIGNATURE_BREWS[0];

  const handleCustomOrder = () => {
    const milkName = milks.find((m) => m.id === milk)?.title || "Buffalo Milk";
    const sweetName = sweeteners.find((s) => s.id === sweetener)?.title || "Raw Jaggery";

    addItem(matchedBrew, {
      milk: milkName,
      sweetness: sweetName,
      temperature: "Piping Hot in Varanasi Kulhad",
    });
  };

  const resetQuiz = () => {
    setStep(1);
    setMood("energy");
    setMilk("buffalo");
    setSweetener("jaggery");
  };

  return (
    <section id="chai-alchemist" className="relative py-24 md:py-32 bg-obsidian-light overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Flavor Finder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-50 leading-tight mb-4">
            The <span className="text-gold-gradient italic font-normal">Chai Alchemist</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-200/70 font-sans">
            Answer 3 quick sensory questions to discover your personalized signature cup.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { num: 1, label: "Mood & Energy" },
            { num: 2, label: "Milk Matrix" },
            { num: 3, label: "Sweetener" },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-pointer transition-all ${
                step === s.num
                  ? "bg-amber-500 text-black font-semibold text-xs shadow-md"
                  : step > s.num
                  ? "glass-panel border-amber-500/40 text-amber-300 text-xs"
                  : "text-neutral-500 text-xs hover:text-neutral-300"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                {s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Quiz Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Question Options */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/20">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-amber-100 mb-2">
                    1. What state of mind are you seeking today?
                  </h3>
                  <p className="text-xs text-amber-400/60 mb-6">
                    Select your current mood to find your ideal chai.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {moods.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setMood(m.id);
                          setStep(2);
                        }}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left ${
                          mood === m.id
                            ? "glass-panel-gold border-amber-400/60 bg-amber-950/40 gold-glow"
                            : "glass-panel border-amber-500/15 hover:border-amber-500/40 hover:bg-neutral-900/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{m.icon}</span>
                          {mood === m.id && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <div className="font-serif font-semibold text-amber-100 text-sm mb-1">
                          {m.title}
                        </div>
                        <div className="text-xs text-amber-300/60 font-sans">
                          {m.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-amber-100 mb-2">
                    2. Choose your preferred milk base:
                  </h3>
                  <p className="text-xs text-amber-400/60 mb-6">
                    Every batch is simmered gently to prevent scorching.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {milks.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setMilk(m.id);
                          setStep(3);
                        }}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left ${
                          milk === m.id
                            ? "glass-panel-gold border-amber-400/60 bg-amber-950/40 gold-glow"
                            : "glass-panel border-amber-500/15 hover:border-amber-500/40 hover:bg-neutral-900/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{m.icon}</span>
                          {milk === m.id && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <div className="font-serif font-semibold text-amber-100 text-sm mb-1">
                          {m.title}
                        </div>
                        <div className="text-xs text-amber-300/60 font-sans">
                          {m.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-amber-400 hover:text-amber-200"
                    >
                      ← Back to Mood
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="text-xs font-semibold text-amber-300 hover:text-amber-100"
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-amber-100 mb-2">
                    3. Select your natural sweetening preference:
                  </h3>
                  <p className="text-xs text-amber-400/60 mb-6">
                    Zero white sulfur sugar. Only pure indigenous sweeteners.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {sweeteners.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSweetener(s.id)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left ${
                          sweetener === s.id
                            ? "glass-panel-gold border-amber-400/60 bg-amber-950/40 gold-glow"
                            : "glass-panel border-amber-500/15 hover:border-amber-500/40 hover:bg-neutral-900/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{s.icon}</span>
                          {sweetener === s.id && <Check className="w-4 h-4 text-amber-400" />}
                        </div>
                        <div className="font-serif font-semibold text-amber-100 text-sm mb-1">
                          {s.title}
                        </div>
                        <div className="text-xs text-amber-300/60 font-sans">
                          {s.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-amber-400 hover:text-amber-200"
                    >
                      ← Back to Milk
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Live Calibrated Brew Recommendation */}
          <div className="lg:col-span-5">
            <div className="h-full glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/40 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Flavor Match
                  </span>
                  <span className="text-xs font-serif text-amber-300/80">
                    99.4% Match
                  </span>
                </div>

                {matchedBrew.hindiName && (
                  <div className="text-xs font-serif text-amber-400/80 mb-1">
                    {matchedBrew.hindiName}
                  </div>
                )}
                <h3 className="text-2xl sm:text-3xl font-serif text-amber-50 mb-3">
                  {matchedBrew.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80 font-sans leading-relaxed mb-6">
                  {matchedBrew.description}
                </p>

                {/* Customization Summary */}
                <div className="bg-black/50 rounded-2xl p-4 border border-amber-500/20 mb-6 space-y-2">
                  <div className="text-[11px] text-amber-400 font-mono uppercase tracking-wider mb-2">
                    Your Personalized Formulation:
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Intended Vibe:</span>
                    <span className="text-amber-200 font-semibold">{selectedMoodObj.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Milk Matrix:</span>
                    <span className="text-amber-200 font-semibold">
                      {milks.find((m) => m.id === milk)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Sweetening:</span>
                    <span className="text-amber-200 font-semibold">
                      {sweeteners.find((s) => s.id === sweetener)?.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block">Crafted Price</span>
                  <span className="text-2xl font-serif font-bold text-amber-100">
                    ₹{matchedBrew.price}
                  </span>
                </div>

                <button
                  onClick={handleCustomOrder}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-xl gold-glow"
                >
                  <Coffee className="w-4 h-4 fill-black" />
                  <span>Brew This & Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
