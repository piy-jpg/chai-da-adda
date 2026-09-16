"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Flame, Users, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Story3DCanvas } from "@/components/story/Story3DCanvas";
import { chaiAmbience } from "@/lib/audioAmbience";

export function BrandStory() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const toggleSound = () => {
    const isPlaying = chaiAmbience.toggle();
    setIsPlayingAudio(isPlaying);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      rotX: -((y - centerY) / centerY) * 14,
      rotY: ((x - centerX) / centerX) * 14,
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, x: 0, y: 0 });
  };

  return (
    <section
      id="story"
      className="relative py-16 md:py-22 bg-[#0D0806] overflow-hidden film-grain select-none"
    >
      {/* 1. Full Complete Animated Background Chai Imagery */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1.03, 1.08, 1.03],
            y: ["0%", "-2%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1800&auto=format&fit=crop&q=88"
            alt="Steaming Authentic Indian Spiced Chai"
            className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.12] saturate-[1.2]"
          />
        </motion.div>

        {/* Dual Dark Vignette Overlays for Ultimate Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806] via-[#0D0806]/65 to-[#0D0806]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0D0806]/40 to-[#0D0806]/90" />

        {/* Rising Warm Organic Steam Clouds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, y: "30%", scaleX: 0.8 }}
            animate={{
              opacity: [0, 0.22, 0.32, 0],
              y: ["25%", "-40%"],
              scaleX: [0.8, 1.3, 1.6],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 left-1/4 w-48 h-64 bg-gradient-to-t from-[#DFAB5F]/20 via-[#FBF6EE]/12 to-transparent blur-3xl rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, y: "35%", scaleX: 0.9 }}
            animate={{
              opacity: [0, 0.18, 0.28, 0],
              y: ["30%", "-35%"],
              scaleX: [0.9, 1.4, 1.7],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
            className="absolute bottom-10 right-1/4 w-56 h-72 bg-gradient-to-t from-[#C69247]/20 via-[#FBF6EE]/10 to-transparent blur-3xl rounded-full"
          />
        </div>
      </div>

      {/* 2. Real-time 3D Particle & Steam Physics */}
      <Story3DCanvas />

      {/* Atmospheric Neon Gold Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-[#C69247]/15 via-[#A84924]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between gap-4 border-b border-[#C69247]/20 pb-3.5 mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
            <span className="w-2 h-2 rounded-full bg-[#DFAB5F] animate-ping" />
            <span>ESTD. Tapri Heritage</span>
          </div>

          <button
            onClick={toggleSound}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E130D]/90 border border-[#C69247]/30 text-[#DFAB5F] text-[11px] font-mono hover:bg-[#C69247]/20 hover:border-[#DFAB5F] transition-all shadow-sm"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#DFAB5F]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#DFAB5F]/70" />
            )}
            <span>{isPlayingAudio ? "Sound ON" : "Ambient Tapri"}</span>
          </button>
        </motion.div>

        {/* Ultra-Crisp 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Razor-Sharp Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#FBF6EE] leading-[1.06] tracking-tight">
              Born From The Streets. <br />
              <span className="text-gold-gradient italic font-normal">
                Crafted For The Soul.
              </span>
            </h2>

            <p className="text-base sm:text-lg font-serif text-[#DFAB5F] font-light leading-snug border-l-2 border-[#C69247] pl-3.5 italic">
              In India, chai isn&apos;t just a morning routine. It is a timeless pause, an unhurried baithak, and a sacred bond shared over boiling brass vessels.
            </p>

            <p className="text-[#D8CCC0]/90 text-xs sm:text-sm leading-relaxed font-sans font-light">
              Growing up around neighborhood tapris, we learned that the best ideas are born on wooden benches with a hot glass in hand. <strong className="text-[#FBF6EE] font-medium">Chai Ka Adda</strong> preserves slow simmering, whole single-estate leaves, and authentic earthen terracotta—bringing roadside warmth into a modern café sanctuary.
            </p>

            {/* Crisp 2-Card Value Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#140C08]/90 border border-[#C69247]/30 backdrop-blur-md hover:border-[#DFAB5F] transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-3.5 h-3.5 text-[#DFAB5F] group-hover:scale-125 transition-transform" />
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#FBF6EE]">
                    Slow Boiled
                  </h4>
                </div>
                <p className="text-[11px] text-[#D8CCC0]/80">
                  No shortcuts, pure decoction
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#140C08]/90 border border-[#C69247]/30 backdrop-blur-md hover:border-[#DFAB5F] transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-3.5 h-3.5 text-[#DFAB5F] group-hover:scale-125 transition-transform" />
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#FBF6EE]">
                    Real Adda
                  </h4>
                </div>
                <p className="text-[11px] text-[#D8CCC0]/80">
                  Conversations over screens
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Authentic Indian Kulhad 3D Parallax Tilt Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 [perspective:1200px]"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-3xl p-2 bg-gradient-to-br from-[#2D1B10] via-[#1A0E08] to-[#0D0806] border border-[#C69247]/35 shadow-2xl transition-transform duration-150 group cursor-pointer"
            >
              {/* Dynamic 3D Cursor Lighting */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none z-30 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{
                  background: tilt.x
                    ? `radial-gradient(350px circle at ${tilt.x}px ${tilt.y}px, rgba(223, 171, 95, 0.2), transparent 70%)`
                    : "none",
                }}
              />

              {/* Visual Container with Authentic Kulhad Chai Imagery */}
              <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-[#140C08]">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=85"
                  alt="Authentic Earthen Kulhad Chai"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 contrast-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806] via-[#0D0806]/35 to-transparent" />

                {/* 3D Floating Top Badges */}
                <div
                  style={{ transform: "translateZ(45px)" }}
                  className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20"
                >
                  <span className="px-3 py-1 rounded-full bg-[#0D0806]/85 backdrop-blur-md border border-[#C69247]/40 text-[#DFAB5F] text-[10px] font-mono tracking-wider shadow-md">
                    🏺 100% Terracotta Kulhad
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0D0806]/85 backdrop-blur-md border border-[#C69247]/40 text-[#DFAB5F] text-[10px] font-mono shadow-md">
                    25-Min Slow Dum
                  </span>
                </div>

                {/* 3D Floating Bottom Quote */}
                <div
                  style={{ transform: "translateZ(55px)" }}
                  className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-xl bg-[#140C08]/92 backdrop-blur-xl border border-[#C69247]/35 shadow-xl pointer-events-none z-20"
                >
                  <p className="font-serif text-xs sm:text-sm text-[#FBF6EE] italic leading-snug">
                    &ldquo;The best ideas are born on wooden benches with a hot glass in hand.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
