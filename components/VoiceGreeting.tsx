"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

const AUDIO_SRC = "/audio/welcome-voice.mp3";

export function VoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUnlockedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Play audio safely
  const playAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_SRC);
      audio.preload = "auto";
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
          isUnlockedRef.current = true;
        })
        .catch((err) => {
          console.debug("[VoiceGreeting] Playback waiting for user gesture:", err?.message || err);
          setIsPlaying(false);
        });
    }
  }, []);

  // Stop/Pause audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  // Toggle playback on button/pill click
  const handleTogglePlay = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      if (isPlaying) {
        stopAudio();
      } else {
        playAudio();
      }
    },
    [isPlaying, stopAudio, playAudio]
  );

  useEffect(() => {
    setMounted(true);

    // Create and initialize audio element
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onEnded = () => {
      setIsPlaying(false);
      setHasPlayed(true);
    };
    const onPause = () => setIsPlaying(false);
    const onError = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    // 1. Attempt immediate zero-click playback on visit
    const initialPlayPromise = audio.play();
    if (initialPlayPromise !== undefined) {
      initialPlayPromise
        .then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
          isUnlockedRef.current = true;
        })
        .catch(() => {
          // Autoplay was blocked by the browser policy.
          // Setup user gesture listeners for guaranteed 1st tap/click unlock.
        });
    }

    // 2. Browser-compliant user gesture unlock
    // Note: Chrome/Safari ONLY count pointerdown, touchstart, click, and keydown as user gestures.
    // Pure wheel/scroll events are not considered transient activation by browser security.
    const handleUserGesture = () => {
      if (isUnlockedRef.current) return;

      audio.currentTime = 0;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            isUnlockedRef.current = true;
            setIsPlaying(true);
            setHasPlayed(true);
            cleanupGestureListeners();
          })
          .catch(() => {
            // Keep listeners alive if still locked
          });
      }
    };

    const options: AddEventListenerOptions = { capture: true, passive: true };

    const cleanupGestureListeners = () => {
      document.removeEventListener("pointerdown", handleUserGesture, true);
      document.removeEventListener("touchstart", handleUserGesture, true);
      document.removeEventListener("click", handleUserGesture, true);
      window.removeEventListener("keydown", handleUserGesture, true);
    };

    document.addEventListener("pointerdown", handleUserGesture, options);
    document.addEventListener("touchstart", handleUserGesture, options);
    document.addEventListener("click", handleUserGesture, options);
    window.addEventListener("keydown", handleUserGesture, options);

    return () => {
      cleanupGestureListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.pause();
    };
  }, []);

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
            {isPlaying ? "Playing Live • Tap to Mute" : hasPlayed ? "Tap to Replay Voice" : "Tap Anywhere to Hear Voice"}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
