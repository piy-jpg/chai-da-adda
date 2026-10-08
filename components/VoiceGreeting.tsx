"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX, RotateCcw, Sparkles } from "lucide-react";

export function VoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    // Initialize audio instance
    const audio = new Audio("/audio/welcome-voice.mp3");
    audio.preload = "auto";
    audioRef.current = audio;

    audio.onplay = () => {
      setIsPlaying(true);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setHasCompletedOnce(true);
      try {
        sessionStorage.setItem("cda_welcome_played", "true");
      } catch {}
    };

    audio.onpause = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      setIsPlaying(false);
    };

    // Check if greeting has already been played in this browser session
    let alreadyPlayedThisSession = false;
    try {
      alreadyPlayedThisSession = sessionStorage.getItem("cda_welcome_played") === "true";
    } catch {}

    if (alreadyPlayedThisSession) {
      setHasCompletedOnce(true);
      return () => {
        audio.pause();
      };
    }

    // Auto-start function
    const startAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          try {
            sessionStorage.setItem("cda_welcome_played", "true");
          } catch {}
          cleanupAutoListeners();
        })
        .catch(() => {
          // If browser restricts unprompted audio, register early auto-triggers
          attachAutoListeners();
        });
    };

    const onUserInteraction = () => {
      startAudio();
    };

    const attachAutoListeners = () => {
      window.addEventListener("pointerdown", onUserInteraction, { once: true, passive: true });
      window.addEventListener("touchstart", onUserInteraction, { once: true, passive: true });
      window.addEventListener("scroll", onUserInteraction, { once: true, passive: true });
      window.addEventListener("click", onUserInteraction, { once: true, passive: true });
      window.addEventListener("keydown", onUserInteraction, { once: true, passive: true });
      window.addEventListener("wheel", onUserInteraction, { once: true, passive: true });
    };

    const cleanupAutoListeners = () => {
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("wheel", onUserInteraction);
    };

    // Attempt automatic playback immediately on site open
    const timer = setTimeout(startAudio, 400);

    return () => {
      clearTimeout(timer);
      cleanupAutoListeners();
      audio.pause();
    };
  }, []);

  const handlePlayOrReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Mute / pause action
      audio.pause();
      audio.currentTime = 0;
    } else {
      // Play / replay action
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          try {
            sessionStorage.setItem("cda_welcome_played", "true");
          } catch {}
        })
        .catch(() => {});
    }
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Welcome Voice Greeting"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none pointer-events-auto"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 backdrop-blur-2xl border shadow-2xl group ${
          isPlaying
            ? "bg-[#140C08]/96 border-[#DFAB5F]/75 shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_28px_rgba(223,171,95,0.4)]"
            : "bg-[#120B08]/92 border-[#C69247]/40 hover:border-[#DFAB5F]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(198,146,71,0.12)]"
        }`}
      >
        {/* Interactive Gold Speaker Icon Button */}
        <button
          onClick={handlePlayOrReplay}
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#DFAB5F] via-[#F3CE85] to-[#C69247] text-[#0D0806] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          title={isPlaying ? "Mute Welcome Greeting" : "Replay Welcome Greeting"}
          aria-label={isPlaying ? "Mute Welcome Greeting" : "Replay Welcome Greeting"}
        >
          {isPlaying ? (
            <VolumeX className="w-4 h-4 stroke-[2.5]" />
          ) : hasCompletedOnce ? (
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Volume2 className="w-4 h-4 stroke-[2.5] animate-pulse" />
          )}
        </button>

        {/* Text Details & Real-time Equalizer Soundwaves */}
        <div onClick={handlePlayOrReplay} className="flex flex-col cursor-pointer pr-1">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors leading-tight">
              {isPlaying ? "“Hey, chai lovers!”" : "Chai Da Adda Voice"}
            </span>

            {/* Animated Equalizer Waveform while speaking */}
            {isPlaying && (
              <div className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
                <span className="w-0.5 h-3.5 bg-[#DFAB5F] rounded-full animate-pulse" style={{ animationDuration: "0.5s" }} />
                <span className="w-0.5 h-5 bg-[#F3CE85] rounded-full animate-bounce" style={{ animationDuration: "0.4s", animationDelay: "0.1s" }} />
                <span className="w-0.5 h-2.5 bg-[#DFAB5F] rounded-full animate-pulse" style={{ animationDuration: "0.6s", animationDelay: "0.2s" }} />
                <span className="w-0.5 h-4 bg-[#DFAB5F] rounded-full animate-bounce" style={{ animationDuration: "0.45s", animationDelay: "0.15s" }} />
              </div>
            )}
          </div>

          <span className="text-[8.5px] sm:text-[9.5px] font-mono text-[#DFAB5F]/90 uppercase tracking-widest leading-tight mt-0.5">
            {isPlaying ? "Playing Live • Tap to Mute" : "Tap to Replay Greeting"}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
