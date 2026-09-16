"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, Sparkles, Users, MessageSquare, ArrowUpRight } from "lucide-react";

interface MomentItem {
  id: string;
  tag: string;
  hindiTitle: string;
  title: string;
  description: string;
  badge: string;
  metric: string;
  image: string;
  icon: typeof Flame;
  accent: string;
  hasSteam?: boolean;
}

const MOMENTS: MomentItem[] = [
  {
    id: "brass-dum",
    tag: "The Craft",
    hindiTitle: "पीतल की हांडी",
    title: "Steaming Brass Pots",
    description: "Caramelized decoctions rolling on open hearth fires, filling misty mornings with crushed adrak & green cardamom.",
    badge: "100°C Slow Dum",
    metric: "25-Min Boil",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85",
    icon: Flame,
    accent: "from-amber-600/20 to-amber-950/5",
    hasSteam: true,
  },
  {
    id: "baithak-vibes",
    tag: "The Soul",
    hindiTitle: "बेपरवाह बैठक",
    title: "Unhurried Baithaks",
    description: "Raw teakwood benches where startup ideas spark, poetry is traded, and strangers leave as lifelong friends.",
    badge: "Zero Screens Needed",
    metric: "Pure Community",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=85",
    icon: Users,
    accent: "from-orange-600/20 to-amber-950/5",
    hasSteam: false,
  },
  {
    id: "varanasi-clay",
    tag: "The Earth",
    hindiTitle: "मिट्टी की सोंधी खुशबू",
    title: "Varanasi Kiln Kulhads",
    description: "Handcrafted unglazed porous terracotta, infusing irreplaceable rainy earth petrichor into every piping hot sip.",
    badge: "Kiln Baked Earthen",
    metric: "100% Varanasi",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=85",
    icon: Sparkles,
    accent: "from-amber-700/20 to-neutral-950/5",
    hasSteam: true,
  },
];

const cinematicEase = [0.22, 1, 0.36, 1] as const;

/** Real-time 3D Particle, Spice, Tea-Leaf, & Dotted Atmosphere Canvas */
function Experience3DCanvas({ reduceMotion }: { reduceMotion: boolean | null }) {
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

    // 3D Perspective Parameters
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

    const isMobileDevice = window.innerWidth < 768;
    const maxParticles = isMobileDevice ? 16 : 75;
    const particles: Particle3D[] = [];

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
        vx: (Math.random() - 0.5) * 0.4 + (spice.type === "dot" ? 0.25 : 0),
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

    // Initialize distributed particles
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

        // Smooth mouse lerp
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        // Dynamic 3D ambient light around cursor
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

        // Sort particles by Z depth
        particles.sort((a, b) => b.z - a.z);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.life++;

          // Life cycle alpha fade
          const progress = p.life / p.maxLife;
          if (progress < 0.2) {
            p.alpha = (progress / 0.2) * p.maxAlpha;
          } else if (progress > 0.75) {
            p.alpha = (1 - (progress - 0.75) / 0.25) * p.maxAlpha;
          } else {
            p.alpha = p.maxAlpha;
          }

          if (!reduceMotion) {
            // Physics movement
            p.x += p.vx + Math.sin(frame * 0.012 + p.z * 0.02) * 0.25;
            p.y += p.vy;
            p.z += p.vz;
            p.rot += p.rotSpeed;

            // Interactive mouse 3D repulsion
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

          // 3D perspective projection
          const scale = fov / (fov + p.z);
          if (scale <= 0) continue;

          const projX = cx + p.x * scale;
          const projY = cy + p.y * scale;
          const projSize = Math.max(0.6, p.baseSize * scale);

          // Respawn expired particles
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
            // Tea leaf flake
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

export function Experience() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative py-16 md:py-24 bg-[#0D0806] overflow-hidden film-grain select-none">
      {/* 3D Real-time Saffron, Cardamom, Tea Leaf, Glowing Embers & Dotted Particle Physics Canvas */}
      <Experience3DCanvas reduceMotion={shouldReduceMotion} />


      {/* 2. Barely Visible Warm Radial Glow with Slow Atmospheric Movement */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: ["-50%", "-48%", "-52%", "-50%"],
                y: ["-50%", "-52%", "-48%", "-50%"],
                opacity: [0.75, 0.95, 0.8, 0.75],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 w-[700px] h-[380px] bg-gradient-to-r from-[#C69247]/8 via-[#A84924]/5 to-transparent rounded-full blur-[180px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* SECTION ENTRANCE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          {/* Badge with Smooth Fade-In & Gentle Upward Movement */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, ease: cinematicEase }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/80 backdrop-blur-md text-[#DFAB5F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm"
          >
            <MessageSquare className="w-3 h-3 text-[#DFAB5F]" />
            <span>The Adda Atmosphere</span>
          </motion.div>

          {/* Line-by-Line Cinematic Mask Reveal */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#FBF6EE] leading-[1.08] mb-3 tracking-tight">
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.05, delay: 0.12, ease: cinematicEase }}
                className="block"
              >
                Where Every Cup
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-0.5">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.05, delay: 0.28, ease: cinematicEase }}
                className="block text-gold-gradient italic font-normal"
              >
                Starts A Conversation.
              </motion.span>
            </span>
          </h2>

          {/* Supporting Paragraph with Subtle Elegant Fade */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.44, ease: cinematicEase }}
            className="text-xs sm:text-sm text-[#D8CCC0] font-sans font-light max-w-lg mx-auto"
          >
            Step away from the rush. Sit on wooden baithaks, breathe in freshly roasted spices, and let time slow down with people you cherish.
          </motion.p>
        </div>

        {/* THREE EXPERIENCE CARDS: Sequential Entrance, 120ms Stagger, 35px Initial Offset */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {MOMENTS.map((m, idx) => {
            const Icon = m.icon;
            const isHovered = hoveredCard === m.id;

            return (
              <motion.div
                key={m.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 35 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.95,
                  delay: shouldReduceMotion ? 0 : 0.52 + idx * 0.12,
                  ease: cinematicEase,
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                onMouseEnter={() => setHoveredCard(m.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-[#1E130D]/95 via-[#140C08]/98 to-[#0A0604] border border-[#C69247]/25 hover:border-[#DFAB5F]/60 backdrop-blur-xl shadow-xl hover:shadow-[0_16px_36px_rgba(198,146,71,0.14)] transition-all duration-400 ease-out flex flex-col justify-between relative overflow-hidden cursor-pointer"
              >
                {/* Subtle Warm Highlight Radial Background Glow */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${m.accent} rounded-full blur-2xl pointer-events-none transition-all duration-500 ease-out ${
                    isHovered ? "scale-125 opacity-100" : "opacity-25"
                  }`}
                />

                <div className="relative z-10">
                  {/* IMAGE CONTAINER */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-[#C69247]/20 bg-[#140C08]">
                    {/* Continuous Slow Cinematic Pan/Zoom (1.02 - 1.04) + Hover Zoom (1.05) & Brightness */}
                    <motion.div
                      className="w-full h-full"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: isHovered ? 1.05 : [1.02, 1.038, 1.02],
                              x: isHovered ? 0 : [0, 2, -2, 0],
                            }
                      }
                      transition={
                        isHovered
                          ? { duration: 0.45, ease: cinematicEase }
                          : {
                              duration: 18 + idx * 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                    >
                      <img
                        src={m.image}
                        alt={m.title}
                        className={`w-full h-full object-cover transition-[filter] duration-400 ease-out ${
                          isHovered ? "brightness-105 contrast-105" : "brightness-90 contrast-105"
                        }`}
                      />
                    </motion.div>

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806] via-[#0D0806]/25 to-transparent pointer-events-none" />

                    {/* Realistic Subtle Chai Steam Wisps for Tea/Kulhad cards */}
                    {m.hasSteam && !shouldReduceMotion && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                        <motion.div
                          initial={{ opacity: 0, y: "15%", scaleX: 0.8 }}
                          animate={{
                            opacity: [0, 0.16, 0.24, 0],
                            y: ["10%", "-35%"],
                            scaleX: [0.8, 1.2, 1.4],
                          }}
                          transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 1.5,
                          }}
                          className="absolute bottom-4 left-1/3 w-24 h-36 bg-gradient-to-t from-[#DFAB5F]/15 via-[#FBF6EE]/10 to-transparent blur-xl rounded-full"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: "20%", scaleX: 0.9 }}
                          animate={{
                            opacity: [0, 0.12, 0.2, 0],
                            y: ["15%", "-30%"],
                            scaleX: [0.9, 1.3, 1.5],
                          }}
                          transition={{
                            duration: 6.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 1.5 + 2.4,
                          }}
                          className="absolute bottom-6 left-1/2 w-28 h-40 bg-gradient-to-t from-[#C69247]/15 via-[#FBF6EE]/8 to-transparent blur-2xl rounded-full"
                        />
                      </div>
                    )}

                    {/* Fixed Top Left Icon Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-[#0D0806]/85 border border-[#C69247]/35 backdrop-blur-md flex items-center gap-1.5 shadow-md z-20">
                      <Icon className="w-3.5 h-3.5 text-[#DFAB5F]" />
                      <span className="text-[10px] font-mono text-[#DFAB5F]">{m.tag}</span>
                    </div>

                    {/* Fixed Top Right Live Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-[#1E130D]/90 border border-[#C69247]/35 backdrop-blur-md text-[10px] font-mono text-[#FBF6EE] shadow-md z-20">
                      {m.badge}
                    </div>

                    {/* Fixed Bottom Floating Hindi Subtitle */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-serif text-[#DFAB5F] z-20">
                      <span>{m.hindiTitle}</span>
                      <span className="font-mono text-[10px] text-[#D8CCC0]/60">0{idx + 1}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors duration-400 mb-2">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[#D8CCC0]/85 font-sans font-light leading-relaxed mb-4">
                    {m.description}
                  </p>
                </div>

                {/* Card Footer with Expanding Gold Divider Line on Hover */}
                <div className="relative pt-3.5 z-10">
                  {/* Base Divider Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#C69247]/15" />
                  {/* Expanding Full-Width Gold Line on Hover */}
                  <div
                    className={`absolute top-0 left-0 h-[1px] bg-gradient-to-r from-[#DFAB5F] via-[#C69247] to-[#DFAB5F]/40 transition-all duration-400 ease-out ${
                      isHovered ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#DFAB5F] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFAB5F] animate-pulse" />
                      {m.metric}
                    </span>

                    {/* Explore Vibe with 4-6px Right Movement on Hover */}
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D8CCC0]/70 group-hover:text-[#DFAB5F] flex items-center gap-1 transition-all duration-400 ease-out transform group-hover:translate-x-[5px]">
                      <span>Explore Vibe</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

