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
  Leaf,
  Droplets,
  CheckCircle2,
  Layers
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Story3DCanvas } from "@/components/story/Story3DCanvas";
import { chaiAmbience } from "@/lib/audioAmbience";

export default function SignatureChaiPage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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

  const chaiMenu = [
    {
      id: "masala-chai",
      category: "classic",
      name: "Masala Chai",
      hindiName: "मसाला चाय",
      tagline: "Aromatic 7-spice stone-crushed blend with bold Indian character.",
      description:
        "Hand-pounded black pepper, clove, cinnamon, and fresh ginger simmered slowly with strong Upper Assam CTC leaves in heavy brass vessels. Robust, earthy, and intensely warming.",
      price: 140,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=85",
      badge: "Bestseller",
      notes: ["Clove & Cinnamon", "Upper Assam CTC", "Varanasi Kulhad"],
      accent: "from-amber-600/30 to-amber-950/10",
      spiceProfile: "Bold & Warming",
      brewTime: "25 Mins Slow Dum"
    },
    {
      id: "adrak-chai",
      category: "classic",
      name: "Adrak Chai",
      hindiName: "अदरक चाय",
      tagline: "Fresh mountain ginger with a fiery soothing finish.",
      description:
        "Crushed Himalayan ginger roots simmered until fiery and soothing, paired with rich whole milk. The quintessential Indian comfort brew that awakens the senses and revives the soul.",
      price: 130,
      image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800&auto=format&fit=crop&q=85",
      badge: "Adda Favorite",
      notes: ["Crushed Ginger", "Fiery Heat", "Digestive Warmth"],
      accent: "from-orange-600/30 to-amber-950/10",
      spiceProfile: "Fiery & Invigorating",
      brewTime: "20 Mins Simmer"
    },
    {
      id: "elaichi-chai",
      category: "classic",
      name: "Elaichi Chai",
      hindiName: "इलायची चाय",
      tagline: "Fragrant Idukki cardamom with a velvety floral finish.",
      description:
        "Whole organic green cardamom pods from the Western Ghats of Idukki crushed fresh per order. Delicately sweet, floral, and extraordinarily velvety with a smooth creamy mouthfeel.",
      price: 130,
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&auto=format&fit=crop&q=85",
      badge: "Aromatic",
      notes: ["Idukki Cardamom", "Floral Aroma", "Velvet Texture"],
      accent: "from-amber-700/30 to-neutral-950/10",
      spiceProfile: "Sweet & Floral",
      brewTime: "20 Mins Simmer"
    },
    {
      id: "kesar-chai",
      category: "royal",
      name: "Kesar Chai",
      hindiName: "केसर चाय",
      tagline: "Pure Kashmiri saffron for an unhurried royal experience.",
      description:
        "Authentic Mogra saffron threads from the valleys of Pampore infused into caramelized full-cream milk and golden Assam tips. A majestic decoction fit for royalty.",
      price: 180,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85",
      badge: "Royal Special",
      notes: ["24K Kashmiri Kesar", "Caramelized Dum", "Golden Tips"],
      accent: "from-yellow-600/30 to-amber-950/10",
      spiceProfile: "Rich Saffron & Honey",
      brewTime: "28 Mins Handi Dum"
    },
    {
      id: "handi-dum-chai",
      category: "royal",
      name: "Handi Dum Chai",
      hindiName: "दम चाय",
      tagline: "The 30-minute brass vessel sealed slow extraction.",
      description:
        "Sealed inside heavy brass handis over smoldering coals. The slow trapped steam extracts the deepest essence of single-estate leaves and whole spices, creating an ultra-thick, velvety brew.",
      price: 160,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=85",
      badge: "Heritage Craft",
      notes: ["Brass Handi Sealed", "Ultra Thick", "Smoldering Coal"],
      accent: "from-amber-800/30 to-neutral-950/10",
      spiceProfile: "Deep Malty Decoction",
      brewTime: "30 Mins Sealed Dum"
    },
    {
      id: "shahi-kahwa",
      category: "specialty",
      name: "Shahi Kashmiri Kahwa",
      hindiName: "शाही कहवा",
      tagline: "Green tea steeped with saffron, almonds, and wild spices.",
      description:
        "High-altitude whole green tea leaves slow-steeped in brass samovars with Kashmiri saffron, slivered almonds, crushed green cardamom, cinnamon, and a drizzle of raw forest honey.",
      price: 190,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=85",
      badge: "Samovar Brew",
      notes: ["Slivered Almonds", "Wild Honey", "Brass Samovar"],
      accent: "from-amber-500/30 to-amber-950/10",
      spiceProfile: "Delicate Saffron & Cinnamon",
      brewTime: "15 Mins Samovar Steep"
    }
  ];

  const filteredChai = selectedCategory === "all" 
    ? chaiMenu 
    : chaiMenu.filter(c => c.category === selectedCategory);

  const craftPillars = [
    {
      icon: Leaf,
      title: "Single-Estate Assam Harvest",
      description: "Harvested from high-elevation estates in Upper Assam for deep maltiness and rich golden liquor."
    },
    {
      icon: Droplets,
      title: "Fresh Whole Spice Infusion",
      description: "Cardamom pods, ginger root, cloves, and cinnamon quills hand-pounded just minutes before brewing."
    },
    {
      icon: Flame,
      title: "Brass Handi Slow Simmer",
      description: "Slow, uniform thermal conduction inside heavy brass pots ensures complete flavor extraction."
    },
    {
      icon: Layers,
      title: "Varanasi Kiln Terracotta",
      description: "Poured steaming hot into fresh unglazed clay kulhads that impart the timeless scent of first rain."
    }
  ];

  const foodPairings = [
    {
      name: "Irani Bun Maska",
      hindi: "बन मस्का",
      description: "Warm, pillowy brioche bun slathered with rich salted churned butter and a touch of cardamom sugar.",
      price: 90
    },
    {
      name: "Banarasi Samosa",
      hindi: "समोसा",
      description: "Golden flaky pastry filled with spiced cumin potatoes, green peas, and served with tamarind chutney.",
      price: 60
    },
    {
      name: "Crispy Mathri & Khari",
      hindi: "मठरी और खारी",
      description: "Layered artisanal puff pastries baked to a crisp golden crunch, ideal for dipping into hot chai.",
      price: 70
    },
    {
      name: "Kesar Peda & Sweets",
      hindi: "केसर पेड़ा",
      description: "Generational Varanasi milk fudge infused with saffron threads, pistachio slivers, and green cardamom.",
      price: 110
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
      {/* 1. SIGNATURE CHAI HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          {/* Breadcrumb & Sound Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C69247]/25 pb-4.5 mb-8 sm:mb-12"
          >
            {/* Breadcrumb: HOME / SIGNATURE CHAI */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono tracking-[0.22em] text-[#D8CCC0]/80">
              <Link 
                href="/" 
                className="hover:text-[#DFAB5F] transition-colors flex items-center gap-1.5 group"
              >
                <span className="group-hover:underline">HOME</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#C69247]" />
              <span className="text-[#DFAB5F] font-semibold drop-shadow-[0_0_8px_rgba(223,171,95,0.4)]">SIGNATURE CHAI</span>
            </nav>

            {/* Heritage Badge & Ambience Control */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#DFAB5F] shadow-[0_0_15px_rgba(198,146,71,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#DFAB5F] animate-ping" />
                <span>HANDCRAFTED DECOCTIONS • ESTD. 1998</span>
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
                  THE SACRED BREWS OF BANARAS
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#FBF6EE] leading-[1.06] tracking-tight">
                  Four Crafted Icons. <br />
                  <span className="text-gold-gradient italic font-normal drop-shadow-[0_4px_20px_rgba(223,171,95,0.25)]">
                    Steeped in Royal Heritage.
                  </span>
                </h1>
              </div>

              {/* Introductory Quotation Card */}
              <div className="relative pl-5 border-l-2 border-[#DFAB5F] py-2 bg-gradient-to-r from-[#DFAB5F]/10 via-[#C69247]/5 to-transparent rounded-r-2xl">
                <p className="text-base sm:text-xl font-serif text-[#DFAB5F] font-light leading-snug italic drop-shadow-sm">
                  &ldquo;A great chai is never born from impatience. It requires heavy brass handis, single-estate leaves, hand-pounded mountain spices, and the unhurried alchemy of slow flame.&rdquo;
                </p>
              </div>

              {/* Supporting Brand Paragraph */}
              <p className="text-[#D8CCC0]/90 text-sm sm:text-base leading-relaxed font-sans font-light">
                Each signature recipe at <strong className="text-[#FBF6EE] font-medium">Chai Ka Adda</strong> is an ode to ancient Indian tea traditions. We reject instant powders and automated machines. Every cup is brewed fresh from whole Assam leaves, stone-crushed spices, and rich milk, served piping hot in unglazed terracotta kulhads that release the quintessential earthy petrichor (*mitti ki khushboo*).
              </p>

              {/* Three Heritage Statistics */}
              <div className="grid grid-cols-3 gap-3.5 pt-2">
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
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Earthen Clay</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DFAB5F]" />
                    <span className="text-base sm:text-xl font-serif font-bold text-[#DFAB5F]">Zero</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#D8CCC0]/75 font-mono uppercase tracking-wider block">Artificial Flavors</span>
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
                      <span>Signature Heritage</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm text-[#FBF6EE] italic leading-snug">
                      &ldquo;Boiled with whole spices in brass vessels, served in earth that was fired in Varanasi kilns.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE SIGNATURE COLLECTION (Interactive Category Filter & Product Grid) */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0A0604] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
                <Coffee className="w-3.5 h-3.5 text-[#DFAB5F]" />
                <span>THE DECOCTION MENU</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE] leading-tight">
                Our Masterpiece Brews
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Brews" },
                { id: "classic", label: "Classic Adda" },
                { id: "royal", label: "Royal Heritage" },
                { id: "specialty", label: "Specialty" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-[#C69247] text-[#0D0806] font-bold shadow-[0_0_15px_rgba(198,146,71,0.4)]"
                      : "bg-[#1E130D]/90 text-[#D8CCC0]/80 border border-[#C69247]/30 hover:border-[#DFAB5F] hover:text-[#DFAB5F]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChai.map((chai, idx) => (
              <motion.div
                key={chai.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl p-6 bg-gradient-to-br from-[#1E130D]/95 via-[#140C08]/98 to-[#0A0604] border border-[#C69247]/30 hover:border-[#DFAB5F] shadow-xl hover:shadow-[0_25px_50px_rgba(198,146,71,0.2)] transition-all duration-500 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Ambient Light Bloom */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${chai.accent} rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Image Container with Badge */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-[#C69247]/25 bg-[#140C08]">
                    <img
                      src={chai.image}
                      alt={chai.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806]/90 via-transparent to-transparent" />

                    {chai.badge && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider bg-[#0D0806]/92 text-[#DFAB5F] border border-[#C69247]/50 backdrop-blur-md shadow-md">
                        {chai.badge}
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#DFAB5F]">
                      <span className="px-2 py-0.5 rounded-md bg-[#1E130D]/90 border border-[#C69247]/30">
                        ⏱ {chai.brewTime}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#1E130D]/90 border border-[#C69247]/30">
                        ✨ {chai.spiceProfile}
                      </span>
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-serif text-[#DFAB5F]/80">
                      {chai.hindiName}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8CCC0]/60">
                      Varanasi Earthen Kulhad
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors mb-2 leading-tight">
                    {chai.name}
                  </h3>

                  <p className="text-xs text-[#D8CCC0]/85 font-sans font-light leading-relaxed mb-4">
                    {chai.description}
                  </p>

                  {/* Notes Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {chai.notes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-[#1E130D] text-[#DFAB5F] border border-[#C69247]/25 group-hover:border-[#DFAB5F]/50 transition-colors font-mono"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Order CTA Row */}
                <div className="pt-4 border-t border-[#C69247]/20 flex items-center justify-between relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#D8CCC0]/60 block">
                      Single Serving
                    </span>
                    <span className="text-2xl font-serif font-black text-gold-gradient">
                      ₹{chai.price}
                    </span>
                  </div>

                  <Link
                    href="/#visit"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(198,146,71,0.3)] hover:shadow-[0_0_20px_rgba(223,171,95,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Taste at Adda</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE ALCHEMY OF INGREDIENTS */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0D0806] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CRAFT PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE]">
              The Alchemy of Ingredients
            </h2>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 font-sans font-light">
              From soil and sun to single-estate harvests and earthen kilns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
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
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AUTHENTIC ADDA PAIRINGS */}
      {/* ========================================================================= */}
      <section className="relative py-20 md:py-28 bg-[#0A0604] border-t border-[#C69247]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#DFAB5F]">
                <Sun className="w-3.5 h-3.5" />
                <span>AUTHENTIC ACCOMPANIMENTS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#FBF6EE]">
                Culinary Pairings for the Adda
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#D8CCC0]/80 max-w-md font-sans font-light">
              Freshly baked buns, crisp savories, and traditional Varanasi sweet bites designed to accompany your steaming kulhad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodPairings.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-3xl bg-[#140C08]/90 border border-[#C69247]/30 hover:border-[#DFAB5F] transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-serif text-[#DFAB5F]">
                      {item.hindi}
                    </span>
                    <span className="text-lg font-serif font-bold text-gold-gradient">
                      ₹{item.price}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#FBF6EE] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#D8CCC0]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C69247]/15 flex items-center gap-2 text-[10px] font-mono text-[#DFAB5F]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fresh Daily at Sanctuary</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLOSING CTA */}
      {/* ========================================================================= */}
      <section className="relative py-24 md:py-34 overflow-hidden bg-gradient-to-b from-[#0D0806] via-[#140C08] to-[#060403] border-t border-[#C69247]/30 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-[#DFAB5F]/20 via-[#C69247]/15 to-transparent rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#1E130D] border border-[#C69247]/50 text-xs font-mono uppercase tracking-[0.28em] text-[#DFAB5F] shadow-[0_0_20px_rgba(198,146,71,0.2)]">
            <Coffee className="w-3.5 h-3.5" />
            <span>THE VARANASI SANCTUARY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#FBF6EE] leading-tight">
            &ldquo;Every sip is a conversation. <br />
            <span className="text-gold-gradient italic font-normal drop-shadow-[0_5px_20px_rgba(223,171,95,0.3)]">
              Every pour is a legacy.&rdquo;
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D8CCC0]/85 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Visit our flagship tea house in Connaught Place or explore our 25-year heritage on the sacred riverbanks of Varanasi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4.5 pt-4">
            <Link
              href="/#visit"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-xs sm:text-sm uppercase tracking-[0.22em] shadow-[0_10px_30px_rgba(198,146,71,0.4)] hover:shadow-[0_15px_40px_rgba(223,171,95,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>VISIT THE ADDA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1E130D]/95 border border-[#C69247]/50 text-[#DFAB5F] font-semibold text-xs sm:text-sm uppercase tracking-[0.22em] hover:bg-[#C69247]/25 hover:border-[#DFAB5F] transition-all cursor-pointer shadow-lg"
            >
              <span>DISCOVER OUR STORY</span>
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
