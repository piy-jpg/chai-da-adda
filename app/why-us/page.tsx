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
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Clock,
  HeartHandshake,
  Award,
  Leaf,
  Globe2,
  Users,
  Compass,
  Check,
  X,
  Droplets,
  Star,
  Quote
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Story3DCanvas } from "@/components/story/Story3DCanvas";
import { chaiAmbience } from "@/lib/audioAmbience";

export default function WhyUsPage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
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
      rotX: -((y - centerY) / centerY) * 10,
      rotY: ((x - centerX) / centerX) * 10,
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, x: 0, y: 0 });
  };

  const pillars = [
    {
      id: "leaf",
      category: "ingredients",
      icon: Leaf,
      title: "100% Single-Estate CTC Leaf",
      subtitle: "Zero Factory Dust • Upper Assam",
      description:
        "We reject mass-market commercial tea dust. Our leaves are sourced exclusively from single heritage tea estates in Upper Assam and Makaibari Darjeeling, plucked during peak second flush for unparalleled brisk maltiness and golden liquor.",
      badge: "Pure Harvest",
      highlight: "Estate-Graded BP & BOP",
      stat: "100%",
      statLabel: "Whole Leaf Integrity"
    },
    {
      id: "dum",
      category: "brewing",
      icon: Flame,
      title: "25-Minute Slow Handi Dum",
      subtitle: "Patience Over Pressurized Steam",
      description:
        "Commercial cafés blast pre-made liquid concentrate with high-pressure steam. We brew in heavy virgin brass handis over simmering embers for 25 continuous minutes, allowing the decoction to marry deeply with whole dairy and freshly pounded spices.",
      badge: "Slow Craft",
      highlight: "Continuous Caramelization",
      stat: "25 Min",
      statLabel: "Slow Dum Boiling"
    },
    {
      id: "spices",
      category: "ingredients",
      icon: Sparkles,
      title: "Hand-Crushed Whole Spices",
      subtitle: "Zero Powders • Zero Syrups",
      description:
        "We never use chemical essence droplets or shelf-stable chai syrups. Every morning, green Idukki cardamom pods, crushed ginger roots, Ceylon cinnamon quills, and Kashmiri saffron threads are freshly stone-mortared in small batches.",
      badge: "Raw Botanicals",
      highlight: "Stone Sil-Batta Pounded",
      stat: "0%",
      statLabel: "Artificial Flavorings"
    },
    {
      id: "terracotta",
      category: "sustainability",
      icon: Droplets,
      title: "Varanasi Kiln-Baked Terracotta",
      subtitle: "Zero Plastic • 100% Biodegradable",
      description:
        "Paper cups leach microplastics and ruin aroma; plastic cups pollute the earth. Our signature clay kulhads are hand-thrown by generational potters in Mirzapur and baked in wood kilns. Porous clay infuses every sip with sacred petrichor (mitti ki khushboo).",
      badge: "Circular Craft",
      highlight: "Returns to Soil in 7 Days",
      stat: "150+",
      statLabel: "Artisan Families"
    },
    {
      id: "milk",
      category: "ingredients",
      icon: ShieldCheck,
      title: "Slow-Reduced Farm Dairy",
      subtitle: "Full-Cream • Never UHT Processed",
      description:
        "Our dairy arrives fresh daily from vetted ethical local farms. We gently reduce the whole milk over low flames until the natural lactose condenses into rich sweetness, eliminating the need for excessive refined sugar.",
      badge: "Farm Direct",
      highlight: "Rich Silky Mouthfeel",
      stat: "100%",
      statLabel: "Pure Whole Milk"
    },
    {
      id: "baithak",
      category: "experience",
      icon: Users,
      title: "Egalitarian Baithak Soul",
      subtitle: "A Sanctuary Free of Rush",
      description:
        "In a world where cafés rush you out with timers and loud music, our Adda is built on timeless Indian hospitality. Here, scholars debate, poets compose, and travelers pause over endless refills without judgment or haste.",
      badge: "Timeless Adda",
      highlight: "Conversations Welcome",
      stat: "∞",
      statLabel: "Unrushed Hours"
    }
  ];

  const comparisonRows = [
    {
      feature: "Tea Leaf Quality",
      us: "100% Single-Estate Upper Assam Whole Leaf (Second Flush)",
      commercial: "Industrial mass-market tea dust & machine fannings",
      roadside: "Mixed blend local dust tea",
      isAdvantage: true
    },
    {
      feature: "Brewing Method",
      us: "25-Minute patient slow Dum in heavy virgin brass handis",
      commercial: "Instant boiler concentrate blasted with milk steam",
      roadside: "Quick 2-minute surface boiling",
      isAdvantage: true
    },
    {
      feature: "Spice Sourcing",
      us: "Freshly stone-mortared whole spices (Idukki cardamom, ginger, saffron)",
      commercial: "Artificial liquid syrups, premix chemical powders",
      roadside: "Pre-ground commercial masala spice blend",
      isAdvantage: true
    },
    {
      feature: "Serving Vessel",
      us: "100% Kiln-baked unglazed Varanasi clay kulhad (Zero plastic)",
      commercial: "Single-use polyethylene-lined paper & plastic cups",
      roadside: "Reused glass or thin non-recyclable plastic cups",
      isAdvantage: true
    },
    {
      feature: "Milk & Emulsion",
      us: "Farm-fresh whole milk slow-reduced for natural sweetness",
      commercial: "Reconstituted UHT boxed milk or synthetic whiteners",
      roadside: "Diluted dairy with heavy water ratio",
      isAdvantage: true
    },
    {
      feature: "Space & Hospitality",
      us: "Soulful low-lit baithak sanctuary with classical acoustic sitar",
      commercial: "Fast-casual turn-around, cold corporate seating",
      roadside: "Standing curbside with traffic noise & dust",
      isAdvantage: true
    },
    {
      feature: "Ecological Footprint",
      us: "100% Circular & Biodegradable (Clay returns to earth)",
      commercial: "Millions of non-biodegradable cups in landfills",
      roadside: "Plastic cup littering roadside gutters",
      isAdvantage: true
    }
  ];

  const testimonials = [
    {
      quote:
        "Chai Ka Adda has accomplished what hundred-crore coffee chains couldn't: giving Indian chai the Michelin-level craft and soulful reverence it has always deserved.",
      author: "Vikramaditya Sengupta",
      role: "Culinary Historian & Author",
      location: "New Delhi",
      stars: 5,
      highlight: "Michelin-level reverence"
    },
    {
      quote:
        "The petrichor aroma when you raise their earthen kulhad to your lips is unmistakable. You can taste the 25 minutes of brass dum patience in every velvety drop.",
      author: "Radhika Mehra",
      role: "Tea Sommelier & Master Taster",
      location: "Kolkata & London",
      stars: 5,
      highlight: "Unmistakable petrichor"
    },
    {
      quote:
        "In a city addicted to rushed digital notifications, stepping into their baithak feels like entering a time capsule of pure Banaras tranquility and genuine human connection.",
      author: "Arjun Nambiar",
      role: "Regular Adda Connoisseur",
      location: "Varanasi / Delhi",
      stars: 5,
      highlight: "Time capsule of tranquility"
    }
  ];

  const filteredPillars = selectedFilter === "all" 
    ? pillars 
    : pillars.filter(p => p.category === selectedFilter);

  return (
    <div className="min-h-screen bg-[#0A0604] text-[#FBF6EE] selection:bg-[#DFAB5F] selection:text-[#0A0604] font-sans antialiased subpixel-antialiased relative overflow-x-hidden">
      {/* 3D Steam Particle Canvas */}
      <Story3DCanvas />

      {/* Film Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-soft-light film-grain z-40" />

      {/* Global Shared Header */}
      <Navbar />

      <main className="relative z-10">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 overflow-hidden">
          {/* Razor-Sharp Ambient Backlight */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-[#DFAB5F]/15 via-[#C69247]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Top Breadcrumb & Sound Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#DFAB5F] uppercase">
                <Link href="/" className="hover:text-[#FBF6EE] transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#C69247]/70" />
                <span className="text-[#FBF6EE] font-semibold tracking-wider">Why Us</span>
              </nav>

              {/* Ambient Audio Pill Toggle */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={toggleSound}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C69247]/50 bg-[#170E09]/95 backdrop-blur-md text-[#DFAB5F] text-xs font-mono uppercase tracking-wider hover:border-[#DFAB5F] hover:shadow-[0_0_15px_rgba(223,171,95,0.25)] transition-all duration-300 shadow-md group cursor-pointer"
                title="Toggle authentic Adda soundscape"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-semibold">Adda Ambience (Live)</span>
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 transition-opacity" />
                    <span>Play Ambience</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Hero Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Headlines & Editorial Manifesto (7 cols) */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                {/* Vintage Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/50 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                >
                  <Sparkles className="w-3 h-3 text-[#DFAB5F]" />
                  <span>THE VARANASI STANDARD • CRAFT OVER CONVENIENCE</span>
                </motion.div>

                {/* Editorial Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#FBF6EE] leading-[1.12]"
                >
                  Crafted Without Compromise.{" "}
                  <span className="block mt-2 font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247] drop-shadow-sm">
                    Why Chai Ka Adda Stands Apart.
                  </span>
                </motion.h1>

                {/* Descriptive Paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-sm sm:text-[15px] text-[#E5D8CC] font-light leading-relaxed max-w-2xl"
                >
                  In a commercial landscape flooded with instant tea vending powders, artificial syrups, and microplastic-lined paper cups, Chai Ka Adda exists as a fierce protector of authentic Indian tea heritage. We refuse shortcuts. Every single cup is an uncompromised ritual of pure river clay, whole-estate leaves, and 25 minutes of patient brass handi dum.
                </motion.p>

                {/* Quick Trust Badges Strip with Razor Borders */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1"
                >
                  {[
                    { number: "100%", label: "Single-Estate Leaf" },
                    { number: "25 Min", label: "Slow Brass Dum" },
                    { number: "0%", label: "Artificial Flavors" },
                    { number: "150+", label: "Varanasi Potters" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#160D09]/90 border border-[#C69247]/35 hover:border-[#DFAB5F] hover:shadow-[0_0_15px_rgba(223,171,95,0.2),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-200 group"
                    >
                      <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFAB5F] group-hover:scale-105 transition-transform origin-left">
                        {stat.number}
                      </span>
                      <span className="block text-[11px] font-mono text-[#D8CCC0]/80 uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="flex flex-wrap items-center gap-4 pt-2"
                >
                  <a
                    href="#comparison"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0A0604] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-[0_4px_25px_rgba(198,146,71,0.35)] cursor-pointer"
                  >
                    <span>View Comparison Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/signature-chai"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#C69247]/50 bg-[#1C110B] text-[#DFAB5F] font-bold text-xs uppercase tracking-widest hover:border-[#DFAB5F] hover:bg-[#251811] transition-all cursor-pointer shadow-sm"
                  >
                    <span>Explore Our Brews</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>

              {/* Right Column: 3D Tilt Card with Authenticity Guarantee (5 cols) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 flex justify-center"
              >
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={
                    shouldReduceMotion
                      ? undefined
                      : {
                          transform: `perspective(1000px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
                          transition: "transform 0.12s ease-out",
                        }
                  }
                  className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1C110B] via-[#140C08] to-[#0A0604] p-6 sm:p-7 border border-[#C69247]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(198,146,71,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] group overflow-hidden"
                >
                  {/* Dynamic Pointer Specular Glare */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(400px circle at ${tilt.x || 200}px ${tilt.y || 200}px, rgba(223, 171, 95, 0.2), transparent 70%)`,
                    }}
                  />

                  {/* Corner Accent Rivets */}
                  <div className="absolute top-3.5 left-3.5 w-1.5 h-1.5 rounded-full bg-[#DFAB5F]/60 border border-[#DFAB5F]" />
                  <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#DFAB5F]/60 border border-[#DFAB5F]" />
                  <div className="absolute bottom-3.5 left-3.5 w-1.5 h-1.5 rounded-full bg-[#DFAB5F]/60 border border-[#DFAB5F]" />
                  <div className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-[#DFAB5F]/60 border border-[#DFAB5F]" />

                  {/* Card Header Badge */}
                  <div className="flex items-center justify-between border-b border-[#C69247]/30 pb-3.5 mb-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#DFAB5F]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DFAB5F]">
                        Authenticity Oath
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#D8CCC0]/70 uppercase tracking-widest">
                      ESTD. 1998
                    </span>
                  </div>

                  {/* Featured Image with Precision Border */}
                  <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#C69247]/35 mb-5 group/img shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=85"
                      alt="Traditional Varanasi Kulhad Chai with authentic clay pot"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#FBF6EE]">
                      <span className="bg-[#0A0604]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C69247]/40">
                        Varanasi Riverbank Earthenware
                      </span>
                      <span className="text-[#DFAB5F] font-bold">100% Raw Clay</span>
                    </div>
                  </div>

                  {/* Sacred Guarantees List */}
                  <div className="space-y-2.5 font-sans text-xs">
                    {[
                      "No machine crush dust — only whole estate leaf",
                      "Zero liquid essence, chemical tea premix, or corn syrups",
                      "Simmered 25 minutes in pure brass handis",
                      "Freshly stone-pounded green cardamom & root ginger",
                      "Served exclusively in kiln-fired, unglazed kulhads"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[#E0D4C8]">
                        <Check className="w-3.5 h-3.5 text-[#DFAB5F] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stamp of Purity */}
                  <div className="mt-5 pt-3.5 border-t border-[#C69247]/25 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#DFAB5F]" />
                      <span className="text-[11px] font-mono text-[#DFAB5F] font-bold uppercase tracking-wider">
                        Heritage Certified
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#D8CCC0]/70">
                      Seal No. CA-1998-VNS
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: THE 6 UNSHAKEABLE PILLARS                                      */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>UNCOMPROMISED STANDARDS</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                The Six Pillars of{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                  Pure Varanasi Chai
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed">
                Every cup poured at Chai Ka Adda is guided by six non-negotiable principles established at our first riverbank stall in 1998.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                {[
                  { id: "all", label: "All Pillars" },
                  { id: "ingredients", label: "Pure Ingredients" },
                  { id: "brewing", label: "Handi Dum Craft" },
                  { id: "sustainability", label: "Terracotta Earth" },
                  { id: "experience", label: "The Baithak" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      selectedFilter === tab.id
                        ? "bg-[#DFAB5F] text-[#0A0604] font-bold shadow-[0_0_15px_rgba(223,171,95,0.35)]"
                        : "bg-[#140C08] text-[#D8CCC0] border border-[#C69247]/30 hover:border-[#DFAB5F] hover:text-[#DFAB5F]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                    className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#180F0A] to-[#100906] border border-[#C69247]/40 hover:border-[#DFAB5F] hover:shadow-[0_0_20px_rgba(223,171,95,0.18),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-200 shadow-[0_15px_35px_rgba(0,0,0,0.7)] group flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#22150E] border border-[#C69247]/45 flex items-center justify-center text-[#DFAB5F] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(223,171,95,0.3)] transition-all duration-200">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#DFAB5F] bg-[#170E09] border border-[#C69247]/35">
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Pillar Title & Subtitle */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-mono text-[#DFAB5F] uppercase tracking-widest mb-3.5">
                        {pillar.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#E0D4C8] font-light leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bottom Highlight Stat Strip */}
                    <div className="pt-4 border-t border-[#C69247]/25 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-[#D8CCC0]/70 block text-[10px] uppercase">
                          {pillar.statLabel}
                        </span>
                        <span className="text-[#DFAB5F] font-bold text-sm">
                          {pillar.stat}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#FBF6EE] bg-[#1C110B] px-2.5 py-1 rounded-md border border-[#C69247]/35">
                        {pillar.highlight}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE HONEST COMPARISON MATRIX                                  */}
        {/* ========================================================================= */}
        <section id="comparison" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 bg-[#070402] relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F]">
                <Compass className="w-3.5 h-3.5" />
                <span>UNFILTERED COMPARISON</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                How We Compare to{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                  The Rest
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed">
                An honest, side-by-side look at how traditional artisanal brewing stands above industrial convenience and commercial shortcuts.
              </p>
            </div>

            {/* Matrix Table Container */}
            <div className="overflow-x-auto rounded-3xl border border-[#C69247]/45 bg-[#120B07]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#C69247]/35 bg-[#1C110B]">
                    <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-widest text-[#D8CCC0] w-1/4">
                      Craft Dimension
                    </th>
                    <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-widest text-[#DFAB5F] font-bold w-1/3 bg-[#24160E] border-x border-[#C69247]/50">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-[#DFAB5F]" />
                        <span>CHAI KA ADDA</span>
                        <span className="text-[9px] bg-[#DFAB5F] text-[#0A0604] px-2 py-0.5 rounded-full font-black">
                          OUR STANDARD
                        </span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-widest text-[#D8CCC0]/80 w-1/4">
                      Commercial Coffee Chains
                    </th>
                    <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-widest text-[#D8CCC0]/80 w-1/4">
                      Standard Tea Stalls
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#C69247]/20 font-sans text-xs sm:text-[13px]">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#1E130D]/50 transition-colors group"
                    >
                      {/* Feature Column */}
                      <td className="p-4 sm:p-5 font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                        {row.feature}
                      </td>

                      {/* Chai Ka Adda Column (Gold Highlighted) */}
                      <td className="p-4 sm:p-5 bg-[#1A100A]/85 border-x border-[#C69247]/40 text-[#FBF6EE] font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#DFAB5F] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.us}</span>
                        </div>
                      </td>

                      {/* Commercial Chains Column */}
                      <td className="p-4 sm:p-5 text-[#D8CCC0]/80">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{row.commercial}</span>
                        </div>
                      </td>

                      {/* Standard Stalls Column */}
                      <td className="p-4 sm:p-5 text-[#D8CCC0]/80">
                        <div className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono font-bold">
                            ~
                          </span>
                          <span className="leading-relaxed">{row.roadside}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Footnote */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D8CCC0]/70">
              <p>✓ All assertions audited and verified in our open kitchen brewery.</p>
              <div className="flex items-center gap-2 text-[#DFAB5F]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero compromises since October 1998</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: ARTISAN SOVEREIGNTY & SUSTAINABILITY IMPACT                    */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Visual Artisan Showcase (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-[#C69247]/45 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
                  <img
                    src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&auto=format&fit=crop&q=85"
                    alt="Master Potter in Varanasi shaping raw clay tea kulhad on wheel"
                    className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-[#0A0604]/30 to-transparent" />

                  {/* Overlay Quote Card */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-[#140C08]/95 backdrop-blur-xl border border-[#C69247]/45 shadow-lg">
                    <p className="font-serif italic text-xs sm:text-sm text-[#FBF6EE] leading-relaxed mb-2">
                      &ldquo;When a customer drinks from my kulhad and places it on the ground, the clay returns to mother earth within a week. That is true purity.&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#DFAB5F]">
                      <span>— Ramprasad Prajapati</span>
                      <span className="text-[#D8CCC0]/70">3rd-Gen Master Potter</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Measurable Impact (7 cols) */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F]">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>EARTH & ARTISAN ALLIANCE</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                  Protecting the Planet,{" "}
                  <span className="block mt-1 italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                    One Terracotta Kulhad at a Time.
                  </span>
                </h2>

                <p className="text-sm sm:text-[15px] text-[#E5D8CC] font-light leading-relaxed">
                  Every year, urban coffee and tea chains generate tens of millions of single-use paper cups coated with toxic non-biodegradable polyethylene linings. At Chai Ka Adda, we have maintained a 100% plastic-free serving vessel model since our inception.
                </p>

                {/* Impact Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-[#140C08] border border-[#C69247]/35 shadow-inner">
                    <span className="block font-serif text-2xl font-bold text-[#DFAB5F]">
                      500,000+
                    </span>
                    <span className="block text-xs font-mono text-[#FBF6EE] uppercase mt-1">
                      Kulhads Hand-Thrown
                    </span>
                    <span className="block text-[11px] text-[#D8CCC0]/70 mt-1">
                      Made exclusively from organic Ganga silt clay
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#140C08] border border-[#C69247]/35 shadow-inner">
                    <span className="block font-serif text-2xl font-bold text-[#DFAB5F]">
                      150+ Families
                    </span>
                    <span className="block text-xs font-mono text-[#FBF6EE] uppercase mt-1">
                      Artisan Potters
                    </span>
                    <span className="block text-[11px] text-[#D8CCC0]/70 mt-1">
                      Guaranteed fair-wage year-round livelihood
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#140C08] border border-[#C69247]/35 shadow-inner">
                    <span className="block font-serif text-2xl font-bold text-[#DFAB5F]">
                      0 Grams
                    </span>
                    <span className="block text-xs font-mono text-[#FBF6EE] uppercase mt-1">
                      Single-Use Plastic
                    </span>
                    <span className="block text-[11px] text-[#D8CCC0]/70 mt-1">
                      Completely zero waste circular cycle
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1C110B] border border-[#C69247]/35 text-xs text-[#E0D4C8]">
                    <HeartHandshake className="w-5 h-5 text-[#DFAB5F] shrink-0" />
                    <span>
                      When you drink at Chai Ka Adda, 100% of the kulhad value goes directly into the bank accounts of traditional potting guilds in Mirzapur and Varanasi.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: HERITAGE TRUST & CONNOISSEUR TESTIMONIALS                     */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 bg-[#070402]">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F]">
                <Star className="w-3.5 h-3.5 text-[#DFAB5F]" />
                <span>VOICES OF DEVOTION</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                Trusted by Connoisseurs &{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                  Tea Sommeliers
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed">
                Hear why historians, master tea tasters, and everyday regulars consider our brass handi dum the gold standard of Indian tea.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {testimonials.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#180F0A] to-[#100906] border border-[#C69247]/40 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.06)] relative group"
                >
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-[#DFAB5F]/20 absolute top-6 right-6 group-hover:text-[#DFAB5F]/40 transition-colors" />

                  <div>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#DFAB5F] text-[#DFAB5F]" />
                      ))}
                    </div>

                    {/* Tag Pill */}
                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-[#DFAB5F] bg-[#1C110B] px-2.5 py-1 rounded-md border border-[#C69247]/35 mb-4 font-semibold">
                      {item.highlight}
                    </span>

                    {/* Quote Text */}
                    <p className="font-serif italic text-sm sm:text-[15px] text-[#FBF6EE] leading-relaxed mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="pt-4 border-t border-[#C69247]/25 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#FBF6EE]">
                        {item.author}
                      </h4>
                      <p className="text-xs text-[#D8CCC0]/80 font-sans">
                        {item.role}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#DFAB5F]">
                      {item.location}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: FINAL CTA                                                     */}
        {/* ========================================================================= */}
        <section className="pt-20 sm:pt-24 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
          {/* Golden Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-r from-[#DFAB5F]/15 via-[#C69247]/10 to-[#A84924]/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1C110B] border-2 border-[#DFAB5F]/70 flex items-center justify-center text-[#DFAB5F] mx-auto shadow-[0_0_35px_rgba(223,171,95,0.4)]"
            >
              <Coffee className="w-8 h-8 sm:w-10 sm:h-10 text-[#DFAB5F]" />
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FBF6EE] tracking-tight">
              Don&apos;t Settle for Ordinary Tea.{" "}
              <span className="block mt-2 italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                Experience The Sacred Craft.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed max-w-2xl mx-auto">
              Step away from the rushed city noise. Find a seat in our Baithak, breathe in the petrichor of warm terracotta, and savor the unforgettable depth of slow-brewed brass handi chai.
            </p>

            {/* CTA Buttons Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0A0604] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-[0_4px_30px_rgba(198,146,71,0.4)] cursor-pointer"
              >
                <span>Visit The Flagship Adda</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/signature-chai"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#C69247]/60 bg-[#1C110B] text-[#DFAB5F] font-bold text-xs uppercase tracking-widest hover:border-[#DFAB5F] hover:bg-[#251811] transition-all cursor-pointer shadow-sm"
              >
                <span>Explore Signature Menu</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#C69247]/40 bg-[#140C08] text-[#D8CCC0] font-medium text-xs uppercase tracking-widest hover:border-[#DFAB5F] hover:text-[#DFAB5F] transition-all cursor-pointer"
              >
                <span>Read Our Heritage</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Flagship Location Stamp */}
            <div className="pt-4 text-xs font-mono text-[#D8CCC0]/70 flex items-center justify-center gap-2">
              <span>Plot 18, Heritage Courtyard, Connaught Place, New Delhi</span>
              <span>•</span>
              <span className="text-[#DFAB5F] font-semibold">Open 6 AM – 2 AM Daily</span>
            </div>
          </div>
        </section>
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
}
