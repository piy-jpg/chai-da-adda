"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.477-8.413z" />
    </svg>
  );
}

export function FloatingContact() {
  const OWNER_PHONE = "7300212948";

  const whatsappMessage = encodeURIComponent(
    "Namaste Chai Ka Adda! I'd like to connect directly."
  );

  return (
    <div className="fixed bottom-5 right-3.5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3 select-none pointer-events-auto touch-manipulation">
      {/* WhatsApp Circular Floating Icon Button */}
      <div className="relative flex items-center group">
        {/* Elegant Desktop Tooltip Pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 mr-3 px-3 py-1.5 rounded-full bg-[#0D0806]/90 backdrop-blur-md border border-[#25D366]/30 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          Chat on WhatsApp
        </span>

        <motion.a
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.94 }}
          href={`https://wa.me/91${OWNER_PHONE}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (7300212948)"
          aria-label="Chat on WhatsApp with Chai Da Adda"
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2ee873] text-white flex items-center justify-center shadow-[0_10px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_35px_rgba(37,211,102,0.7)] transition-all duration-300 border border-white/20 overflow-hidden"
        >
          {/* Glass Top Specular Highlight */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/10 pointer-events-none" />

          {/* Ambient Glow Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 group-hover:opacity-70 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />

          {/* Authentic WhatsApp SVG */}
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
        </motion.a>
      </div>

      {/* Direct Call Floating Icon Button (Truecaller Blue) */}
      <div className="relative flex items-center group">
        {/* Elegant Desktop Tooltip Pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 mr-3 px-3 py-1.5 rounded-full bg-[#0D0806]/90 backdrop-blur-md border border-[#0087FF]/30 text-xs font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#0087FF] animate-pulse" />
          Call 7300212948
        </span>

        <motion.a
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.94 }}
          href={`tel:+91${OWNER_PHONE}`}
          title="Call Owner (7300212948)"
          aria-label="Call Chai Da Adda on 7300212948"
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#0055D4] via-[#0087FF] to-[#00A3FF] text-white flex items-center justify-center shadow-[0_10px_28px_rgba(0,135,255,0.45)] hover:shadow-[0_14px_35px_rgba(0,135,255,0.7)] transition-all duration-300 border border-white/20 overflow-hidden"
        >
          {/* Glass Top Specular Highlight */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/10 pointer-events-none" />

          {/* Subtle Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#0087FF] opacity-35 group-hover:opacity-70 animate-ping pointer-events-none" style={{ animationDuration: "2.8s" }} />

          {/* Phone Icon */}
          <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
        </motion.a>
      </div>
    </div>
  );
}
