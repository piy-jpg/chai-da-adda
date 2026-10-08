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
  MessageSquareQuote, 
  HeartHandshake, 
  Compass, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
  Award,
  Sun,
  Waves,
  Feather
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Story3DCanvas } from "@/components/story/Story3DCanvas";
import { chaiAmbience } from "@/lib/audioAmbience";

export default function OurStoryPage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTimelineTab, setActiveTimelineTab] = useState<number>(0);
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

  // 4. Our Journey Milestones
  const timelineMilestones = [
    {
      year: "1998",
      badge: "The Genesis",
      title: "The First Brass Handi on Assi Ghat",
      description:
        "Founded on the ancient stone steps of Assi Ghat in Varanasi. What began with a solitary brass handi and a small wooden bench quickly became a morning sanctuary for early-morning rivergoers, sadhus, poets, and scholars.",
      icon: "🪔",
      highlight: "Estd. on Assi Ghat"
    },
    {
      year: "2008",
      badge: "The Decoction",
      title: "The Secret 7-Spice Dum Recipe",
      description:
        "After a decade of refined craftsmanship, we perfected our signature 25-minute slow dum brewing technique—blending organic green cardamom from Idukki, fiery sun-dried ginger, and single-estate Assam CTC leaves.",
      icon: "🌿",
      highlight: "Slow-Dum Perfected"
    },
    {
      year: "2016",
      badge: "Artisanal Alliance",
      title: "Reviving Pure Mirzapur Terracotta",
      description:
        "We formalized a generational covenant with master clay artisans across Varanasi and Mirzapur, ensuring every single kulhad is hand-thrown, unglazed, 100% biodegradable, and kiln-baked for distinct petrichor aroma.",
      icon: "🏺",
      highlight: "Generational Potters"
    },
    {
      year: "Present",
      badge: "The Sanctuary",
      title: "Reimagining the Adda for the Modern Era",
      description:
        "Bringing the unhurried warmth, egalitarian seating, and cultural camaraderie of Varanasi to contemporary flagship tea sanctuaries. An authentic refuge from the noise of the fast-paced world.",
      icon: "✨",
      highlight: "Living Heritage"
    }
  ];

  // 5. The Art of Brewing Cards
  const brewingPillars = [
    {
      step: "01",
      title: "Single-Estate Assam Leaf",
      subtitle: "The Foundation of Depth",
      description:
        "Hand-plucked orthodox and premium CTC leaves from the fertile floodplains of Upper Assam. Selected for bold malty undertones, brisk strength, and rich amber color.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=85",
      tag: "100% Single-Estate"
    },
    {
      step: "02",
      title: "Stone-Crushed Whole Spices",
      subtitle: "Freshness Uncompromised",
      description:
        "Whole green cardamom pods from the Western Ghats, fiery sun-cured ginger roots, cinnamon quills, and black pepper freshly pounded by hand just moments before brewing.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=85",
      tag: "Hand-Crushed Fresh"
    },
    {
      step: "03",
      title: "25-Minute Handi Dum",
      subtitle: "The Alchemy of Patience",
      description:
        "Simmered slowly over a gentle flame inside heavy brass vessels. The slow extraction coaxes out natural sweetness, essential spice oils, and a rich, creamy consistency.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85",
      tag: "Slow Brass Simmer"
    },
    {
      step: "04",
      title: "Unglazed Terracotta Kulhad",
      subtitle: "The Soul of Mother Earth",
      description:
        "Every pour into our unglazed Varanasi terracotta kulhads releases the sacred scent of first rain on dry soil (mitti ki khushboo), cooling the chai to the ideal sipping temperature.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=85",
      tag: "Varanasi Clay Art"
    }
  ];

  // 6. The Adda Philosophy Cards
  const addaValues = [
    {
      icon: Users,
      title: "The Egalitarian Circle",
      description:
        "At the Adda, social hierarchy dissolves. Artists, executives, students, and elders share the same wooden bench, united by the universal love for steaming chai."
    },
    {
      icon: MessageSquareQuote,
      title: "The Lost Art of Conversation",
      description:
        "A deliberate sanctuary from digital fatigue. Here, phones rest face-down while genuine eye contact, passionate debates, and shared laughter take center stage."
    },
    {
      icon: HeartHandshake,
      title: "Atithi Devo Bhava",
      description:
        "Rooted in ancient Indian hospitality, every guest is welcomed as an honored friend. Chai is not treated as a transaction, but as an offering of warmth and care."
    },
    {
      icon: Compass,
      title: "Culture & Living Memory",
      description:
        "More than a beverage stall, the Adda is a repository of memories, serendipitous connections, and timeless nostalgia passed down through generations."
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
            {/* Breadcrumb: HOME / OUR STORY */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-[0.22em] text-[#D8CCC0]/80">
              <Link 
                href="/" 
                className="hover:text-[#DFAB5F] transition-colors flex items-center gap-1.5 group"
              >
                <span className="group-hover:underline">HOME</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#C69247]" />
              <span className="text-[#DFAB5F] font-semibold drop-shadow-[0_0_8px_rgba(223,171,95,0.4)]">OUR STORY</span>
            </nav>

            {/* Heritage Badge & Ambience Control */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#DFAB5F] shadow-[0_0_15px_rgba(198,146,71,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#DFAB5F] animate-ping" />
                <span>THE VARANASI HERITAGE • ESTD. 1998</span>
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
              {/* Main Headline styled across multiple lines */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#DFAB5F] block">
                  CHAPTER I • THE RIVERBANKS
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#FBF6EE] leading-[1.06] tracking-tight">
                  Born on the Ghats. <br />
                  <span className="text-gold-gradient italic font-normal drop-shadow-[0_4px_20px_rgba(223,171,95,0.25)]">
                    Steeped in Timeless Soul.
                  </span>
                </h1>
              </div>

              {/* Introductory Quotation Card */}
              <div className="relative pl-5 border-l-2 border-[#DFAB5F] py-2 bg-gradient-to-r from-[#DFAB5F]/10 via-[#C69247]/5 to-transparent rounded-r-2xl">
                <p className="text-base sm:text-xl font-serif text-[#DFAB5F] font-light leading-snug italic drop-shadow-sm">
                  &ldquo;In the heart of India, an &lsquo;Adda&rsquo; is never just a tea stall. It is an unhurried baithak, an egalitarian circle of poets and dreamers, and an ancient covenant sealed over boiling brass vessels.&rdquo;
                </p>
              </div>

              {/* Supporting Brand Paragraph */}
              <p className="text-[#D8CCC0]/90 text-sm sm:text-base leading-relaxed font-sans font-light">
                At <strong className="text-[#FBF6EE] font-medium">Chai Ka Adda</strong>, we have spent decades safeguarding the sacred alchemy of authentic Indian chai. Across generations, our flame has burned with unwavering devotion to slow simmering, hand-crushed whole spices, and the unhurried conversations that define the spirit of Varanasi. We don&apos;t rush time; we let it brew with reverence.
              </p>

              {/* Three Heritage Statistics */}
              <div className="grid grid-cols-3 gap-3.5 pt-2">
                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sun className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">1998</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Estd. Assi Ghat</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Flame className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">25 Min</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Slow Brass Dum</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">100%</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Earth Terracotta</span>
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
                    alt="Freshly brewed spiced Indian chai in a transparent glass cup with warm cinematic lighting"
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
                      Assi Ghat Roots
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0D0806]/92 backdrop-blur-md border border-[#C69247]/50 text-[#DFAB5F] text-[11px] font-mono shadow-lg flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#DFAB5F]" />
                      Handi Dum
                    </span>
                  </div>

                  {/* Subtle Floating Quote Card at Bottom */}
                  <div
                    style={{ transform: "translateZ(60px)" }}
                    className="absolute bottom-4 left-4 right-4 p-4.5 rounded-2xl bg-[#140C08]/95 backdrop-blur-xl border border-[#C69247]/45 shadow-[0_15px_30px_rgba(0,0,0,0.8)] pointer-events-none z-20"
                  >
                    <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#DFAB5F]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>The Ghats at Dawn</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm text-[#FBF6EE] italic leading-snug">
                      &ldquo;Every cup carries the misty dawn of the sacred Ganga and centuries of unhurried camaraderie.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE GHATS AT DAWN */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-26 bg-[#0B0705] border-t border-[#C69247]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
                <Waves className="w-3.5 h-3.5 text-[#DFAB5F]" />
                <span>SUBAH-E-BANARAS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE] leading-tight">
                The Ghats at Dawn: <br />
                <span className="text-gold-gradient italic font-normal">
                  Where Light Meets Boiling Brass.
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/85 max-w-md font-sans font-light leading-relaxed">
              At 5:00 AM on Assi Ghat, the first rays of sunlight pierce through river mist. Temple bells ring in cadence with the bubbling of slow-brewing tea.
            </p>
          </div>

          {/* 3-Card Visual Ritual Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sunrise Imagery */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group rounded-3xl overflow-hidden bg-[#140C08] border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0806]">
                <img
                  src="https://images.unsplash.com/photo-1561361066-5b4d4554b9d0?w=1000&auto=format&fit=crop&q=85"
                  alt="Varanasi sunrise over the sacred Ganga river ghats"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0D0806]/90 backdrop-blur-md border border-[#C69247]/40 text-[10px] font-mono text-[#DFAB5F]">
                    🌅 First Amber Rays
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                  The Sacred Riverbank Awakening
                </h3>
                <p className="text-xs text-[#D8CCC0]/80 font-light leading-relaxed">
                  Pilgrims, classical vocalists, and sadhus converge along the ancient steps as the river reflects shimmering molten gold.
                </p>
              </div>
            </motion.div>

            {/* Morning Ritual Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group rounded-3xl overflow-hidden bg-[#140C08] border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0806]">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=85"
                  alt="Authentic boiling Indian chai served in earthen kulhad"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0D0806]/90 backdrop-blur-md border border-[#C69247]/40 text-[10px] font-mono text-[#DFAB5F]">
                    🏺 Assi Ghat Morning Ritual
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                  The First Steaming Handi
                </h3>
                <p className="text-xs text-[#D8CCC0]/80 font-light leading-relaxed">
                  Whole spices crushed in stone mortars meet fresh milk and Assam leaf, sending fragrant clouds of cardamom into the morning air.
                </p>
              </div>
            </motion.div>

            {/* Traditional Chai Imagery Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group rounded-3xl overflow-hidden bg-[#140C08] border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0806]">
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1000&auto=format&fit=crop&q=85"
                  alt="Spiced Indian chai poured with precision"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0D0806]/90 backdrop-blur-md border border-[#C69247]/40 text-[10px] font-mono text-[#DFAB5F]">
                    ☕ Timeless Baithak
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-base font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                  The Circle of Companions
                </h3>
                <p className="text-xs text-[#D8CCC0]/80 font-light leading-relaxed">
                  No one checks their watch. Each clay cup is sipped slowly, sealing conversations that linger far beyond dawn.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHERE OUR STORY BEGINS (Editorial Image-and-Text Layout) */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0A0604] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden border border-[#C69247]/35 bg-[#140C08] shadow-2xl aspect-[3/4] group">
                  <img
                    src="https://images.unsplash.com/photo-1561361066-5b4d4554b9d0?w=800&auto=format&fit=crop&q=80"
                    alt="Varanasi Ghats at Dawn"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/25 text-center shadow-md">
                  <span className="text-xs font-serif italic text-[#DFAB5F] block">Assi Ghat • Morning Raga</span>
                  <span className="text-[10px] text-[#D8CCC0]/70 font-mono">5:30 AM Daily Ritual</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/25 text-center shadow-md">
                  <span className="text-xs font-serif italic text-[#DFAB5F] block">Brass Handi Extraction</span>
                  <span className="text-[10px] text-[#D8CCC0]/70 font-mono">Pure Slow Flame</span>
                </div>
                <div className="rounded-3xl overflow-hidden border border-[#C69247]/35 bg-[#140C08] shadow-2xl aspect-[3/4] group">
                  <img
                    src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"
                    alt="Traditional Boiling Chai in Earthen Kulhad"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

            {/* Narrative Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
                <Feather className="w-3.5 h-3.5 text-[#DFAB5F]" />
                <span>WHERE OUR STORY BEGINS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#FBF6EE] leading-tight">
                The Sacred Dawn of Varanasi & the Spirit of the Adda
              </h2>

              <p className="text-[#D8CCC0]/90 text-sm sm:text-base leading-relaxed font-sans font-light">
                Long before the sun glazes the holy Ganga in liquid amber, the stone ghats of Varanasi stir awake. The clinking of brass ladles, the fragrance of crushed ginger hitting boiling water, and the low hum of morning prayers form the timeless overture to city life.
              </p>

              <p className="text-[#D8CCC0]/90 text-sm sm:text-base leading-relaxed font-sans font-light">
                Here on the ghats, tea is not a hurried commodity swallowed between meetings. It is a sacred pause. The <span className="text-[#DFAB5F] font-medium italic">Adda</span> was where saints sat beside boatmen, where poets debated timeless couplets, and where strangers transformed into lifelong companions.
              </p>

              <div className="pt-3 border-t border-[#C69247]/20 flex flex-wrap items-center gap-6 text-xs text-[#DFAB5F]">
                <div className="flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#DFAB5F]" />
                  <span>Generational Integrity</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <MapPin className="w-4 h-4 text-[#DFAB5F]" />
                  <span>Varanasi Roots</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR JOURNEY (Responsive Timeline: Horizontal Desktop / Vertical Mobile) */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-30 overflow-hidden bg-[#0D0806] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
              <Clock className="w-3.5 h-3.5" />
              <span>OUR JOURNEY • 1998 TO PRESENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#FBF6EE]">
              A Quarter Century of Unhurried Craft
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 font-sans font-light">
              From our modest founding on the banks of the sacred river to our contemporary tea sanctuaries.
            </p>
          </div>

          {/* Desktop Horizontal Timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting Glowing Golden Line */}
            <div className="absolute top-[180px] left-12 right-12 h-[2px] bg-gradient-to-r from-[#C69247]/20 via-[#DFAB5F] to-[#C69247]/20 z-0 shadow-[0_0_12px_rgba(223,171,95,0.5)]" />

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {timelineMilestones.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onMouseEnter={() => setActiveTimelineTab(idx)}
                  className="group relative flex flex-col cursor-pointer"
                >
                  {/* Top Milestone Card */}
                  <div className={`p-5 rounded-3xl bg-[#140C08]/95 border backdrop-blur-md shadow-xl transition-all duration-300 group-hover:-translate-y-2 ${
                    activeTimelineTab === idx 
                      ? "border-[#DFAB5F] shadow-[0_20px_40px_rgba(198,146,71,0.2)]" 
                      : "border-[#C69247]/30 hover:border-[#DFAB5F]/60"
                  }`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-2xl font-serif font-black text-gold-gradient">
                        {item.year}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1E130D] border border-[#C69247]/40 text-[#DFAB5F]">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-sm font-bold text-[#FBF6EE] mb-2 leading-snug group-hover:text-[#DFAB5F] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="my-5 mx-auto relative">
                    <div className={`w-11 h-11 rounded-full bg-[#1E130D] border-2 flex items-center justify-center text-sm transition-all duration-300 shadow-md ${
                      activeTimelineTab === idx 
                        ? "border-[#DFAB5F] scale-110 shadow-[0_0_20px_rgba(223,171,95,0.6)]" 
                        : "border-[#C69247]/60 group-hover:border-[#DFAB5F]"
                    }`}>
                      <span>{item.icon}</span>
                    </div>
                  </div>

                  {/* Bottom Tag */}
                  <div className="text-center">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#DFAB5F]/85">
                      {item.highlight}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Vertical Timeline */}
          <div className="lg:hidden relative pl-6 border-l-2 border-[#C69247]/40 space-y-8 ml-3">
            {timelineMilestones.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Node on vertical line */}
                <div className="absolute -left-[35px] top-1.5 w-8 h-8 rounded-full bg-[#1E130D] border-2 border-[#DFAB5F] flex items-center justify-center text-xs shadow-[0_0_12px_rgba(223,171,95,0.4)]">
                  <span>{item.icon}</span>
                </div>

                <div className="p-5 rounded-3xl bg-[#140C08]/95 border border-[#C69247]/35 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-serif font-black text-gold-gradient">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1E130D] border border-[#C69247]/30 text-[#DFAB5F]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-[#FBF6EE] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE ART OF BREWING */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#080403] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
                <Flame className="w-3.5 h-3.5" />
                <span>THE ART OF BREWING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#FBF6EE]">
                Patience in Every Simmer. Poetry in Every Pour.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 max-w-md font-sans font-light">
              We reject rapid syrups and automated machines. Our tea requires dedicated time, brass vessel heat, and whole indigenous spices.
            </p>
          </div>

          {/* 4-Card Luxury Brewing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brewingPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-[#140C08] border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-500 flex flex-col shadow-xl hover:shadow-[0_20px_40px_rgba(198,146,71,0.2)] hover:-translate-y-2"
              >
                {/* Image Container with Step Number Tag */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0806]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-transparent to-transparent" />
                  
                  {/* Step Chip */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#DFAB5F] text-[#0D0806] font-mono font-bold text-xs flex items-center justify-center shadow-md">
                      {pillar.step}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0D0806]/90 backdrop-blur-md border border-[#C69247]/40 text-[10px] font-mono text-[#DFAB5F]">
                      {pillar.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#DFAB5F]/85 block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light mt-2">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE ADDA PHILOSOPHY */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0D0806] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ADDA PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#FBF6EE]">
              What an &ldquo;Adda&rdquo; Truly Means
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 font-sans font-light">
              More than a cup of tea, it is a timeless cultural institution of hospitality and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addaValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="p-6 rounded-3xl bg-[#140C08]/90 border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-300 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1E130D] border border-[#C69247]/45 flex items-center justify-center text-[#DFAB5F] mb-5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(223,171,95,0.4)] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#FBF6EE] mb-2 group-hover:text-[#DFAB5F] transition-colors">
                    {val.title}
                  </h3>

                  <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CLOSING CTA */}
      {/* ========================================================================= */}
      <section className="relative py-24 md:py-34 overflow-hidden bg-gradient-to-b from-[#0D0806] via-[#140C08] to-[#060403] border-t border-[#C69247]/30 text-center">
        {/* Glow Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-[#DFAB5F]/20 via-[#C69247]/15 to-transparent rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#1E130D] border border-[#C69247]/50 text-xs font-mono uppercase tracking-[0.28em] text-[#DFAB5F] shadow-[0_0_20px_rgba(198,146,71,0.2)]">
            <Coffee className="w-3.5 h-3.5" />
            <span>JOIN OUR LIVING HERITAGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#FBF6EE] leading-tight">
            &ldquo;Some places serve chai. <br />
            <span className="text-gold-gradient italic font-normal drop-shadow-[0_5px_20px_rgba(223,171,95,0.3)]">
              Some places become a memory.&rdquo;
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D8CCC0]/85 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Step into our sanctuary, pull up a wooden stool, and experience the warmth of Varanasi&apos;s living tradition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4.5 pt-4">
            <Link
              href="/signature-chai"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-xs sm:text-sm uppercase tracking-[0.22em] shadow-[0_10px_30px_rgba(198,146,71,0.4)] hover:shadow-[0_15px_40px_rgba(223,171,95,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>EXPLORE OUR SIGNATURE CHAI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#visit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/50 text-[#DFAB5F] font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] hover:bg-[#C69247]/25 hover:border-[#DFAB5F] transition-all cursor-pointer shadow-lg"
            >
              <span>VISIT THE ADDA</span>
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
