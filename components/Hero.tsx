"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles, Coffee, ArrowUpRight, Flame, Leaf, Clock } from "lucide-react";

/** Real-time 3D Particle, Spice, Tea-Leaf, & Dotted Atmosphere Canvas for Hero */
function Hero3DCanvas() {
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

    const isMobileDevice = window.innerWidth < 768;
    const maxParticles = isMobileDevice ? 20 : 80;
    const particles: Particle3D[] = [];

    const spiceTypes: Array<{
      type: Particle3D["type"];
      color: string;
      sizeRange: [number, number];
      alpha: number;
    }> = [
      { type: "steam", color: "245, 230, 210", sizeRange: [22, 54], alpha: 0.14 },
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

        if (mouseRef.current.isHovered) {
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

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      className="absolute inset-0 pointer-events-auto z-15 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Ensure video does not autoplay, so scroll drives it frame-by-frame
    video.pause();
    video.currentTime = 0;

    let triggerInstance: ScrollTrigger | null = null;
    let proxy = { currentTime: 0 };

    const setupTimeline = () => {
      const duration = video.duration || 10;
      setVideoDuration(duration);

      if (triggerInstance) {
        triggerInstance.kill();
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3600",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Scrub the video currentTime smoothly across the scroll duration
      tl.to(
        proxy,
        {
          currentTime: duration,
          ease: "none",
          onUpdate: () => {
            if (video && !isNaN(proxy.currentTime)) {
              video.currentTime = proxy.currentTime;
            }
          },
        },
        0
      );

      // Subtle scale effect on the video container
      tl.to(
        video,
        {
          scale: 1.09,
          ease: "power1.inOut",
        },
        0
      );

      triggerInstance = tl.scrollTrigger || null;
    };

    if (video.readyState >= 1) {
      setupTimeline();
    } else {
      video.addEventListener("loadedmetadata", setupTimeline);
      video.addEventListener("canplay", setupTimeline);
    }

    return () => {
      video.removeEventListener("loadedmetadata", setupTimeline);
      video.removeEventListener("canplay", setupTimeline);
      if (triggerInstance) {
        triggerInstance.kill();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#0A0604] select-none"
    >
      {/* Scroll-Scrubbed Video Frame */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover transform-gpu pointer-events-none filter brightness-95"
        >
          <source src="/videos/chai-ka-adda.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 3D Real-time Saffron, Cardamom, Tea Leaf, Glowing Embers & Dotted Particle Physics Canvas */}
      <Hero3DCanvas />

      {/* Cinematic Dark & Warm Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806] via-[#0D0806]/45 to-[#0D0806]/75 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0D0806]/35 to-[#0D0806]/90 pointer-events-none z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#C69247]/10 blur-[170px] pointer-events-none z-10" />

      {/* Dynamic Narrative Stages (Crossfading across 4 stages based on scrollProgress) */}
      <div className="relative z-20 w-full h-full max-w-5xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center">
        {/* ================= STAGE 1: 0% to 25% (The Brand Awakening) ================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 transition-all duration-500 pointer-events-auto"
          style={{
            opacity: scrollProgress <= 0.24 ? Math.max(0, 1 - scrollProgress * 4.2) : 0,
            transform: `translateY(${scrollProgress * -35}px)`,
            pointerEvents: scrollProgress <= 0.22 ? "auto" : "none",
          }}
        >
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/75 backdrop-blur-md text-[#DFAB5F] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6 shadow-xl">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#DFAB5F]" />
            <span>CHAI KA ADDA</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-[#FBF6EE] leading-[1.1] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
            More Than Chai. <br />
            <span className="text-gold-gradient italic font-normal">
              It&apos;s An Experience.
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-xl md:text-2xl text-[#D8CCC0] font-sans font-light max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Authentic Indian chai, crafted with warmth, tradition and a modern soul.
          </p>
        </div>

        {/* ================= STAGE 2: 25% to 50% (Upper Assam Leaves & Whole Spices) ================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 transition-all duration-500"
          style={{
            opacity:
              scrollProgress > 0.22 && scrollProgress < 0.52
                ? Math.min(1, Math.sin(((scrollProgress - 0.22) / 0.3) * Math.PI) * 1.35)
                : 0,
            transform: `translateY(${(scrollProgress - 0.36) * -25}px)`,
            pointerEvents: scrollProgress > 0.24 && scrollProgress < 0.48 ? "auto" : "none",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/75 backdrop-blur-md text-[#DFAB5F] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] mb-3 sm:mb-5">
            <Leaf className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#DFAB5F]" />
            <span>WHOLE LEAF & BOTANICALS</span>
          </div>

          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FBF6EE] leading-tight mb-3 sm:mb-5 drop-shadow-2xl">
            Upper Assam Leaves. <br />
            <span className="text-gold-gradient italic font-normal">
              18 Hand-Pounded Spices.
            </span>
          </h2>

          <p className="text-xs sm:text-lg md:text-xl text-[#D8CCC0] font-sans font-light max-w-xl mx-auto leading-relaxed mb-5 sm:mb-8">
            Single-estate golden tips infused with fragrant green Idukki cardamom, fiery mountain adrak, and royal saffron.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["Single-Estate Assam", "Idukki Cardamom", "Pampore Saffron"].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#1E130D]/80 border border-[#C69247]/25 text-[10px] sm:text-xs text-[#DFAB5F] font-mono uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= STAGE 3: 50% to 75% (Slow Brass Dum & Kiln Mitti) ================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 transition-all duration-500"
          style={{
            opacity:
              scrollProgress > 0.48 && scrollProgress < 0.78
                ? Math.min(1, Math.sin(((scrollProgress - 0.48) / 0.3) * Math.PI) * 1.35)
                : 0,
            transform: `translateY(${(scrollProgress - 0.62) * -25}px)`,
            pointerEvents: scrollProgress > 0.5 && scrollProgress < 0.74 ? "auto" : "none",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/75 backdrop-blur-md text-[#DFAB5F] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] mb-3 sm:mb-5">
            <Flame className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#DFAB5F]" />
            <span>THE SLOW DUM CRAFT</span>
          </div>

          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FBF6EE] leading-tight mb-3 sm:mb-5 drop-shadow-2xl">
            Slow Brass Boiling. <br />
            <span className="text-gold-gradient italic font-normal">
              Varanasi Kiln Kulhads.
            </span>
          </h2>

          <p className="text-xs sm:text-lg md:text-xl text-[#D8CCC0] font-sans font-light max-w-xl mx-auto leading-relaxed mb-5 sm:mb-8">
            Caramelized decoctions rolling on open hearths, served exclusively in unglazed earthen terracotta for authentic petrichor.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["Hand-Beaten Brass", "25-Min Dum", "100% Varanasi Kiln"].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#1E130D]/80 border border-[#C69247]/25 text-[10px] sm:text-xs text-[#DFAB5F] font-mono uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================= STAGE 4: 75% to 100% (The Grand Climax & Action CTAs) ================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 transition-all duration-500"
          style={{
            opacity: scrollProgress >= 0.74 ? Math.min(1, (scrollProgress - 0.74) * 4) : 0,
            transform: `translateY(${(1 - scrollProgress) * 25}px)`,
            pointerEvents: scrollProgress >= 0.76 ? "auto" : "none",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/75 backdrop-blur-md text-[#DFAB5F] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-5">
            <Coffee className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#DFAB5F]" />
            <span>YOUR CUP IS READY</span>
          </div>

          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FBF6EE] leading-tight mb-3 sm:mb-5 drop-shadow-2xl">
            Every Sip Begins <br />
            <span className="text-gold-gradient italic font-normal">
              A Timeless Conversation.
            </span>
          </h2>

          <p className="text-xs sm:text-xl text-[#D8CCC0] font-sans font-light max-w-xl mx-auto leading-relaxed mb-6 sm:mb-10">
            Step into the Adda, pull up a wooden bench, and taste the rich soul of authentic Indian chai culture.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none">
            <a
              href="#chai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C69247] hover:bg-[#DFAB5F] text-[#0D0806] font-bold text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300 hover:scale-105 gold-glow shadow-lg"
            >
              <span>Explore Our Chai</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#visit"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#C69247]/40 bg-[#140C08]/80 hover:bg-[#C69247]/15 hover:border-[#DFAB5F] text-[#FBF6EE] font-medium text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-md"
            >
              Visit The Adda
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[#C69247]/60 pointer-events-none">
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
