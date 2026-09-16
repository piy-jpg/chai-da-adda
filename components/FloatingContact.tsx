"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingContact() {
  const OWNER_PHONE = "7300212948";

  const whatsappMessage = encodeURIComponent(
    "Namaste Chai Ka Adda! I'd like to connect directly."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 select-none pointer-events-auto">
      {/* WhatsApp Circular Floating Icon Button */}
      <motion.a
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        href={`https://wa.me/91${OWNER_PHONE}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp (7300212948)"
        className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-[#0D0806] flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] transition-shadow duration-300 group"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current relative z-10" />
      </motion.a>

      {/* Direct Call Circular Floating Icon Button */}
      <motion.a
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        href={`tel:+91${OWNER_PHONE}`}
        title="Call Owner (7300212948)"
        className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#C69247] via-[#DFAB5F] to-[#DFAB5F] text-[#0D0806] flex items-center justify-center shadow-[0_8px_25px_rgba(198,146,71,0.4)] hover:shadow-[0_12px_30px_rgba(198,146,71,0.6)] transition-shadow duration-300 group"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#DFAB5F] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" style={{ animationDuration: "2.5s" }} />
        <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current relative z-10" />
      </motion.a>
    </div>
  );
}
