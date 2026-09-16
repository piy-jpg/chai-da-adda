"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Flame, Coffee, Compass, ArrowDown } from "lucide-react";
import { chaiAmbience } from "@/lib/audioAmbience";
import { useCart } from "@/lib/cartContext";

const TOTAL_FRAMES = 240;

function formatFrameNumber(num: number): string {
  return num.toString().padStart(4, "0");
}

export function CinematicHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { setIsReservationOpen } = useCart();

  const currentFrameRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(0);
  const playbackSpeedRef = useRef<number>(1);

  isPlayingRef.current = isPlaying;
  playbackSpeedRef.current = playbackSpeed;

  // Draw a frame to canvas with aspect-ratio cover math
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Cover calculations
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW: number;
    let renderH: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      renderW = width;
      renderH = width / imgRatio;
      offsetX = 0;
      offsetY = (height - renderH) / 2;
    } else {
      renderH = height;
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Subtle dark gradient vignette overlay for high-end cinematic contrast
    const grad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.3,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.8
    );
    grad.addColorStop(0, "rgba(8, 6, 4, 0.1)");
    grad.addColorStop(0.7, "rgba(8, 6, 4, 0.45)");
    grad.addColorStop(1, "rgba(8, 6, 4, 0.85)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }, []);

  // Preload all 240 frames
  useEffect(() => {
    let loadedCount = 0;
    const imageList: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/vedic/frame-${formatFrameNumber(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);

        if (loadedCount === 20 && !isLoaded) {
          drawFrame(1);
        }

        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
          drawFrame(1);
        }
      };
      img.onerror = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);
        if (loadedCount >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      imageList.push(img);
    }

    imagesRef.current = imageList;
  }, [drawFrame, isLoaded]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Continuous Cinematic Animation Loop (at 24/30 FPS)
  useEffect(() => {
    let animationFrameId: number;
    const fps = 24;
    const interval = 1000 / fps;

    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;
      const targetInterval = interval / playbackSpeedRef.current;

      if (elapsed > targetInterval) {
        lastTimeRef.current = timestamp - (elapsed % targetInterval);

        if (isPlayingRef.current && imagesRef.current.length > 0) {
          let next = currentFrameRef.current + 1;
          if (next > TOTAL_FRAMES) {
            next = 1;
          }
          currentFrameRef.current = next;
          setCurrentFrame(next);
          drawFrame(next);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [drawFrame]);

  // Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  // Toggle Audio Ambience
  const toggleAudio = () => {
    const nowPlaying = chaiAmbience.toggle();
    setIsMuted(!nowPlaying);
  };

  // Manual scrubber
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frame = parseInt(e.target.value, 10);
    currentFrameRef.current = frame;
    setCurrentFrame(frame);
    drawFrame(frame);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-obsidian select-none"
    >
      {/* Canvas Frame Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      />

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-md px-6 text-center"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin flex items-center justify-center" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-8 h-8 text-amber-500 animate-pulse" />
              </div>
            </div>

            <span className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-2">
              Simmering Fresh Chai
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-amber-100 mb-4">
              Chai Ka Adda
            </h2>

            {/* Progress Bar */}
            <div className="w-64 max-w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden border border-amber-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200"
                style={{ width: `${loadProgress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            <span className="text-xs text-amber-300/60 mt-2 font-mono">
              Loading Cinematic Frames • {loadProgress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Lighting & Mist Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-obsidian via-transparent to-obsidian/60 z-10" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-clay-rust/20 blur-[130px] pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center">
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide mb-6 md:mb-8 gold-glow"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ESTD. VARANASI & UPPER ASSAM • CINEMATIC CHAI EXPERIENCE</span>
        </motion.div>

        {/* Main Grand Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
          }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-amber-50 leading-[1.08] mb-4 drop-shadow-2xl">
            CHAI KA <span className="text-gold-gradient italic font-normal">ADDA</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-amber-200/80 tracking-wide max-w-2xl mx-auto font-sans mb-8 leading-relaxed">
            The Art of Slow-Simmered Indian Chai. Stone-crushed spices, single-estate Assam leaves, and 25-minute brass handi slow dum in authentic terracotta kulhads.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12"
        >
          <a
            href="#featured-brews"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold tracking-wide text-sm sm:text-base transition-all duration-300 hover:scale-105 gold-glow"
          >
            <Coffee className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
            <span>Explore Royal Brews</span>
          </a>

          <button
            onClick={() => setIsReservationOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full glass-panel border border-amber-400/40 text-amber-100 font-medium tracking-wide text-sm sm:text-base transition-all duration-300 hover:bg-amber-500/10 hover:border-amber-400 hover:scale-105"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Reserve Adda Table</span>
          </button>
        </motion.div>

        {/* Floating Spice Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full"
        >
          {[
            { title: "24K Mogra Saffron", desc: "Pampore Valley", icon: "🌸" },
            { title: "Silbatta Crushed", desc: "18 Hand-Pounded Spices", icon: "🌿" },
            { title: "Brass Handi Dum", desc: "25-Min Slow Simmer", icon: "🏺" },
            { title: "Clay Kulhad Pour", desc: "Varanasi Kiln Earthen", icon: "✨" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-3.5 rounded-2xl border-amber-500/20 text-left flex items-center gap-3 hover:border-amber-400/40 transition-all duration-300 hover:bg-amber-950/20 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <div>
                <p className="text-xs font-semibold text-amber-100 tracking-wide">
                  {item.title}
                </p>
                <p className="text-[11px] text-amber-400/70 font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Player Controls Floating Bar (Bottom) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-xl glass-panel-gold rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause cinematic loop" : "Play cinematic loop"}
            className="p-2 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black" />}
          </button>

          {/* Reset Frame */}
          <button
            onClick={() => {
              currentFrameRef.current = 1;
              setCurrentFrame(1);
              drawFrame(1);
            }}
            title="Restart Animation"
            className="p-2 rounded-full text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const speeds = [0.5, 1, 1.5, 2];
              const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
              setPlaybackSpeed(speeds[nextIndex]);
            }}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Frame Scrubber */}
        <div className="flex-1 flex items-center gap-2 mx-1 sm:mx-3">
          <input
            type="range"
            min={1}
            max={TOTAL_FRAMES}
            value={currentFrame}
            onChange={handleScrub}
            className="w-full h-1 bg-amber-900/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <span className="text-[10px] font-mono text-amber-300/80 whitespace-nowrap min-w-[50px] text-right">
            {formatFrameNumber(currentFrame)}/240
          </span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleAudio}
          title={isMuted ? "Turn on Adda Ambient Soundscape" : "Mute Soundscape"}
          className={`p-2 rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium ${
            !isMuted
              ? "bg-amber-500/30 text-amber-300 border border-amber-400/40"
              : "text-amber-400/60 hover:text-amber-200 hover:bg-amber-500/10"
          }`}
        >
          {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
            {!isMuted ? "Sound On" : "Ambience"}
          </span>
        </button>
      </div>

      {/* Scroll Down Hint */}
      <a
        href="#craft-heritage"
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-amber-400/60 hover:text-amber-300 transition-colors animate-bounce cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </a>
    </div>
  );
}
