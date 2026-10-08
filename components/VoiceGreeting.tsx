"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

const WELCOME_GREETING_TEXT =
  "Welcome to Chai Da Adda! Experience the warmth of authentic Indian kulhad chai, hand-poured with roasted spices, ginger, and love. Scroll down to discover our signature blends and stories.";

const SESSION_STORAGE_KEY = "chai_greeted_home";

export function VoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [voiceLabel, setVoiceLabel] = useState<string>("Chai Da Adda Voice");
  const audioFallbackRef = useRef<HTMLAudioElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasTriggeredRef = useRef(false);

  // Stop all speech & audio playback
  const stopAll = useCallback(() => {
    audioEngine.stop();
    if (audioFallbackRef.current) {
      audioFallbackRef.current.pause();
      audioFallbackRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  // Speak welcome message using TTS engine with audio file fallback
  const triggerWelcomeVoice = useCallback((isManual = false) => {
    if (isPlaying) {
      stopAll();
      return;
    }

    // If auto-triggering, check if already spoken this session
    if (!isManual && audioEngine.hasSpokenThisSession(SESSION_STORAGE_KEY)) {
      return;
    }

    // Mark as played for session
    audioEngine.markSpokenThisSession(SESSION_STORAGE_KEY);
    hasTriggeredRef.current = true;
    setHasPlayed(true);

    // Initialize TTS voices
    audioEngine.initVoices().then((voices) => {
      const best = audioEngine.getBestVoice("en-IN");
      if (best) {
        setVoiceLabel(best.name.replace(/Google|Microsoft|Apple|Natural/gi, "").trim() || "Natural Voice");
      }
    });

    const spoken = audioEngine.speak({
      text: WELCOME_GREETING_TEXT,
      rate: 0.94,
      pitch: 1.02,
      lang: "en-IN",
      onStart: () => {
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
      },
      onError: () => {
        // Fallback to recorded audio if TTS fails or is blocked
        const audio = audioFallbackRef.current;
        if (audio) {
          audio.currentTime = 0;
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          setIsPlaying(false);
        }
      },
    });

    if (!spoken) {
      // Direct fallback
      const audio = audioFallbackRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [isPlaying, stopAll]);

  useEffect(() => {
    setMounted(true);

    // Prepare backup audio
    const audio = new Audio("/audio/welcome-voice.mp3");
    audio.preload = "auto";
    audioFallbackRef.current = audio;

    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);

    // Check if previously greeted
    const alreadyGreeted = audioEngine.hasSpokenThisSession(SESSION_STORAGE_KEY);
    if (alreadyGreeted) {
      setHasPlayed(true);
    }

    // Listen for user scroll or interaction on home page to auto-speak
    const handleScrollOrInteract = () => {
      if (hasTriggeredRef.current) return;
      
      // Check if user has started scrolling or gesturing
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 10 || true) {
        if (!audioEngine.hasSpokenThisSession(SESSION_STORAGE_KEY)) {
          triggerWelcomeVoice(false);
        }
        removeScrollListeners();
      }
    };

    const addScrollListeners = () => {
      const options: AddEventListenerOptions = { capture: true, passive: true };
      window.addEventListener("scroll", handleScrollOrInteract, options);
      window.addEventListener("wheel", handleScrollOrInteract, options);
      window.addEventListener("touchmove", handleScrollOrInteract, options);
      document.addEventListener("pointerdown", handleScrollOrInteract, options);
    };

    const removeScrollListeners = () => {
      window.removeEventListener("scroll", handleScrollOrInteract);
      window.removeEventListener("wheel", handleScrollOrInteract);
      window.removeEventListener("touchmove", handleScrollOrInteract);
      document.removeEventListener("pointerdown", handleScrollOrInteract);
    };

    if (!alreadyGreeted) {
      addScrollListeners();
    }

    return () => {
      removeScrollListeners();
      stopAll();
    };
  }, [triggerWelcomeVoice, stopAll]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopAll();
    } else {
      triggerWelcomeVoice(true);
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
            ? "bg-[#140C08]/96 border-[#DFAB5F]/90 shadow-[0_15px_40px_rgba(0,0,0,0.95),0_0_28px_rgba(223,171,95,0.45)]"
            : "bg-[#120B08]/92 border-[#C69247]/40 hover:border-[#DFAB5F]/70 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(198,146,71,0.15)]"
        }`}
      >
        {/* Interactive Gold Speaker Icon Button */}
        <button
          onClick={handleTogglePlay}
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#DFAB5F] via-[#F3CE85] to-[#C69247] text-[#0D0806] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          title={isPlaying ? "Mute Welcome Greeting" : "Play Chai Da Adda Voice"}
          aria-label={isPlaying ? "Mute Welcome Greeting" : "Play Chai Da Adda Voice"}
        >
          {isPlaying ? (
            <VolumeX className="w-4 h-4 stroke-[2.5]" />
          ) : hasPlayed ? (
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Volume2 className="w-4 h-4 stroke-[2.5] animate-pulse" />
          )}
        </button>

        {/* Text Details & Real-time Equalizer Soundwaves */}
        <div onClick={handleTogglePlay} className="flex flex-col cursor-pointer pr-1">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors leading-tight">
              {isPlaying ? "“Welcome to Chai Da Adda!”" : "Chai Da Adda Voice"}
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
            {isPlaying ? "Speaking Live • Tap to Mute" : hasPlayed ? "Tap to Replay Voice" : "Scroll to Listen"}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
