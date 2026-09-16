"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Compass,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Navigation,
  Flame,
} from "lucide-react";

export const SINGLE_OUTLET = {
  name: "Chai Ka Adda • The Flagship Sanctuary",
  tagline: "The Original Earthen Baithak",
  address: "Plot 18, Heritage Courtyard, Inner Circle, Connaught Place, New Delhi - 110001",
  landmark: "Near Central Park Metro Gate 3",
  timings: "6:00 AM – 2:00 AM (Open 7 Days a Week)",
  phone: "+91 73002 12948",
  email: "namaste@chaikaadda.com",
  mapsUrl: "https://maps.google.com/?q=Connaught+Place+New+Delhi",
  features: [
    { label: "Live Brass Counter", icon: "🏺", color: "from-amber-600/20 to-amber-900/10" },
    { label: "Earthen Baithak", icon: "🌿", color: "from-emerald-900/20 to-amber-950/10" },
    { label: "Terracotta Bar", icon: "☕", color: "from-orange-900/20 to-amber-950/10" },
    { label: "Guest Valet", icon: "🚗", color: "from-amber-700/20 to-neutral-900/10" },
  ],
};

/** Real-time 3D Particle, Spice, Tea-Leaf, & Dotted Atmosphere Canvas for Flagship Sanctuary */
function VisitUs3DCanvas({ reduceMotion }: { reduceMotion: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovered: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const fov = 360;
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      baseSize: number;
      type: "steam" | "ember" | "saffron" | "cardamom" | "leaf" | "dot";
      color: string;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
      rot: number;
      rotSpeed: number;
    }

    const particles: Particle3D[] = [];
    const maxParticles = 75;

    const spiceTypes: Array<{
      type: Particle3D["type"];
      color: string;
      sizeRange: [number, number];
      alpha: number;
    }> = [
      { type: "steam", color: "245, 230, 210", sizeRange: [22, 52], alpha: 0.14 },
      { type: "ember", color: "255, 175, 55", sizeRange: [2, 4.5], alpha: 0.75 },
      { type: "saffron", color: "230, 115, 30", sizeRange: [6, 12], alpha: 0.7 },
      { type: "cardamom", color: "140, 160, 90", sizeRange: [5, 9.5], alpha: 0.65 },
      { type: "leaf", color: "180, 120, 60", sizeRange: [4, 8], alpha: 0.6 },
      { type: "dot", color: "223, 171, 95", sizeRange: [1, 2], alpha: 0.35 },
    ];

    const createParticle = (customZ?: number, initialSpread?: boolean): Particle3D => {
      const spice = spiceTypes[Math.floor(Math.random() * spiceTypes.length)];
      const z = customZ !== undefined ? customZ : Math.random() * 400 - 100;
      const baseSize = spice.sizeRange[0] + Math.random() * (spice.sizeRange[1] - spice.sizeRange[0]);

      const spreadX = (Math.random() - 0.5) * (width * 0.9);
      const startX = spreadX;
      const startY = initialSpread
        ? (Math.random() - 0.5) * height
        : height * 0.45 + Math.random() * (height * 0.5);

      return {
        x: startX,
        y: startY,
        z,
        vx: (Math.random() - 0.5) * 0.4 + (spice.type === "dot" ? 0.22 : 0),
        vy: spice.type === "steam"
          ? -(0.35 + Math.random() * 0.6)
          : spice.type === "dot"
          ? (Math.random() - 0.5) * 0.08
          : -(0.25 + Math.random() * 0.45),
        vz: (Math.random() - 0.5) * 0.3,
        size: baseSize,
        baseSize,
        type: spice.type,
        color: spice.color,
        alpha: 0,
        maxAlpha: spice.alpha * (0.6 + Math.random() * 0.4),
        life: 0,
        maxLife: 240 + Math.random() * 280,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle(Math.random() * 500 - 150, true);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let frame = 0;

    const render = () => {
      if (isVisible) {
        frame++;

        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        if (mouseRef.current.isHovered && !reduceMotion) {
          const glowRadius = 220;
          const radGrad = ctx.createRadialGradient(
            cx + mouseRef.current.x,
            cy + mouseRef.current.y,
            0,
            cx + mouseRef.current.x,
            cy + mouseRef.current.y,
            glowRadius
          );
          radGrad.addColorStop(0, "rgba(223, 171, 95, 0.09)");
          radGrad.addColorStop(0.5, "rgba(168, 73, 36, 0.04)");
          radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, width, height);
        }

        particles.sort((a, b) => b.z - a.z);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.life++;

          const progress = p.life / p.maxLife;
          if (progress < 0.2) {
            p.alpha = (progress / 0.2) * p.maxAlpha;
          } else if (progress > 0.75) {
            p.alpha = (1 - (progress - 0.75) / 0.25) * p.maxAlpha;
          } else {
            p.alpha = p.maxAlpha;
          }

          if (!reduceMotion) {
            p.x += p.vx + Math.sin(frame * 0.012 + p.z * 0.02) * 0.25;
            p.y += p.vy;
            p.z += p.vz;
            p.rot += p.rotSpeed;

            if (mouseRef.current.isHovered) {
              const dx = p.x - mouseRef.current.x;
              const dy = p.y - mouseRef.current.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 160 && dist > 1) {
                const force = (1 - dist / 160) * 0.65;
                p.x += (dx / dist) * force * 1.6;
                p.y += (dy / dist) * force * 1.6;
                p.rotSpeed += (Math.random() - 0.5) * 0.02;
              }
            }
          }

          const scale = fov / (fov + p.z);
          if (scale <= 0) continue;

          const projX = cx + p.x * scale;
          const projY = cy + p.y * scale;
          const projSize = Math.max(0.6, p.baseSize * scale);

          if (
            p.life >= p.maxLife ||
            projY < -60 ||
            projY > height + 80 ||
            projX < -120 ||
            projX > width + 120 ||
            p.z < -250 ||
            p.z > 500
          ) {
            particles[i] = createParticle();
            continue;
          }

          ctx.save();
          ctx.translate(projX, projY);
          ctx.rotate(p.rot);

          if (p.type === "steam") {
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, projSize);
            grad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.75})`);
            grad.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.3})`);
            grad.addColorStop(1, `rgba(${p.color}, 0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, projSize, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === "ember") {
            const emberGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, projSize * 2.2);
            emberGrad.addColorStop(0, `rgba(255, 235, 190, ${p.alpha})`);
            emberGrad.addColorStop(0.35, `rgba(${p.color}, ${p.alpha * 0.75})`);
            emberGrad.addColorStop(1, `rgba(${p.color}, 0)`);
            ctx.fillStyle = emberGrad;
            ctx.beginPath();
            ctx.arc(0, 0, projSize * 2.2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === "saffron") {
            ctx.strokeStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.lineWidth = Math.max(1, 1.5 * scale);
            ctx.beginPath();
            ctx.moveTo(-projSize, -projSize * 0.3);
            ctx.quadraticCurveTo(0, projSize * 0.4, projSize, -projSize * 0.2);
            ctx.stroke();
          } else if (p.type === "cardamom") {
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, projSize * 0.7, projSize * 1.2, p.rot, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = `rgba(80, 100, 50, ${p.alpha * 0.5})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else if (p.type === "dot") {
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(0, 0, projSize, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, projSize, projSize * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      if (!reduceMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [reduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left - rect.width / 2;
    mouseRef.current.targetY = e.clientY - rect.top - rect.height / 2;
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    mouseRef.current.isHovered = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 pointer-events-auto z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export function VisitUs() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2 Guests",
    time: "Evening (5 PM - 9 PM)",
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SINGLE_OUTLET.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Chai Ka Adda! I'd like to reserve a table / enquire about visiting your Flagship Outlet.`
  );

  return (
    <section
      id="visit"
      className="relative py-16 md:py-20 bg-[#0A0604] overflow-hidden film-grain select-none"
    >
      {/* 1. Full Complete Animated Background Chai Visual (Ken Burns Slow Zoom) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1.03, 1.08, 1.03],
                  y: ["0%", "-2%", "0%"],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1800&auto=format&fit=crop&q=88"
            alt="Steaming Authentic Indian Spiced Chai"
            className="w-full h-full object-cover filter brightness-[0.28] contrast-[1.12] saturate-[1.2]"
          />
        </motion.div>

        {/* Dual Dark Vignette Overlays for Ultimate Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-[#0A0604]/65 to-[#0A0604]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0604]/40 to-[#0A0604]/90" />

        {/* Rising Warm Organic Steam Clouds */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, y: "30%", scaleX: 0.8 }}
              animate={{
                opacity: [0, 0.2, 0.3, 0],
                y: ["25%", "-40%"],
                scaleX: [0.8, 1.3, 1.6],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-1/4 w-48 h-64 bg-gradient-to-t from-[#DFAB5F]/20 via-[#FBF6EE]/12 to-transparent blur-3xl rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, y: "35%", scaleX: 0.9 }}
              animate={{
                opacity: [0, 0.16, 0.26, 0],
                y: ["30%", "-35%"],
                scaleX: [0.9, 1.4, 1.7],
              }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
              className="absolute bottom-10 right-1/4 w-56 h-72 bg-gradient-to-t from-[#C69247]/20 via-[#FBF6EE]/10 to-transparent blur-3xl rounded-full"
            />
          </div>
        )}
      </div>

      {/* 2. 3D Real-time Saffron, Cardamom, Tea Leaf, Glowing Embers & Dotted Particle Physics Canvas */}
      <VisitUs3DCanvas reduceMotion={shouldReduceMotion} />

      {/* Atmospheric Glowing Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#C69247]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-[#A84924]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header (Compact & Crisp) */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C69247]/30 bg-[#1E130D]/80 backdrop-blur-md text-[#DFAB5F] text-[11px] font-semibold uppercase tracking-[0.25em] mb-2.5 shadow-md"
          >
            <Compass className="w-3 h-3 text-[#DFAB5F] animate-spin" style={{ animationDuration: "12s" }} />
            <span>Our Flagship Sanctuary</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EE] leading-[1.08] mb-2"
          >
            Come Sit At <span className="text-gold-gradient italic font-normal">The Flagship Adda.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#D8CCC0] font-sans font-light"
          >
            One authentic sanctuary dedicated to unhurried conversations, brass-boiled kadak chai, and warm wooden benches.
          </motion.p>
        </div>

        {/* 2-Column Master Outlet Layout (Compact & Highly Animated) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          {/* Left Column: Outlet Details & Interactive Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -3 }}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#1E130D]/90 via-[#140C08]/95 to-[#0D0806] border border-[#C69247]/35 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          >
            {/* Animated Edge Glow Beam */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-transparent via-[#DFAB5F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Live Status Beacon Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C69247]/20 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>Open Now</span>
                    <span className="text-emerald-500/50">•</span>
                    <span className="text-[#DFAB5F] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#DFAB5F] animate-pulse" />
                      Simmering Fresh Dum
                    </span>
                  </span>
                </div>

                <span className="text-[10px] font-mono text-[#DFAB5F] bg-[#C69247]/15 px-2.5 py-0.5 rounded-full border border-[#C69247]/30">
                  Single Master Outlet
                </span>
              </div>

              {/* Outlet Title */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F] block mb-0.5">
                  {SINGLE_OUTLET.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#FBF6EE]">
                  {SINGLE_OUTLET.name}
                </h3>
              </div>

              {/* Amenity Badges (Interactive Hover Pill Matrix) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                {SINGLE_OUTLET.features.map((feat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`p-2.5 rounded-xl bg-gradient-to-b ${feat.color} border border-[#C69247]/25 flex flex-col items-center text-center gap-1 hover:border-[#DFAB5F] transition-all cursor-pointer shadow-md`}
                  >
                    <span className="text-lg">{feat.icon}</span>
                    <span className="text-[10px] font-medium text-[#FBF6EE] leading-tight">
                      {feat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Address Box & Contact Matrix */}
              <div className="space-y-2.5 pt-1">
                {/* Address Box */}
                <div className="p-3.5 rounded-2xl bg-[#140C08]/90 border border-[#C69247]/25 flex items-center justify-between gap-3 hover:border-[#DFAB5F]/40 transition-colors">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <MapPin className="w-4 h-4 text-[#DFAB5F] shrink-0 mt-0.5 animate-bounce" style={{ animationDuration: "3s" }} />
                    <div className="min-w-0">
                      <p className="text-xs text-[#FBF6EE] font-medium truncate sm:whitespace-normal">
                        {SINGLE_OUTLET.address}
                      </p>
                      <p className="text-[10px] font-mono text-[#DFAB5F] mt-0.5">
                        📍 {SINGLE_OUTLET.landmark}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyAddress}
                    title="Copy Address"
                    className="p-2 rounded-xl bg-[#1E130D] border border-[#C69247]/30 text-[#DFAB5F] hover:bg-[#C69247] hover:text-[#0D0806] transition-all shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </motion.button>
                </div>

                {/* Timings & Direct Call Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#140C08]/90 border border-[#C69247]/25 flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#DFAB5F] shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#DFAB5F]/80 block">
                        Hours of Warmth
                      </span>
                      <p className="text-[11px] font-mono text-[#FBF6EE]">
                        {SINGLE_OUTLET.timings}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${SINGLE_OUTLET.phone.replace(/\s+/g, "")}`}
                    className="p-3 rounded-xl bg-[#140C08]/90 border border-[#C69247]/25 flex items-center gap-2.5 hover:border-[#DFAB5F] hover:bg-[#1E130D] transition-all group/call"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#DFAB5F] shrink-0 group-hover/call:rotate-12 transition-transform" />
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#DFAB5F]/80 block">
                        Direct Call
                      </span>
                      <p className="text-[11px] font-mono text-[#FBF6EE] group-hover/call:text-[#DFAB5F] transition-colors">
                        {SINGLE_OUTLET.phone}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs Bar */}
            <div className="pt-4 border-t border-[#C69247]/20 flex flex-wrap gap-2.5 mt-4 relative z-10">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={SINGLE_OUTLET.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[150px] py-3 px-5 rounded-full bg-gradient-to-r from-[#C69247] to-[#DFAB5F] text-[#0D0806] font-bold text-[11px] uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#C69247]/20"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/917300212948?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[150px] py-3 px-5 rounded-full border border-[#25D366]/40 bg-[#140C08] hover:bg-[#25D366]/15 text-[#FBF6EE] hover:text-[#25D366] font-semibold text-[11px] uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Instant Table / Baithak Reservation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -3 }}
            className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#1E130D] via-[#140C08] to-[#0A0604] border border-[#C69247]/35 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#C69247]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#DFAB5F] mb-1">
                <Calendar className="w-3 h-3 text-[#DFAB5F]" />
                <span>Reserve A Baithak</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF6EE] mb-1">
                Save Your Seat
              </h3>
              <p className="text-[11px] text-[#D8CCC0]/80 font-sans mb-4 leading-relaxed">
                Planning a gathering with friends or an unhurried work evening? Reserve ahead for priority seating.
              </p>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    className="p-5 rounded-2xl bg-[#140C08] border border-emerald-500/40 text-center space-y-2.5 my-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-base font-serif font-bold text-[#FBF6EE]">
                      Table Request Received!
                    </h4>
                    <p className="text-xs text-[#D8CCC0]/80">
                      Reserved for <strong className="text-[#DFAB5F]">{formData.guests}</strong>. A confirmation message has been initiated.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-mono text-[#DFAB5F] hover:underline pt-1"
                    >
                      Book another slot
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono text-[#DFAB5F] uppercase tracking-wider mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aarav Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#140C08] border border-[#C69247]/30 text-xs text-[#FBF6EE] placeholder:text-[#D8CCC0]/40 focus:outline-none focus:border-[#DFAB5F] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#DFAB5F] uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#140C08] border border-[#C69247]/30 text-xs text-[#FBF6EE] placeholder:text-[#D8CCC0]/40 focus:outline-none focus:border-[#DFAB5F] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-mono text-[#DFAB5F] uppercase tracking-wider mb-1">
                          Party Size
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-2.5 py-2.5 rounded-xl bg-[#140C08] border border-[#C69247]/30 text-xs text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] transition-colors"
                        >
                          <option>1-2 Guests</option>
                          <option>3-4 Guests</option>
                          <option>5-8 Adda Circle</option>
                          <option>9+ Celebration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-[#DFAB5F] uppercase tracking-wider mb-1">
                          Preferred Time
                        </label>
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-2.5 py-2.5 rounded-xl bg-[#140C08] border border-[#C69247]/30 text-xs text-[#FBF6EE] focus:outline-none focus:border-[#DFAB5F] transition-colors"
                        >
                          <option>Morning (6 AM - 11 AM)</option>
                          <option>Afternoon (12 PM - 4 PM)</option>
                          <option>Evening (5 PM - 9 PM)</option>
                          <option>Midnight (10 PM - 2 AM)</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full mt-1.5 py-3 px-5 rounded-full bg-[#C69247] hover:bg-[#DFAB5F] text-[#0D0806] font-bold text-[11px] uppercase tracking-[0.16em] flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-[#C69247]/15"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm Table Reservation</span>
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>

            <p className="text-[10px] font-sans text-center text-[#D8CCC0]/60 pt-3 border-t border-[#C69247]/15 relative z-10 mt-3">
              ☕ Walk-ins are always welcomed without reservation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
