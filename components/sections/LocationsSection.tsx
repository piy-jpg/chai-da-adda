"use client";

import React from "react";
import { motion } from "framer-motion";
import { ADDA_LOCATIONS } from "@/lib/data";
import { useCart } from "@/lib/cartContext";
import { MapPin, Clock, Phone, Sparkles, Calendar, Compass, ExternalLink } from "lucide-react";

export function LocationsSection() {
  const { setIsReservationOpen } = useCart();

  return (
    <section id="adda-locations" className="relative py-24 md:py-32 bg-obsidian-light overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>The Sacred Spaces</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-amber-50 leading-tight mb-4">
            Visit The <span className="text-gold-gradient italic font-normal">Addas</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-200/70 font-sans">
            Step into our sanctuaries of slow conversations, live brass handis, unglazed Varanasi kulhads, and soulful Indian baithaks.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ADDA_LOCATIONS.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/25 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/40 group"
            >
              <div>
                {/* City & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {loc.city}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Chai Brewing
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-3">
                  {loc.name}
                </h3>

                {/* Vibe badge */}
                <div className="text-xs text-amber-400/80 bg-black/40 p-3 rounded-xl border border-amber-500/10 mb-6 font-sans leading-relaxed">
                  {loc.vibe}
                </div>

                {/* Details list */}
                <div className="space-y-3 text-xs text-amber-200/80 font-sans mb-8">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px] text-amber-300">{loc.timings}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px] text-neutral-300">{loc.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-amber-500/20 space-y-2">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.name + " " + loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl glass-panel border border-amber-500/20 text-amber-300 text-xs flex items-center justify-center gap-1.5 hover:text-amber-100 hover:border-amber-400 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
