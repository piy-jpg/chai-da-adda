"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf, Clock, Flame, Users2, ShieldCheck, Sparkles } from "lucide-react";

/** Real-time 3D Particle, Spice, Tea-Leaf, & Dotted Atmosphere Canvas for Why Us Section */
function WhyChai3DCanvas({ reduceMotion }: { reduceMotion: boolean | null }) {
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
    const maxParticles = 70;

    const spiceTypes: Array<{
      type: Particle3D["type"];
      color: string;
      sizeRange: [number, number];
      alpha: number;
    }> = [
      { type: "steam", color: "245, 230, 210", sizeRange: [20, 50], alpha: 0.13 },
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

export function WhyChai() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      title: "AUTHENTIC INGREDIENTS",
      subtitle: "Whole Spices & Single-Estate Leaves",
      description: "Direct-sourced Idukki cardamom, mountain ginger & Assam golden tips. Never syrups, never concentrates.",
      icon: Leaf,
      stat: "100%",
      statLabel: "Pure Whole Leaf",
      accent: "from-amber-600/30 to-amber-900/10",
      glowColor: "rgba(223, 171, 95, 0.25)",
    },
    {
      title: "SLOW BRASS DUM",
      subtitle: "Generations of Boiling Craft",
      description: "20-minute slow simmer in heavy hand-beaten brass vessels to extract deep natural caramelized sweetness.",
      icon: Flame,
      stat: "20 Min",
      statLabel: "Slow Decoction",
      accent: "from-orange-600/30 to-amber-950/10",
      glowColor: "rgba(168, 73, 36, 0.25)",
    },
    {
      title: "KILN TERRACOTTA",
      subtitle: "Authentic Mitti Ki Khushboo",
      description: "Piping hot chai served exclusively in unglazed porous Varanasi clay kulhads for an earthy aroma.",
      icon: Sparkles,
      stat: "Earthen",
      statLabel: "Varanasi Kiln",
      accent: "from-amber-700/30 to-neutral-900/10",
      glowColor: "rgba(223, 171, 95, 0.25)",
    },
    {
      title: "REAL ADDA CULTURE",
      subtitle: "Conversations Over Screens",
      description: "Designed as community sanctuaries where wooden benches and shared cutting glasses spark lifelong friendships.",
      icon: Users2,
      stat: "Pure",
      statLabel: "Community Vibe",
      accent: "from-amber-800/30 to-neutral-950/10",
      glowColor: "rgba(198, 146, 71, 0.25)",
    },
  ];

  return (
    <section id="why" className="relative py-16 md:py-24 bg-[#0A0604] overflow-hidden film-grain select-none">
      {/* 3D Real-time Saffron, Cardamom, Tea Leaf, Glowing Embers & Dotted Particle Physics Canvas */}
      <WhyChai3DCanvas reduceMotion={shouldReduceMotion} />

      {/* Ambient Radial Backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-[#C69247]/12 via-[#A84924]/8 to-transparent rounded-full blur-[160px] pointer-events-none" />


      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Crisp Header with Animated Sparkle */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/80 backdrop-blur-md text-[#DFAB5F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2 shadow-sm"
          >
            <ShieldCheck className="w-3 h-3 text-[#DFAB5F] animate-pulse" />
            <span>The Adda Standard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EE] leading-tight mb-2 tracking-tight"
          >
            Why <span className="text-gold-gradient italic font-normal">Chai Ka Adda.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#D8CCC0] font-sans font-light max-w-lg mx-auto"
          >
            We uncompromisingly reject powdered flavorings, machine shortcuts, and paper cups.
          </motion.p>
        </div>

        {/* 4 Feature Cards Grid with Staggered Motion & Dynamic 3D Parallax Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.09 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#1E130D]/95 via-[#140C08]/98 to-[#0A0604] border border-[#C69247]/25 hover:border-[#DFAB5F] backdrop-blur-xl shadow-xl hover:shadow-[0_20px_40px_rgba(198,146,71,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
              >
                {/* Dynamic Radial Light Halo */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${item.accent} rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
                    isHovered ? "scale-150 opacity-100" : "opacity-40"
                  }`}
                />

                {/* Animated Edge Shimmer */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-transparent via-[#DFAB5F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon Header with Pulsing Glow */}
                  <div className="relative mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#1E130D] border border-[#C69247]/35 flex items-center justify-center group-hover:scale-110 group-hover:border-[#DFAB5F] group-hover:bg-[#2D1A10] transition-all duration-300 shadow-md relative z-10">
                      <Icon className="w-5 h-5 text-[#DFAB5F] group-hover:rotate-6 transition-transform" />
                    </div>
                    {/* Pulsing Icon Halo on Hover */}
                    <div className="absolute inset-0 w-11 h-11 rounded-2xl bg-[#DFAB5F]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#FBF6EE] tracking-wide mb-1 group-hover:text-[#DFAB5F] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-[#DFAB5F]/90 font-mono mb-2.5">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-[#D8CCC0]/85 font-sans font-light leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Metric Footer with Animated Counter Glow */}
                <div className="pt-3.5 border-t border-[#C69247]/15 flex items-baseline justify-between relative z-10">
                  <span className="text-xl font-serif font-bold text-gold-gradient group-hover:scale-105 transition-transform origin-left inline-block">
                    {item.stat}
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#D8CCC0]/60 group-hover:text-[#DFAB5F] transition-colors">
                    {item.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
