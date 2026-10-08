"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  MessageCircle,
  Heart,
  ArrowUp,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Send,
  Loader2,
  Award,
  Globe
} from "lucide-react";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const email = newsletterEmail.trim();
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubscribed(true);
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error || "Unable to subscribe. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#060302] border-t border-[#C69247]/30 pt-5 sm:pt-6 pb-24 sm:pb-10 overflow-hidden text-[#E4D9CE] font-sans select-none antialiased subpixel-antialiased">
      {/* Precision Ambient Backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[140px] bg-gradient-to-b from-[#DFAB5F]/10 via-[#A84924]/5 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* ========================================================================= */}
        {/* 1. ULTRA-CRISP NEWSLETTER & EPISLES DISPATCH STRIP                        */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-gradient-to-b from-[#130B07] to-[#0A0503] border border-[#C69247]/40 p-5 sm:p-6 lg:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-1">
              <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F] font-bold">
                <Sparkles className="w-3 h-3 text-[#DFAB5F]" />
                <span>The Adda Gazette</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                Subscribe to Seasonal Harvest Epistles
              </h3>
              <p className="text-xs text-[#E4D9CE] leading-relaxed max-w-lg font-light">
                Single-estate tea notes, private musical baithak announcements, and seasonal spice recipes delivered to your inbox.
              </p>
            </div>

            {/* Right Functional Form */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 rounded-xl bg-[#0F0805] border border-emerald-500/50 flex items-center gap-3 text-emerald-400 shadow-inner"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 shadow-[0_0_8px_#34D399]" />
                    <div className="text-xs font-mono">
                      <span className="font-bold block text-emerald-300">Namaste! Subscription Confirmed.</span>
                      <span className="text-[#E4D9CE] text-[11px]">
                        Welcome note dispatched to <strong className="text-[#DFAB5F] font-semibold">{newsletterEmail}</strong>.
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-[#DFAB5F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          disabled={isSubmitting}
                          value={newsletterEmail}
                          onChange={(e) => {
                            setNewsletterEmail(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder="Enter your email address..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060302] border border-[#C69247]/40 text-xs text-[#FFFFFF] placeholder-[#C2B3A4]/60 focus:outline-none focus:border-[#DFAB5F] focus:ring-1 focus:ring-[#DFAB5F] focus:bg-[#0D0704] transition-all shadow-inner disabled:opacity-60"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F] text-[#060302] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_2px_15px_rgba(198,146,71,0.3)] hover:brightness-110 active:scale-98 transition-all cursor-pointer shrink-0 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Joining...</span>
                          </>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <Send className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Error Feedback */}
                    {errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono text-rose-400 flex items-center gap-1.5 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.p>
                    )}

                    <p className="text-[10.5px] font-mono text-[#C4B5A6] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#DFAB5F]" />
                      <span>Zero spam. Strict adherence to privacy. Unsubscribe anytime.</span>
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 4-COLUMN CRISP DIRECTORY GRID                                          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-[#C69247]/25">
          {/* Col 1: Brand Identity & Accreditations (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-full border border-[#DFAB5F]/70 bg-[#160D09] p-0.5 shadow-[0_0_12px_rgba(223,171,95,0.25)] group-hover:border-[#DFAB5F] group-hover:scale-105 transition-all overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Chai Da Adda Official Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold tracking-[0.22em] text-[#FFFFFF] group-hover:text-[#DFAB5F] transition-colors leading-tight">
                  CHAI DA ADDA
                </span>
                <span className="text-[7.5px] font-mono uppercase tracking-[0.28em] text-[#DFAB5F]">
                  Good Tea • Better Vibes • Estd. 1998
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#E4D9CE] leading-relaxed max-w-sm font-light">
              Preserving authentic Indian tea stall culture through single-estate harvesting, 25-minute slow brass handi dum, and 100% biodegradable Varanasi terracotta.
            </p>

            {/* Quality & Environmental Certifications */}
            <div className="flex flex-wrap gap-2 pt-0.5 text-[10px] font-mono text-[#DFAB5F]">
              <span className="px-2 py-0.5 rounded-md bg-[#100905] border border-[#C69247]/35 flex items-center gap-1.5 shadow-sm font-medium">
                <Award className="w-3 h-3 text-[#DFAB5F]" />
                <span>Single-Estate Harvest</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#100905] border border-[#C69247]/35 flex items-center gap-1.5 shadow-sm font-medium">
                <Globe className="w-3 h-3 text-[#DFAB5F]" />
                <span>100% Plastic Free</span>
              </span>
            </div>

            {/* Verified Social & Direct Touchpoints */}
            <div className="flex items-center gap-2 pt-0.5">
              <a
                href="https://instagram.com/chaikaaddaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7.5 h-7.5 rounded-full border border-[#C69247]/40 bg-[#120B07] text-[#DFAB5F] flex items-center justify-center hover:bg-[#C69247] hover:text-[#060302] transition-all duration-150 shadow-sm"
                aria-label="Follow Chai Ka Adda on Instagram"
                title="Instagram (@chaikaaddaofficial)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/917300212948?text=Namaste%20Chai%20Ka%20Adda,%20I%20would%20like%20to%20inquire%20about%20a%20visit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7.5 h-7.5 rounded-full border border-[#25D366]/40 bg-[#120B07] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-[#060302] transition-all duration-150 shadow-sm"
                aria-label="Chat with Chai Ka Adda on WhatsApp"
                title="WhatsApp Concierge (+91 73002 12948)"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:+917300212948"
                className="w-7.5 h-7.5 rounded-full border border-[#C69247]/40 bg-[#120B07] text-[#DFAB5F] flex items-center justify-center hover:bg-[#C69247] hover:text-[#060302] transition-all duration-150 shadow-sm"
                aria-label="Call Flagship Concierge"
                title="Call (+91 73002 12948)"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              <a
                href="mailto:namaste@chaikaadda.com"
                className="w-7.5 h-7.5 rounded-full border border-[#C69247]/40 bg-[#120B07] text-[#DFAB5F] flex items-center justify-center hover:bg-[#C69247] hover:text-[#060302] transition-all duration-150 shadow-sm"
                aria-label="Email Chai Ka Adda"
                title="Email (namaste@chaikaadda.com)"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-[#FFFFFF] uppercase tracking-[0.2em]">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E4D9CE] font-normal">
              <li>
                <Link href="/" className="hover:text-[#DFAB5F] transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#DFAB5F] transition-colors block py-0.5">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/signature-chai" className="hover:text-[#DFAB5F] transition-colors block py-0.5">
                  Signature Chai
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#DFAB5F] transition-colors block py-0.5">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:text-[#DFAB5F] transition-colors block py-0.5">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DFAB5F] transition-colors block py-0.5">
                  Contact & Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hospitality & Concierge (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-[#FFFFFF] uppercase tracking-[0.2em]">
              Guest Hospitality
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E4D9CE] font-normal">
              <li>
                <Link href="/contact" className="hover:text-[#DFAB5F] transition-colors flex items-center justify-between group py-0.5">
                  <span>Baithak Reservations</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C69247]/60 group-hover:text-[#DFAB5F]" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DFAB5F] transition-colors flex items-center justify-between group py-0.5">
                  <span>Poetry & Musical Addas</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C69247]/60 group-hover:text-[#DFAB5F]" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DFAB5F] transition-colors flex items-center justify-between group py-0.5">
                  <span>Heritage Gifting & Leaf</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C69247]/60 group-hover:text-[#DFAB5F]" />
                </Link>
              </li>
              <li>
                <Link href="/signature-chai" className="hover:text-[#DFAB5F] transition-colors flex items-center justify-between group py-0.5">
                  <span>Master Tea Tasting Flights</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C69247]/60 group-hover:text-[#DFAB5F]" />
                </Link>
              </li>
            </ul>

            <div className="pt-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-[#0E1510] px-2.5 py-0.5 rounded-full border border-emerald-500/40 shadow-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live: Open 6 AM – 2 AM Daily
              </span>
            </div>
          </div>

          {/* Col 4: Flagship Sanctuaries (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-[#FFFFFF] uppercase tracking-[0.2em]">
              Flagship Sanctuaries
            </h4>
            <div className="space-y-2.5 text-xs text-[#E4D9CE]">
              {/* Delhi */}
              <div className="space-y-0.5">
                <strong className="text-[#FFFFFF] block font-serif text-[13px]">
                  New Delhi Flagship
                </strong>
                <p className="text-[11.5px] text-[#E4D9CE] leading-snug font-light">
                  Plot 18, Heritage Courtyard, Inner Circle, Connaught Place - 110001
                </p>
                <p className="text-[10px] font-mono text-[#DFAB5F]">
                  📍 Near Central Park Metro Gate 3
                </p>
              </div>

              {/* Varanasi */}
              <div className="space-y-0.5 pt-0.5">
                <strong className="text-[#FFFFFF] block font-serif text-[13px]">
                  Varanasi Heritage Roots
                </strong>
                <p className="text-[11.5px] text-[#E4D9CE] leading-snug font-light">
                  Adjacent to Assi Ghat Main Steps, Nagwa Road - 221005
                </p>
                <p className="text-[10px] font-mono text-[#DFAB5F]">
                  🔥 Riverbank Hearth • Estd. 1998
                </p>
              </div>

              <div className="pt-0.5">
                <a
                  href="tel:+917300212948"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#DFAB5F] hover:text-[#FFFFFF] transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>+91 73002 12948</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. REGULATORY COMPLIANCE & LEGAL BOTTOM BAR                                */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#C4B5A6]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
            <p className="font-semibold text-[#FFFFFF]">© {new Date().getFullYear()} CHAI KA ADDA HERITAGE PVT. LTD.</p>
            <span className="hidden sm:inline text-[#C69247]/60">•</span>
            <span className="text-[#DFAB5F] font-medium">FSSAI Lic. No. 10021011000492</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[#DFAB5F] text-[11px]">
              Crafted with generational reverence in India
            </span>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[11px] font-mono text-[#DFAB5F] hover:text-[#FFFFFF] transition-colors px-2.5 py-1 rounded-lg bg-[#120B07] border border-[#C69247]/40 shadow-sm hover:border-[#DFAB5F] cursor-pointer"
              title="Return to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
