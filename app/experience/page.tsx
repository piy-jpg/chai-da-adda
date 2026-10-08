"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Coffee, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  Users, 
  HeartHandshake, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
  Award,
  Sun,
  Eye,
  Music,
  Wind,
  Hand,
  Utensils,
  BookOpen,
  Moon,
  Compass,
  Phone
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Story3DCanvas } from "@/components/story/Story3DCanvas";
import { chaiAmbience } from "@/lib/audioAmbience";

export default function ExperiencePage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSpaceTab, setActiveSpaceTab] = useState<number>(0);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

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

  const sensoryPillars = [
    {
      icon: Eye,
      sense: "Sight",
      title: "Warm Amber Luminescence",
      description: "Low-lit hand-blown glass lanterns, raw teakwood furniture, polished brass samovars, and rustic terracotta accents create a soothing sanctuary from city glare.",
      tag: "Ambient Glow"
    },
    {
      icon: Music,
      sense: "Sound",
      title: "The Symphony of Slow Dum",
      description: "The rhythmic bubbling of boiling milk inside brass pots, the clinking of clay kulhads, and meditative classical Indian sitar ragas playing softly in the background.",
      tag: "Acoustic Warmth"
    },
    {
      icon: Wind,
      sense: "Scent",
      title: "Cardamom & First Rain Petrichor",
      description: "The intoxicating aroma of freshly stone-pounded green cardamom, roasted mountain ginger, and the earthy petrichor (mitti ki khushboo) rising from hot earthenware.",
      tag: "Mitti Ki Khushboo"
    },
    {
      icon: Hand,
      sense: "Touch",
      title: "Raw Earthen Terracotta",
      description: "The grounding tactile sensation of holding unglazed, kiln-baked clay kulhads, naturally insulating the hot tea while keeping your hands comfortably warm.",
      tag: "Tactile Earth"
    },
    {
      icon: Utensils,
      sense: "Taste",
      title: "Uncompromising Decoction Depth",
      description: "Robust single-estate Upper Assam maltiness married with caramelized full-cream milk and essential whole spice oils extracted through 25 minutes of patient dum.",
      tag: "Velvety Finish"
    }
  ];

  const sanctuarySpaces = [
    {
      id: "baithak",
      title: "The Riverbank Baithak",
      subtitle: "Egalitarian Circle of Souls",
      description:
        "Low wooden benches with hand-woven organic cushions arranged in traditional conversational circles. Designed so strangers naturally share conversations and poets exchange verses without hierarchy.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&auto=format&fit=crop&q=85",
      tag: "Communal Seating"
    },
    {
      id: "alchemist",
      title: "The Alchemist Handi Counter",
      subtitle: "The Theater of Extraction",
      description:
        "Watch our master chai walas pound whole cardamom pods in granite mortars, stir heavy brass vessels over gentle flames, and aerate the tea from height with practiced theatrical grace.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=85",
      tag: "Live Brewing Bar"
    },
    {
      id: "courtyard",
      title: "The Courtyard of Poets",
      subtitle: "Sanctuary for Quiet Minds",
      description:
        "An open-air shaded courtyard under lush foliage, designed for reading, writing, sketching, or simply watching steam rise into the morning breeze in meditative solitude.",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=900&auto=format&fit=crop&q=85",
      tag: "Quiet Zone"
    },
    {
      id: "midnight",
      title: "The Midnight Adda",
      subtitle: "Open Until 2:00 AM Daily",
      description:
        "When the bustling city sleeps, the Adda remains awake. Dim amber lighting and steaming kulhads welcome nocturnal thinkers, writers, and artists for midnight contemplations.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=85",
      tag: "Late Night Haven"
    }
  ];

  const baithakTraditions = [
    {
      icon: BookOpen,
      title: "Put Away the Screens",
      description: "We encourage guests to place phones face-down. True presence, real eye contact, and heartfelt conversations take precedence over digital notifications."
    },
    {
      icon: Users,
      title: "The Egalitarian Circle",
      description: "Social titles, corporate hierarchies, and net worth dissolve at our wooden tables. All sit together as equal seekers of good tea."
    },
    {
      icon: Flame,
      title: "Never Rush the Pour",
      description: "Good things take time. We do not use express machines or instant concentrates. Every order is brewed with patient reverence."
    },
    {
      icon: HeartHandshake,
      title: "Conversations Welcome",
      description: "Say hello to your neighbor. At Chai Ka Adda, every stranger on the bench is simply a friend with an unread story."
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#0D0806] text-[#FBF6EE] overflow-x-hidden selection:bg-[#C69247] selection:text-[#0D0806]">
      {/* Top Fixed Shared Navbar */}
      <Navbar />

      {/* Atmospheric Background Ambient Steam & 3D Particles */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <Story3DCanvas />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#C69247]/12 via-[#A84924]/10 to-transparent rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[700px] h-[400px] bg-gradient-to-t from-[#DFAB5F]/10 to-transparent rounded-full blur-[180px]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-32 sm:pt-40 md:pt-46 pb-16 md:pb-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          {/* Breadcrumb & Sound Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C69247]/25 pb-4.5 mb-8 sm:mb-12"
          >
            {/* Breadcrumb: HOME / THE EXPERIENCE */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-[0.22em] text-[#D8CCC0]/80">
              <Link 
                href="/" 
                className="hover:text-[#DFAB5F] transition-colors flex items-center gap-1.5 group"
              >
                <span className="group-hover:underline">HOME</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#C69247]" />
              <span className="text-[#DFAB5F] font-semibold drop-shadow-[0_0_8px_rgba(223,171,95,0.4)]">THE EXPERIENCE</span>
            </nav>

            {/* Heritage Badge & Ambience Control */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#DFAB5F] shadow-[0_0_15px_rgba(198,146,71,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#DFAB5F] animate-ping" />
                <span>AN UNHURRIED SANCTUARY • ESTD. 1998</span>
              </div>

              {/* Sound ON / Ambient Tapri Button with Live Equalizer */}
              <button
                onClick={toggleSound}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/40 text-[#DFAB5F] text-[11px] font-mono hover:bg-[#C69247]/20 hover:border-[#DFAB5F] transition-all shadow-[0_0_15px_rgba(198,146,71,0.15)] cursor-pointer group"
                title="Toggle Ambient Chai Stall Atmosphere"
                aria-label="Toggle Ambient Sound"
              >
                {isPlayingAudio ? (
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-[#DFAB5F] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-1 h-4 bg-[#DFAB5F] rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.1s]" />
                    <span className="w-1 h-2.5 bg-[#DFAB5F] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
                  </div>
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-[#DFAB5F]/70 group-hover:text-[#DFAB5F]" />
                )}
                <span>{isPlayingAudio ? "Sound ON" : "Ambient Tapri"}</span>
              </button>
            </div>
          </motion.div>

          {/* Hero 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Multiline Headline, Quotes & Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#DFAB5F] block">
                  A REFUGE FROM THE FAST WORLD
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#FBF6EE] leading-[1.06] tracking-tight">
                  Step Beyond Time. <br />
                  <span className="text-gold-gradient italic font-normal drop-shadow-[0_4px_20px_rgba(223,171,95,0.25)]">
                    The Unhurried Adda Experience.
                  </span>
                </h1>
              </div>

              {/* Introductory Quotation Card */}
              <div className="relative pl-5 border-l-2 border-[#DFAB5F] py-2 bg-gradient-to-r from-[#DFAB5F]/10 via-[#C69247]/5 to-transparent rounded-r-2xl">
                <p className="text-base sm:text-xl font-serif text-[#DFAB5F] font-light leading-snug italic drop-shadow-sm">
                  &ldquo;We didn&apos;t just build a tea shop; we carved out a sanctuary where clock hands slow down, conversations flow freely, and every guest is welcomed with timeless warmth.&rdquo;
                </p>
              </div>

              {/* Supporting Brand Paragraph */}
              <p className="text-[#D8CCC0]/90 text-sm sm:text-base leading-relaxed font-sans font-light">
                At <strong className="text-[#FBF6EE] font-medium">Chai Ka Adda</strong>, the experience begins before the first sip. It is in the low hum of classical ragas, the tactile warmth of unglazed Varanasi kulhads, the intoxicating fragrance of whole cardamom hitting boiling brass, and the egalitarian warmth of wooden benches where all sit as equals.
              </p>

              {/* Three Experience Pillars */}
              <div className="grid grid-cols-3 gap-3.5 pt-2">
                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">Zero</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Rushed Seating</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">100%</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Sensory Immersion</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Moon className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">6AM-2AM</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Open Daily</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Premium Photography Card with 3D Parallax Tilt */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 [perspective:1400px]"
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
                  transformStyle: "preserve-3d",
                }}
                className="relative rounded-3xl p-2.5 bg-gradient-to-br from-[#2D1B10] via-[#1A0E08] to-[#0D0806] border border-[#C69247]/45 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(198,146,71,0.2)] transition-transform duration-150 group cursor-pointer"
              >
                {/* Dynamic 3D Cursor Ambient Spotlight */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none z-30 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: tilt.x
                      ? `radial-gradient(380px circle at ${tilt.x}px ${tilt.y}px, rgba(223, 171, 95, 0.28), transparent 70%)`
                      : "none",
                  }}
                />

                {/* Hero Photograph Container */}
                <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] bg-[#140C08]">
                  <img
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&auto=format&fit=crop&q=85"
                    alt="Authentic tea sanctuary atmosphere with warm glowing amber light and steaming tea"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 filter brightness-95 contrast-105"
                  />

                  {/* Dual Dark Vignette Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806] via-[#0D0806]/35 to-transparent" />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0D0806]/20 to-[#0D0806]/80" />

                  {/* Overlay Badges */}
                  <div
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20"
                  >
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0D0806]/92 backdrop-blur-md border border-[#C69247]/50 text-[#DFAB5F] text-[11px] font-mono tracking-wider shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFAB5F]" />
                      Varanasi Baithak
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0D0806]/92 backdrop-blur-md border border-[#C69247]/50 text-[#DFAB5F] text-[11px] font-mono shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#DFAB5F]" />
                      Earthen Aromatics
                    </span>
                  </div>

                  {/* Subtle Floating Quote Card at Bottom */}
                  <div
                    style={{ transform: "translateZ(60px)" }}
                    className="absolute bottom-4 left-4 right-4 p-4.5 rounded-2xl bg-[#140C08]/95 backdrop-blur-xl border border-[#C69247]/45 shadow-[0_15px_30px_rgba(0,0,0,0.8)] pointer-events-none z-20"
                  >
                    <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#DFAB5F]">
                      <Compass className="w-3.5 h-3.5" />
                      <span>The Art of Unhurried Time</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm text-[#FBF6EE] italic leading-snug">
                      &ldquo;You don&apos;t just drink chai here. You sit, breathe, and become part of the living tapestry of Varanasi.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 5 SENSES OF CHAI KA ADDA */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0A0604] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FIVE SENSES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE]">
              A Total Sensory Immersion
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 font-sans font-light">
              How every element of our sanctuary is meticulously tuned to calm the mind and awaken the soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sensoryPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-[#140C08]/95 border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-300 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#1E130D] border border-[#C69247]/40 flex items-center justify-center text-[#DFAB5F] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(223,171,95,0.4)] transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#DFAB5F]/75 px-2 py-0.5 rounded-full bg-[#1E130D] border border-[#C69247]/20">
                        {pillar.sense}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#FBF6EE] mb-2 group-hover:text-[#DFAB5F] transition-colors leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#C69247]/15">
                    <span className="text-[10px] font-mono text-[#DFAB5F]/80">
                      ✨ {pillar.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE SANCTUARY SPACES (Interactive Spaces Showcase) */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0D0806] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
                <MapPin className="w-3.5 h-3.5 text-[#DFAB5F]" />
                <span>SANCTUARY ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE] leading-tight">
                Explore the Adda Spaces
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {sanctuarySpaces.map((space, idx) => (
                <button
                  key={space.id}
                  onClick={() => setActiveSpaceTab(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeSpaceTab === idx
                      ? "bg-[#C69247] text-[#0D0806] font-bold shadow-[0_0_15px_rgba(198,146,71,0.4)]"
                      : "bg-[#1E130D]/90 text-[#D8CCC0]/80 border border-[#C69247]/30 hover:border-[#DFAB5F] hover:text-[#DFAB5F]"
                  }`}
                >
                  {space.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Space Spotlight Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#140C08]/95 border border-[#C69247]/35 shadow-2xl">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#DFAB5F] px-3 py-1 rounded-full bg-[#1E130D] border border-[#C69247]/30 inline-block">
                {sanctuarySpaces[activeSpaceTab].tag}
              </span>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#FBF6EE]">
                {sanctuarySpaces[activeSpaceTab].title}
              </h3>

              <h4 className="text-sm font-serif italic text-[#DFAB5F]">
                &ldquo;{sanctuarySpaces[activeSpaceTab].subtitle}&rdquo;
              </h4>

              <p className="text-xs sm:text-sm text-[#D8CCC0]/90 leading-relaxed font-light">
                {sanctuarySpaces[activeSpaceTab].description}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/#visit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFAB5F] to-[#C69247] text-[#0D0806] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Experience This Space</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/10] border border-[#C69247]/30 bg-[#0D0806] shadow-xl">
              <img
                src={sanctuarySpaces[activeSpaceTab].image}
                alt={sanctuarySpaces[activeSpaceTab].title}
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE BAITHAK TRADITIONS */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0A0604] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE ETIQUETTE OF PRESENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE]">
              The Baithak Traditions
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 font-sans font-light">
              Simple customs that preserve the warmth, dignity, and conversation of our shared space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {baithakTraditions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-[#140C08]/95 border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-300 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1E130D] border border-[#C69247]/45 flex items-center justify-center text-[#DFAB5F] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(223,171,95,0.4)] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#FBF6EE] mb-2 group-hover:text-[#DFAB5F] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FLAGSHIP SANCTUARY LOCATIONS */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0D0806] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
              <MapPin className="w-3.5 h-3.5" />
              <span>VISIT THE SANCTUARIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE]">
              Where to Find Us
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 font-sans font-light">
              Step through our arched doors and experience unhurried hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flagship 1: New Delhi */}
            <div className="p-8 rounded-3xl bg-[#140C08]/95 border border-[#C69247]/35 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DFAB5F]">Flagship Sanctuary</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                  Open Daily • 6 AM – 2 AM
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#FBF6EE]">
                Chai Ka Adda • New Delhi
              </h3>

              <p className="text-xs text-[#D8CCC0]/85 leading-relaxed font-light">
                Plot 18, Heritage Courtyard, Inner Circle, Connaught Place (Near Central Park Gate 3)
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#DFAB5F]">
                <a href="tel:+917300212948" className="hover:underline flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 73002 12948</span>
                </a>
                <span className="text-[#D8CCC0]/40">•</span>
                <span>Dine-In • Takeaway • Baithak</span>
              </div>
            </div>

            {/* Flagship 2: Varanasi Heritage */}
            <div className="p-8 rounded-3xl bg-[#140C08]/95 border border-[#C69247]/35 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#DFAB5F]">Heritage Roots</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                  Open Daily • 5 AM – 1 AM
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#FBF6EE]">
                Chai Ka Adda • Assi Ghat
              </h3>

              <p className="text-xs text-[#D8CCC0]/85 leading-relaxed font-light">
                Assi Ghat Stone Pavilion, Overlooking the sacred Ganga, Varanasi
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#DFAB5F]">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Dawn Aarti Special</span>
                </span>
                <span className="text-[#D8CCC0]/40">•</span>
                <span>Historic 1998 Founding Location</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLOSING CTA */}
      {/* ========================================================================= */}
      <section className="relative py-24 md:py-34 overflow-hidden bg-gradient-to-b from-[#0D0806] via-[#140C08] to-[#060403] border-t border-[#C69247]/30 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-[#DFAB5F]/20 via-[#C69247]/15 to-transparent rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#1E130D] border border-[#C69247]/50 text-xs font-mono uppercase tracking-[0.28em] text-[#DFAB5F] shadow-[0_0_20px_rgba(198,146,71,0.2)]">
            <Coffee className="w-3.5 h-3.5" />
            <span>THE UNHURRIED SANCTUARY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#FBF6EE] leading-tight">
            &ldquo;Some places serve chai. <br />
            <span className="text-gold-gradient italic font-normal drop-shadow-[0_5px_20px_rgba(223,171,95,0.3)]">
              Some places become a sanctuary.&rdquo;
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D8CCC0]/85 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Step through our doors, pull up a wooden stool, and experience the warmth of Varanasi&apos;s living tradition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4.5 pt-4">
            <Link
              href="/#visit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-xs sm:text-sm uppercase tracking-[0.22em] shadow-[0_10px_30px_rgba(198,146,71,0.4)] hover:shadow-[0_15px_40px_rgba(223,171,95,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>VISIT THE SANCTUARY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/signature-chai"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/50 text-[#DFAB5F] font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] hover:bg-[#C69247]/25 hover:border-[#DFAB5F] transition-all cursor-pointer shadow-lg"
            >
              <span>EXPLORE SIGNATURE CHAI</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
