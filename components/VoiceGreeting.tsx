"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function VoiceGreeting() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    const audio = new Audio("/audio/welcome-voice.mp3");
    audio.preload = "auto";
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => {
      setIsPlaying(false);
      setTimeout(() => setShowToast(false), 3000);
    };
    audio.onpause = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);

    // Attempt automatic playback on initial open
    const tryAutoplay = () => {
      audio
        .play()
        .then(() => {
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy: listen for first user interaction
          const playOnFirstTouch = () => {
            audio
              .play()
              .then(() => {
                setHasInteracted(true);
              })
              .catch(() => {});
            cleanupListeners();
          };

          const cleanupListeners = () => {
            window.removeEventListener("click", playOnFirstTouch);
            window.removeEventListener("touchstart", playOnFirstTouch);
            window.removeEventListener("scroll", playOnFirstTouch);
          };

          window.addEventListener("click", playOnFirstTouch, { once: true });
          window.addEventListener("touchstart", playOnFirstTouch, { once: true });
          window.addEventListener("scroll", playOnFirstTouch, { once: true });
        });
    };

    // Small delay for smooth entrance
    const timer = setTimeout(tryAutoplay, 800);

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none pointer-events-auto">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#120B08]/92 backdrop-blur-xl border border-[#DFAB5F]/40 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(223,171,95,0.15)] group"
          >
            {/* Play/Replay Button */}
            <button
              onClick={togglePlay}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#DFAB5F] to-[#C69247] text-[#0D0806] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
              title={isPlaying ? "Mute Greeting" : "Play Voice Greeting"}
              aria-label="Play Voice Greeting"
            >
              {isPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Speaking Soundwaves or Label */}
            <div onClick={togglePlay} className="flex flex-col cursor-pointer pr-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-serif font-bold text-[#FBF6EE] group-hover:text-[#DFAB5F] transition-colors">
                  {isPlaying ? "“Hey, chai lovers!”" : "Chai Da Adda Voice"}
                </span>

                {isPlaying && (
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-0.5 h-3 bg-[#DFAB5F] rounded-full animate-bounce" style={{ animationDuration: "0.6s" }} />
                    <span className="w-0.5 h-4 bg-[#DFAB5F] rounded-full animate-bounce" style={{ animationDuration: "0.4s", animationDelay: "0.15s" }} />
                    <span className="w-0.5 h-2 bg-[#DFAB5F] rounded-full animate-bounce" style={{ animationDuration: "0.5s", animationDelay: "0.3s" }} />
                  </div>
                )}
              </div>
              <span className="text-[8.5px] sm:text-[9px] font-mono text-[#DFAB5F]/80 uppercase tracking-wider">
                {isPlaying ? "Playing Voice Note • Tap to Stop" : "Tap to Listen Voice Note"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
