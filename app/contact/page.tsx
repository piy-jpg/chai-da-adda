"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Coffee,
  Volume2,
  VolumeX,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  Send,
  CheckCircle2,
  Calendar,
  Users,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Heart,
  Car,
  Compass,
  HelpCircle,
  Flame,
  CheckCheck
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Story3DCanvas } from "@/components/story/Story3DCanvas";
import { chaiAmbience } from "@/lib/audioAmbience";

export default function ContactPage() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("reservation");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "2 Guests (Intimate Circle)",
    date: "",
    time: "Evening Dum (6:00 PM - 9:00 PM)",
    type: "Traditional Baithak Reservation",
    message: "",
  });

  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleSound = () => {
    const isPlaying = chaiAmbience.toggle();
    setIsPlayingAudio(isPlaying);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  const contactFaqs = [
    {
      q: "Do I need a reservation just to have a cup of chai?",
      a: "Never! Walk-ins are always welcomed with open arms in the true spirit of an authentic Indian tea stall. Tables are reserved only for larger gatherings of 6+ or exclusive cultural addas."
    },
    {
      q: "Are laptops and remote work allowed in the sanctuary?",
      a: "Yes, our outdoor courtyard and mezzanine corners provide peaceful spots with power access. Our central ground Baithak is kept unplugged to encourage genuine face-to-face conversations."
    },
    {
      q: "Can we host private poetry readings, musical baithaks, or corporate tea tastings?",
      a: "Absolutely. We regularly host private cultural gatherings, book launches, and custom estate tea tasting flights. Select 'Private Gathering / Cultural Adda' in our form."
    },
    {
      q: "Is parking and guest valet available at Connaught Place?",
      a: "Yes, complimentary guest valet parking is available right at our courtyard entrance on Inner Circle (near Central Park Gate 3) from 11:00 AM to 1:30 AM."
    },
    {
      q: "Can I take the handmade terracotta kulhad home as a keepsake?",
      a: "Yes! Every single kulhad is 100% natural kiln-baked Varanasi clay. You are welcome to take yours home as a keepsake, or place it in our courtyard potters' bin to return naturally to mother earth."
    }
  ];

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
                <span className="text-[#FBF6EE] font-semibold tracking-wider">Contact & Sanctuary</span>
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
              {/* Left Column: Headlines & Contact Quick Links (7 cols) */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                {/* Vintage Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/50 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                >
                  <Sparkles className="w-3 h-3 text-[#DFAB5F]" />
                  <span>CONNAUGHT PLACE FLAGSHIP • OPEN 6 AM – 2 AM DAILY</span>
                </motion.div>

                {/* Editorial Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#FBF6EE] leading-[1.12]"
                >
                  Step Into The Sanctuary.{" "}
                  <span className="block mt-2 font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247] drop-shadow-sm">
                    Connect With Our Curators.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-sm sm:text-[15px] text-[#E5D8CC] font-light leading-relaxed max-w-2xl"
                >
                  Whether you are planning an intimate tea tasting, seeking table reservations for a gathering of minds, inquiring about whole-leaf heritage tea boxes, or simply finding your way to our brass handi hearth — we are delighted to welcome you.
                </motion.p>

                {/* Live Status Pill with Crisp Border */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#140C08]/95 border border-emerald-500/40 max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(52,211,153,0.1)]"
                >
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_#34D399]" />
                  </span>
                  <div className="text-xs font-mono">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                      Open Daily • 6:00 AM – 2:00 AM
                    </span>
                    <span className="text-[#D8CCC0]/85 text-[11px] block mt-0.5">
                      Simmering fresh saffron & ginger dum continuously. Walk-ins always welcome.
                    </span>
                  </div>
                </motion.div>

                {/* Direct Contact Cards Strip with Crisp Borders & Specular Glow */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1"
                >
                  {/* Phone Call */}
                  <a
                    href="tel:+917300212948"
                    className="p-4 rounded-2xl bg-[#160D09]/90 border border-[#C69247]/35 hover:border-[#DFAB5F] hover:bg-[#1F130D] hover:shadow-[0_0_20px_rgba(223,171,95,0.2),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-200 group block"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Phone className="w-4 h-4 text-[#DFAB5F] group-hover:scale-110 transition-transform" />
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C69247]/70 group-hover:text-[#DFAB5F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <span className="text-[10px] font-mono text-[#D8CCC0]/70 uppercase tracking-widest block">
                      Direct Hotline
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] block mt-0.5">
                      +91 73002 12948
                    </span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917300212948?text=Namaste%20Chai%20Ka%20Adda,%20I%20would%20like%20to%20inquire%20about%20a%20visit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-[#160D09]/90 border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#121E14] hover:shadow-[0_0_20px_rgba(37,211,102,0.2),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-200 group block"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#25D366]/70 group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <span className="text-[10px] font-mono text-[#D8CCC0]/70 uppercase tracking-widest block">
                      WhatsApp Concierge
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 group-hover:text-emerald-300 block mt-0.5">
                      Instant Live Chat
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:namaste@chaikaadda.com"
                    className="p-4 rounded-2xl bg-[#160D09]/90 border border-[#C69247]/35 hover:border-[#DFAB5F] hover:bg-[#1F130D] hover:shadow-[0_0_20px_rgba(223,171,95,0.2),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-200 group block"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Mail className="w-4 h-4 text-[#DFAB5F] group-hover:scale-110 transition-transform" />
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C69247]/70 group-hover:text-[#DFAB5F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <span className="text-[10px] font-mono text-[#D8CCC0]/70 uppercase tracking-widest block">
                      Electronic Epistle
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] truncate block mt-0.5">
                      namaste@chaikaadda.com
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* Right Column: 3D Sanctuary Location Card (5 cols) */}
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
                      <MapPin className="w-4.5 h-4.5 text-[#DFAB5F]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DFAB5F]">
                        Flagship Address
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#D8CCC0]/70 uppercase tracking-widest">
                      CP • NEW DELHI
                    </span>
                  </div>

                  {/* Featured Image with Precision Border & Vignette */}
                  <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#C69247]/35 mb-5 group/img shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85"
                      alt="Chai Ka Adda Flagship Courtyard Sanctuary in New Delhi"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-[#0A0604]/20 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#FBF6EE]">
                      <span className="bg-[#0A0604]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C69247]/40 shadow-sm">
                        Heritage Courtyard
                      </span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-[#0A0604]/90 px-2.5 py-1 rounded-full border border-emerald-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Open Now
                      </span>
                    </div>
                  </div>

                  {/* Address Text Content */}
                  <div className="space-y-2 font-sans text-xs mb-5">
                    <strong className="text-sm font-serif text-[#FBF6EE] block">
                      Plot 18, Heritage Courtyard, Inner Circle
                    </strong>
                    <p className="text-[#E0D4C8] leading-relaxed">
                      Connaught Place, New Delhi — 110001
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#DFAB5F]">
                      <Navigation className="w-3.5 h-3.5 shrink-0" />
                      <span>Near Central Park Metro Gate 3</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#D8CCC0]/80">
                      <Car className="w-3.5 h-3.5 text-[#DFAB5F] shrink-0" />
                      <span>Complimentary Valet at Courtyard Gate</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-[#C69247]/25 grid grid-cols-2 gap-3">
                    <a
                      href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0A0604] font-bold text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(198,146,71,0.3)] hover:brightness-110 active:scale-98 transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>

                    <button
                      onClick={() => handleCopy("Plot 18, Heritage Courtyard, Inner Circle, Connaught Place, New Delhi - 110001", "address")}
                      className="py-2.5 px-3 rounded-xl bg-[#1E130D] border border-[#C69247]/50 text-[#DFAB5F] font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:border-[#DFAB5F] hover:bg-[#251811] transition-all cursor-pointer shadow-sm"
                    >
                      {copiedField === "address" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: INTERACTIVE BAITHAK CONCIERGE & INQUIRY FORM                 */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 relative">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F] shadow-inner">
                <Calendar className="w-3.5 h-3.5" />
                <span>BAITHAK CONCIERGE & INQUIRIES</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                Send an Epistle or{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                  Reserve a Baithak
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed">
                Whether you want to reserve a table for a poetry circle, order custom heritage tea gift crates, or simply say namaste — our curators respond within 2 hours.
              </p>
            </div>

            {/* Form Container with Crisp Inset Borders */}
            <div className="rounded-3xl bg-gradient-to-b from-[#180F0A] to-[#100906] border border-[#C69247]/45 p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 sm:py-16 space-y-6 max-w-lg mx-auto"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1C110B] border-2 border-emerald-400/70 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(52,211,153,0.35)]">
                      <CheckCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#DFAB5F] font-semibold">
                        Epistle Received with Reverence
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF6EE]">
                        Namaste, {formData.name || "Esteemed Patron"}.
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E0D4C8] leading-relaxed font-sans font-light">
                        Your message regarding <strong className="text-[#DFAB5F]">{formData.type}</strong> has been received at our Connaught Place concierge desk. Our tea curator will contact you at <span className="font-mono text-[#FBF6EE] font-semibold">{formData.phone}</span> shortly.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0D0806] border border-[#C69247]/40 text-xs font-mono text-[#DFAB5F] shadow-inner">
                      <span>Reference No: CA-REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>

                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          guests: "2 Guests (Intimate Circle)",
                          date: "",
                          time: "Evening Dum (6:00 PM - 9:00 PM)",
                          type: "Traditional Baithak Reservation",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-full border border-[#C69247]/50 text-xs font-mono uppercase tracking-wider text-[#DFAB5F] hover:bg-[#1E130D] hover:border-[#DFAB5F] transition-all cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 sm:space-y-7"
                  >
                    {/* Inquiry Type Radio / Pill Tabs */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#DFAB5F] mb-3 font-semibold">
                        Nature of Inquiry
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {[
                          { id: "reservation", label: "Baithak Reservation", value: "Traditional Baithak Reservation" },
                          { id: "poetry", label: "Poetry / Music Adda", value: "Private Gathering / Cultural Adda" },
                          { id: "gifting", label: "Heritage Tea Gifting", value: "Heritage Gifting & Bulk Leaf" },
                          { id: "general", label: "General Epistle", value: "General Inquiry & Feedback" },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => {
                              setActiveTab(tab.id);
                              setFormData({ ...formData, type: tab.value });
                            }}
                            className={`p-3 rounded-2xl text-xs font-mono uppercase tracking-wider text-left transition-all duration-200 border cursor-pointer ${
                              activeTab === tab.id
                                ? "bg-[#DFAB5F] text-[#0A0604] font-bold border-[#DFAB5F] shadow-[0_0_15px_rgba(223,171,95,0.35)]"
                                : "bg-[#140C08] text-[#D8CCC0] border-[#C69247]/30 hover:border-[#DFAB5F] hover:text-[#DFAB5F]"
                            }`}
                          >
                            <span className="block truncate">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Personal Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Kabir Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all placeholder-[#D8CCC0]/40 shadow-inner"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                          Phone Number (for SMS confirmation) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all placeholder-[#D8CCC0]/40 shadow-inner"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="kabir@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all placeholder-[#D8CCC0]/40 shadow-inner"
                        />
                      </div>

                      {/* Guest Count */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                          Number of Guests
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all cursor-pointer shadow-inner"
                        >
                          <option value="1 Guest (Solo Writer / Scholar)">1 Guest (Solo Writer / Scholar)</option>
                          <option value="2 Guests (Intimate Circle)">2 Guests (Intimate Circle)</option>
                          <option value="3-5 Guests (Small Baithak)">3 – 5 Guests (Small Baithak Circle)</option>
                          <option value="6-10 Guests (Poetry & Gathering)">6 – 10 Guests (Poetry & Gathering)</option>
                          <option value="10+ Guests (Courtyard Booking)">10+ Guests (Private Courtyard Booking)</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Date & Time Window */}
                    {(activeTab === "reservation" || activeTab === "poetry") && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all cursor-pointer shadow-inner"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                            Time Window
                          </label>
                          <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all cursor-pointer shadow-inner"
                          >
                            <option value="Morning Dawn (6:00 AM - 10:00 AM)">Morning Dawn (6:00 AM - 10:00 AM)</option>
                            <option value="Afternoon Calm (12:00 PM - 4:00 PM)">Afternoon Calm (12:00 PM - 4:00 PM)</option>
                            <option value="Evening Dum (6:00 PM - 9:00 PM)">Evening Dum (6:00 PM - 9:00 PM) [Popular]</option>
                            <option value="Midnight Adda (10:00 PM - 2:00 AM)">Midnight Adda (10:00 PM - 2:00 AM)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Message Note */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D8CCC0] mb-2 font-medium">
                        Special Requests or Dietary Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Let us know if you'd like specific chai pairings, dietary preferences, or private seating requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-[#140C08] border border-[#C69247]/35 text-xs font-sans text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#1A110B] transition-all placeholder-[#D8CCC0]/40 resize-none shadow-inner"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-[11px] font-mono text-[#D8CCC0]/70 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#DFAB5F]" />
                        <span>We respect your privacy. No promotional spam, only authentic hospitality.</span>
                      </p>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0A0604] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-[0_4px_25px_rgba(198,146,71,0.35)] cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Dispatch Epistle</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE TWO HERITAGE SANCTUARIES (DELHI & VARANASI)                */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 bg-[#070402] relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F]">
                <Compass className="w-3.5 h-3.5" />
                <span>SANCTUARY DIRECTORY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                Our Physical{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                  Sanctuaries
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed">
                From the bustling ghats of Varanasi to the heritage colonnades of New Delhi — experience the unhurried warmth of our earthen tapris.
              </p>
            </div>

            {/* Sanctuaries Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Sanctuary 1: New Delhi Flagship */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-gradient-to-b from-[#180F0A] to-[#100906] border border-[#C69247]/45 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.06)] group"
              >
                <div>
                  <div className="relative h-56 sm:h-60 rounded-2xl overflow-hidden border border-[#C69247]/35 mb-6 group/img shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85"
                      alt="New Delhi Flagship Courtyard"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#DFAB5F] text-[#0A0604] font-bold text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      Primary Flagship
                    </span>

                    <span className="absolute bottom-3 right-3 bg-[#0A0604]/90 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Open Daily • 6 AM – 2 AM
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors mb-1">
                    The Connaught Place Flagship
                  </h3>
                  <p className="text-xs font-mono text-[#DFAB5F] uppercase tracking-widest mb-4">
                    Courtyard Sanctuary • New Delhi
                  </p>

                  <div className="space-y-2.5 text-xs text-[#E0D4C8] font-sans mb-6">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#DFAB5F] shrink-0 mt-0.5" />
                      <span>Plot 18, Heritage Courtyard, Inner Circle, Connaught Place, New Delhi - 110001</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Navigation className="w-4 h-4 text-[#DFAB5F] shrink-0" />
                      <span>Near Central Park Gate 3 & Rajiv Chowk Metro</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#DFAB5F] shrink-0" />
                      <a href="tel:+917300212948" className="hover:text-[#DFAB5F] underline font-mono">+91 73002 12948</a>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C69247]/25 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#D8CCC0]/70">
                    Valet & Outdoor Seating Available
                  </span>
                  <a
                    href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#DFAB5F] hover:text-[#FBF6EE] transition-colors"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Sanctuary 2: Varanasi Heritage Roots */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl bg-gradient-to-b from-[#180F0A] to-[#100906] border border-[#C69247]/45 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.06)] group"
              >
                <div>
                  <div className="relative h-56 sm:h-60 rounded-2xl overflow-hidden border border-[#C69247]/35 mb-6 group/img shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=85"
                      alt="Ancestral Assi Ghat Varanasi Roots"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#1C110B] text-[#DFAB5F] border border-[#C69247]/50 font-bold text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      Birthplace Estd. 1998
                    </span>

                    <span className="absolute bottom-3 right-3 bg-[#0A0604]/90 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Open Daily • 5 AM – 1 AM
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors mb-1">
                    The Ancestral Riverbank Tapri
                  </h3>
                  <p className="text-xs font-mono text-[#DFAB5F] uppercase tracking-widest mb-4">
                    Assi Ghat • Varanasi
                  </p>

                  <div className="space-y-2.5 text-xs text-[#E0D4C8] font-sans mb-6">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#DFAB5F] shrink-0 mt-0.5" />
                      <span>Adjacent to Assi Ghat Main Steps, Nagwa Road, Varanasi - 221005</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Flame className="w-4 h-4 text-[#DFAB5F] shrink-0" />
                      <span>Where the original charcoal handi dum was first fired</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#DFAB5F] shrink-0" />
                      <a href="tel:+917300212948" className="hover:text-[#DFAB5F] underline font-mono">+91 73002 12948</a>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C69247]/25 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#D8CCC0]/70">
                    Sacred Ganga Riverbank View
                  </span>
                  <a
                    href="https://maps.google.com/?q=Assi+Ghat+Varanasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#DFAB5F] hover:text-[#FBF6EE] transition-colors"
                  >
                    <span>View on Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: VISITING ETIQUETTE & FAQS                                      */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C69247]/25 relative">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C69247]/45 bg-[#170E09]/95 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>ADDA ETIQUETTE & FAQS</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight">
                Good Things to Know Before{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                  You Arrive
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed">
                Everything you need to know about our slow brewing tempo, seating customs, and hospitality.
              </p>
            </div>

            {/* Accordion/FAQ Cards with Specular Rim */}
            <div className="space-y-4">
              {contactFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="p-6 rounded-2xl bg-[#140C08] border border-[#C69247]/35 hover:border-[#DFAB5F] hover:shadow-[0_0_20px_rgba(223,171,95,0.15),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-200"
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#FBF6EE] mb-2 flex items-start gap-2.5">
                    <span className="text-[#DFAB5F] font-mono text-sm">0{index + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E0D4C8] leading-relaxed font-sans font-light pl-6">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FINAL CLOSING INVITATION                                       */}
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
              The Brass Handi Is Simmering.{" "}
              <span className="block mt-2 italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#DFAB5F] via-[#FCE4B8] to-[#C69247]">
                Your Seat Awaits.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#E0D4C8] font-light leading-relaxed max-w-2xl mx-auto">
              Join us at the hearth of authentic Indian chai. Pull up a wooden bench, take in the petrichor aroma, and let the conversations flow.
            </p>

            {/* CTA Buttons Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href="tel:+917300212948"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#0A0604] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-[0_4px_30px_rgba(198,146,71,0.4)] cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge: +91 73002 12948</span>
              </a>

              <Link
                href="/signature-chai"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#C69247]/60 bg-[#1C110B] text-[#DFAB5F] font-bold text-xs uppercase tracking-widest hover:border-[#DFAB5F] hover:bg-[#251811] transition-all cursor-pointer shadow-sm"
              >
                <span>View Signature Menu</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
}
