"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Sparkles, CheckCircle2, Play, Pause, Quote } from "lucide-react";

export const TESTIMONIALS_DATA = [
  {
    id: "1",
    author: "Chef Ranveer Brar",
    role: "Masterchef India",
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&auto=format&fit=crop&q=80",
    quote: "Captures the true soul of Indian tea stalls. Slow brass simmering and earthen Varanasi mitti aroma.",
    rating: 5,
    tag: "Masala Chai",
    verified: true,
  },
  {
    id: "2",
    author: "Devika Shenoy",
    role: "Food & Heritage Editor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    quote: "The Masala Chai and Truffle Bun Maska is unbeatable. An intimate sanctuary for unhurried baithaks.",
    rating: 5,
    tag: "Truffle Bun Maska",
    verified: true,
  },
  {
    id: "3",
    author: "Vikramaditya Roy",
    role: "Tea Sommelier",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    quote: "Treats whole-leaf single estate tea with genuine reverence and slow handi craftsmanship.",
    rating: 5,
    tag: "Single Estate",
    verified: true,
  },
  {
    id: "4",
    author: "Ananya Deshmukh",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    quote: "The clay kulhad aroma (mitti ki khushboo) is pure magic. My go-to dawn retreat before studio work.",
    rating: 5,
    tag: "Kesar Elaichi",
    verified: true,
  },
  {
    id: "5",
    author: "Karan Malhotra",
    role: "Tech Founder",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    quote: "Our startup's best ideas were born on these wooden benches with cutting glasses in hand.",
    rating: 5,
    tag: "Adrak Kadak",
    verified: true,
  },
  {
    id: "6",
    author: "Meera Sen",
    role: "Lifestyle Writer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    quote: "A love letter to roadside tapris. You can taste the 25-minute slow dum decoction instantly.",
    rating: 5,
    tag: "Royal Dum Chai",
    verified: true,
  },
  {
    id: "7",
    author: "Rohan Varma",
    role: "Architect & Urbanist",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80",
    quote: "Heritage brass, raw terracotta, and modern luxury combined into one unforgettable experience.",
    rating: 5,
    tag: "Mogra Saffron",
    verified: true,
  },
  {
    id: "8",
    author: "Pooja Hegde",
    role: "Filmmaker",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80",
    quote: "No artificial powders. Hand-pounded spices, whole leaves, and genuine warmth in every cup.",
    rating: 5,
    tag: "Silbatta Special",
    verified: true,
  },
];

/** Diagonal Slow-Drifting Dotted Particle Canvas */
function TestimonialParticleCanvas({ reduceMotion }: { reduceMotion: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = [
      { r: 223, g: 171, b: 95 },  // Gold (#DFAB5F)
      { r: 198, g: 146, b: 71 },  // Brass (#C69247)
      { r: 168, g: 73, b: 36 },   // Terracotta (#A84924)
    ];

    const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
    const particleCount = isMobileDevice ? 15 : 55;
    const particles = Array.from({ length: particleCount }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const depth = 0.4 + Math.random() * 0.6;
      return {
        x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
        y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
        radius: (0.7 + Math.random() * 1.3) * depth,
        vx: -(0.15 + Math.random() * 0.3) * depth, // slow right to left flow
        vy: (0.08 + Math.random() * 0.2) * depth,  // slow downward diagonal drift
        baseAlpha: 0.1 + Math.random() * 0.25,
        alphaPhase: Math.random() * Math.PI * 2,
        alphaSpeed: 0.01 + Math.random() * 0.015,
        color,
      };
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (isVisible) {
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (!reduceMotion) {
            p.x += p.vx;
            p.y += p.vy;
            p.alphaPhase += p.alphaSpeed;

            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y > height + 10) p.y = -10;
            if (p.y < -10) p.y = height + 10;
          }

          const currentAlpha = Math.max(
            0.03,
            p.baseAlpha + Math.sin(p.alphaPhase) * (p.baseAlpha * 0.5)
          );

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
          ctx.fill();
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
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items 3x for smooth infinite marquee looping
  const marqueeItems = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="testimonials" className="relative py-16 md:py-24 bg-[#0D0806] overflow-hidden film-grain select-none">
      {/* 1. Diagonal Drifting Dotted Particle Canvas in Background */}
      <TestimonialParticleCanvas reduceMotion={shouldReduceMotion} />

      {/* 2. Soft Ambient Radial Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-r from-[#C69247]/10 via-[#A84924]/8 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-xl">
            {/* Real Adda Stories Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#C69247]/30 bg-[#1E130D]/80 backdrop-blur-md text-[#DFAB5F] text-[10px] font-semibold uppercase tracking-[0.25em] mb-2.5 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-[#DFAB5F] animate-pulse" />
              <span>Real Adda Stories</span>
            </motion.div>

            {/* Grand Section Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EE] leading-[1.1]"
            >
              Loved by <span className="text-gold-gradient italic font-normal">Chai Lovers.</span>
            </motion.h2>
          </div>

          {/* Social Proof Stats Badge & Functional Pause Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 self-start sm:self-auto"
          >
            {/* Top Rating Badge with Subtle Breathing Sheen */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(0,0,0,0.5)",
                  "0 4px 20px rgba(198,146,71,0.22)",
                  "0 4px 15px rgba(0,0,0,0.5)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#140C08]/95 border border-[#C69247]/35 backdrop-blur-md shadow-md"
            >
              <div className="flex text-[#DFAB5F] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#DFAB5F]" />
                ))}
              </div>
              <span className="text-[11px] font-mono font-bold text-[#FBF6EE]">4.9 / 5.0</span>
              <span className="text-[10px] text-[#D8CCC0]/70 font-sans">• 15k+ Reviews</span>
            </motion.div>

            {/* Functional Pause/Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full border border-[#C69247]/35 bg-[#1E130D]/95 text-[#DFAB5F] hover:bg-[#C69247]/20 hover:border-[#DFAB5F] transition-all shadow-sm"
              title={isPaused ? "Resume Carousel" : "Pause Carousel"}
              aria-label={isPaused ? "Resume Carousel" : "Pause Carousel"}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 fill-[#DFAB5F] ml-0.5" />
              ) : (
                <Pause className="w-3.5 h-3.5 fill-[#DFAB5F]" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* 3. Infinite Right-to-Left (RTL) Continuous Moving Testimonial Carousel */}
      <div
        className="relative w-full overflow-hidden py-6 [touch-action:pan-y]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Soft Fade Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#0D0806] via-[#0D0806]/85 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#0D0806] via-[#0D0806]/85 to-transparent z-20 pointer-events-none" />

        {/* Continuous Smooth Marquee Track */}
        <div
          className={`flex gap-6 sm:gap-9 w-max items-center ${
            isPaused || shouldReduceMotion ? "animate-none" : "animate-marquee-rtl"
          }`}
          style={{
            animationDuration: "44s",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueeItems.map((item, idx) => {
            const isHovered = hoveredCardId === `${item.id}-${idx}`;

            return (
              <div
                key={`${item.id}-${idx}`}
                className="animate-float-slow shrink-0"
                style={{
                  animationDelay: `${(idx % 5) * 0.8}s`,
                  animationDuration: `${4.2 + (idx % 3) * 0.5}s`,
                }}
                onMouseEnter={() => setHoveredCardId(`${item.id}-${idx}`)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Circular Testimonial Orb */}
                <div
                  className={`relative group cursor-pointer transition-transform duration-500 ease-out ${
                    isHovered ? "scale-[1.08] z-30" : "scale-100 hover:scale-[1.04]"
                  }`}
                >
                  {/* Subtle Rotating Outer Warm Gold Halo Ring on Hover/Focus */}
                  <div
                    className={`absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#C69247,#DFAB5F,#A84924,#C69247)] blur-[4px] pointer-events-none transition-opacity duration-500 ${
                      isHovered ? "opacity-100 animate-spin-slow" : "opacity-0"
                    }`}
                  />

                  {/* Main Circular Body */}
                  <div
                    className={`w-[260px] h-[260px] sm:w-[285px] sm:h-[285px] rounded-full p-6 bg-gradient-to-b from-[#24160E]/98 via-[#150D08]/98 to-[#0A0604] border shadow-[0_14px_40px_rgba(0,0,0,0.85)] transition-all duration-500 flex flex-col items-center justify-between text-center relative overflow-hidden ${
                      isHovered
                        ? "border-[#DFAB5F] shadow-[0_20px_50px_rgba(198,146,71,0.3)] bg-gradient-to-b from-[#2D1B11] via-[#1A100A] to-[#0D0806]"
                        : "border-[#C69247]/35 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                    }`}
                  >
                    {/* Inner Ambient Glow */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#C69247]/15 via-transparent to-[#A84924]/15 pointer-events-none transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-35"
                      }`}
                    />

                    {/* Top: Profile Avatar with Halo & Staggered Star Glimmer */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 pt-1">
                      <div className="relative">
                        {/* Soft Warm-Gold Pulsing Halo Ring */}
                        <div
                          className={`absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#DFAB5F] to-[#C69247] blur-md transition-opacity duration-400 animate-pulse ${
                            isHovered ? "opacity-85" : "opacity-0 group-hover:opacity-40"
                          }`}
                        />

                        {/* Portrait Frame with Grayscale Aesthetic */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#C69247] via-[#DFAB5F] to-[#A84924] shadow-md relative z-10 transition-transform duration-300 group-hover:scale-105">
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className={`w-full h-full object-cover rounded-full transition-all duration-500 ${
                              isHovered ? "grayscale-0 contrast-105" : "grayscale contrast-115"
                            }`}
                          />
                        </div>

                        {item.verified && (
                          <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-[#140C08] border border-[#C69247]/60 shadow z-20">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#DFAB5F]" />
                          </div>
                        )}
                      </div>

                      {/* Five Gold Stars with Sequential Stagger Glimmer */}
                      <div className="flex items-center gap-0.5 text-[#DFAB5F]">
                        {[...Array(item.rating)].map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-2.5 h-2.5 fill-[#DFAB5F] transition-all duration-300 ${
                              isHovered ? "scale-125 text-[#FFF2D6]" : "scale-100"
                            }`}
                            style={{
                              transitionDelay: `${starIdx * 45}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Middle: Italic Testimonial Quote */}
                    <div className="relative z-10 px-2 my-auto">
                      <p
                        className={`font-serif text-[11px] sm:text-xs italic leading-snug line-clamp-3 font-light transition-colors duration-400 ${
                          isHovered ? "text-[#FFF8EE]" : "text-[#FBF6EE]/90"
                        }`}
                      >
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Bottom: Author & Role Details */}
                    <div className="relative z-10 pb-1 flex flex-col items-center">
                      <h4
                        className={`text-xs font-serif font-bold tracking-wide transition-colors duration-400 truncate max-w-[200px] ${
                          isHovered ? "text-[#FFF2D6]" : "text-[#DFAB5F]"
                        }`}
                      >
                        {item.author}
                      </h4>
                      <p className="text-[10px] text-[#D8CCC0]/75 font-sans truncate max-w-[190px]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

