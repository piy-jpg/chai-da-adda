"use client";

import React, { useState } from "react";
import { Coffee, Sparkles, Send, Check, Heart, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setIsSubscribed(true);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 },
        colors: ["#F59E0B", "#D4AF37", "#9A3412"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <footer className="relative bg-obsidian border-t border-amber-500/20 pt-20 pb-12 overflow-hidden text-neutral-400 text-xs">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top VIP Newsletter Banner */}
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-amber-500/30 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />
              VIP Adda Baithak Club
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-amber-100 mb-2">
              Receive Secret Micro-Batch Harvests & 20% Off
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/70 font-sans leading-relaxed">
              Join 40,000+ tea connoisseurs. Get invitations to private cupping sessions, first-flush seasonal releases, and special Adda privileges.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-400/40 text-emerald-300 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-semibold text-sm">
                  <Check className="w-4 h-4" /> Welcome to the Baithak!
                </div>
                <p className="text-xs text-emerald-200/80">
                  Your VIP coupon code is <span className="font-mono font-bold text-amber-300">ADDAFIRST</span> (20% Off).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-black/70 border border-amber-500/30 text-amber-100 placeholder-neutral-500 text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-lg"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black">
                <Coffee className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="font-serif text-base font-bold text-amber-100 tracking-wider">
                CHAI KA <span className="text-gold-gradient">ADDA</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Authentic Indian Chai. Reclaiming slow brass handi simmering and Varanasi terracotta rituals.
            </p>
            <div className="text-[11px] text-amber-400/80 font-mono">
              FSSAI Lic. 10023011000842
            </div>
          </div>

          {/* Col 2: The Royal Brews */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-amber-200 mb-3 uppercase tracking-wider">
              Signature Brews
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#featured-brews" className="hover:text-amber-300 transition-colors">Shahi Kesar Dum Chai</a></li>
              <li><a href="#featured-brews" className="hover:text-amber-300 transition-colors">Banarasi Kulhad Masala</a></li>
              <li><a href="#featured-brews" className="hover:text-amber-300 transition-colors">Kashmiri Shahi Kahwa</a></li>
              <li><a href="#featured-brews" className="hover:text-amber-300 transition-colors">Kadak Tulsi Elaichi Chai</a></li>
              <li><a href="#featured-brews" className="hover:text-amber-300 transition-colors">Irani Karak Malai Chai</a></li>
            </ul>
          </div>

          {/* Col 3: The Addas */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-amber-200 mb-3 uppercase tracking-wider">
              Flagship Addas
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#adda-locations" className="hover:text-amber-300 transition-colors">Connaught Place, Delhi</a></li>
              <li><a href="#adda-locations" className="hover:text-amber-300 transition-colors">Bandra West, Mumbai</a></li>
              <li><a href="#adda-locations" className="hover:text-amber-300 transition-colors">Indiranagar, Bengaluru</a></li>
              <li><a href="#craft-heritage" className="hover:text-amber-300 transition-colors">Adda Craft & 4 Pillars</a></li>
              <li><a href="#chai-alchemist" className="hover:text-amber-300 transition-colors">Chai Flavor Finder</a></li>
            </ul>
          </div>

          {/* Col 4: Values & Sustainability */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-amber-200 mb-3 uppercase tracking-wider">
              Adda Heritage
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 100% Single-Estate Leaf</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 0% Synthetic Extracts</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Varanasi Biodegradable Clay</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Fair-Trade Direct Sourcing</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Manifesto */}
        <div className="pt-8 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Chai Ka Adda Private Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-amber-400/80">
            <span>Brewed with devotion & slow dum across India</span>
            <Heart className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
