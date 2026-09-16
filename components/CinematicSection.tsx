"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Coffee, ArrowRight } from "lucide-react";

/** Real-time 3D Particle, Spice, Tea-Leaf, & Dotted Atmosphere Canvas for Cinematic Break */
function Cinematic3DCanvas({ reduceMotion }: { reduceMotion: boolean | null }) {
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

export function CinematicSection() {
  const shouldReduceMotion = useReducedMotion();

  const cinematicEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative py-20 md:py-28 flex items-center justify-center overflow-hidden bg-[#0A0604] film-grain select-none">
      {/* 1. Full Complete Animated Cinematic Background Chai Visual (Ken Burns Slow Zoom) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1.04, 1.09, 1.04],
                  y: ["0%", "-2%", "0%"],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1800&auto=format&fit=crop&q=88"
            alt="Authentic Steaming Varanasi Kulhad Chai"
            className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.15] saturate-[1.2]"
          />
        </motion.div>

        {/* Cinematic Dual Vignette Overlays for Crisp Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604] via-[#0A0604]/60 to-[#0A0604]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0604]/40 to-[#0A0604]/90" />

        {/* Ambient Warm Chai Hearth Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full bg-gradient-to-r from-[#C69247]/20 via-[#A84924]/15 to-transparent blur-[160px]" />

        {/* Rising Organic Steam Wisps from Background Chai */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, y: "30%", scaleX: 0.8 }}
              animate={{
                opacity: [0, 0.22, 0.32, 0],
                y: ["25%", "-40%"],
                scaleX: [0.8, 1.3, 1.6],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-1/4 w-44 h-64 bg-gradient-to-t from-[#DFAB5F]/20 via-[#FBF6EE]/12 to-transparent blur-3xl rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, y: "35%", scaleX: 0.9 }}
              animate={{
                opacity: [0, 0.18, 0.28, 0],
                y: ["30%", "-35%"],
                scaleX: [0.9, 1.4, 1.7],
              }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
              className="absolute bottom-10 right-1/4 w-52 h-72 bg-gradient-to-t from-[#C69247]/20 via-[#FBF6EE]/10 to-transparent blur-3xl rounded-full"
            />
          </div>
        )}
      </div>

      {/* 2. 3D Real-time Saffron, Cardamom, Tea Leaf, Glowing Embers & Dotted Particle Physics Canvas */}
      <Cinematic3DCanvas reduceMotion={shouldReduceMotion} />

      {/* 3. Crisp Cinematic Content with Animated Reveals */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="flex flex-col items-center">
          {/* Top Pill Entrance */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: cinematicEase }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#C69247]/35 bg-[#1E130D]/85 text-[#DFAB5F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-4 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-3 h-3 text-[#DFAB5F] animate-pulse" />
            <span>The Adda Spirit</span>
          </motion.div>

          {/* Hindi Calligraphy Reveal */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.14, ease: cinematicEase }}
            className="text-xl sm:text-2xl md:text-3xl font-serif text-[#DFAB5F] mb-2 tracking-wider font-normal drop-shadow-[0_2px_12px_rgba(223,171,95,0.3)]"
          >
            एक कप चाय, हज़ार कहानियाँ
          </motion.p>

          {/* Grand Crisp Heading with Line-by-Line Reveal */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-[#FBF6EE] leading-[1.06] tracking-tight mb-5">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.05, delay: 0.26, ease: cinematicEase }}
                className="block"
              >
                &ldquo;Ek Cup Chai.
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-0.5">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.05, delay: 0.4, ease: cinematicEase }}
                className="block text-gold-gradient italic font-light"
              >
                Hazaar Kahaniyan.&rdquo;
              </motion.span>
            </span>
          </h2>

          {/* Short Narrative Paragraph */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.54, ease: cinematicEase }}
            className="text-sm sm:text-base md:text-lg text-[#D8CCC0] font-sans font-light max-w-xl mx-auto leading-relaxed mb-8 drop-shadow-sm"
          >
            One cup brings strangers together, sparks deep memories, and turns fleeting moments into timeless friendships.
          </motion.p>

          {/* 3-Pill Memory Strip with Staggered Entrance */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, delay: 0.66, ease: cinematicEase }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-9"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-[#140C08]/90 border border-[#C69247]/30 text-[11px] font-mono text-[#DFAB5F] backdrop-blur-md shadow-md hover:border-[#DFAB5F] transition-colors">
              🌅 The Dawn Baithak
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#140C08]/90 border border-[#C69247]/30 text-[11px] font-mono text-[#DFAB5F] backdrop-blur-md shadow-md hover:border-[#DFAB5F] transition-colors">
              🪵 The Wooden Bench
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#140C08]/90 border border-[#C69247]/30 text-[11px] font-mono text-[#DFAB5F] backdrop-blur-md shadow-md hover:border-[#DFAB5F] transition-colors">
              🤝 The Sacred Bond
            </span>
          </motion.div>

          {/* Call to Action Button */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, delay: 0.78, ease: cinematicEase }}
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#visit"
              className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#C69247] via-[#DFAB5F] to-[#C69247] text-[#0D0806] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-[0_10px_25px_rgba(198,146,71,0.3)] hover:shadow-[0_15px_35px_rgba(223,171,95,0.45)]"
            >
              <Coffee className="w-4 h-4" />
              <span>Join The Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

