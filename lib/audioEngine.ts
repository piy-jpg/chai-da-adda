/**
 * Chai Da Adda - Audio Engine & Text-To-Speech (TTS) Utility
 * Generates and plays synthesized speech using SpeechSynthesisUtterance alongside
 * session-based deduplication, natural voice selection, and asynchronous voice loading.
 */

export interface TTSOptions {
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
  onBoundary?: (charIndex: number) => void;
}

class AudioEngine {
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoices();
    }
  }

  public initVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return resolve([]);
      }

      const load = () => {
        const available = window.speechSynthesis.getVoices();
        if (available.length > 0) {
          this.voices = available;
          this.isInitialized = true;
          resolve(available);
        }
      };

      load();

      // Safari and WebKit/Chrome load system voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          load();
        };
      }

      // Fallback timeout
      setTimeout(() => {
        if (!this.isInitialized) {
          load();
        }
      }, 300);
    });
  }

  /**
   * Filters available system voices via window.speechSynthesis.getVoices()
   * to prefer natural, high-fidelity human voices (Natural, Google, Samantha, Karen, Serena, etc.)
   */
  public getBestVoice(preferredLang: string = "en-IN"): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return null;
    }

    const voices = this.voices.length > 0 ? this.voices : window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Prefer Indian English natural/Google voices if available for authentic cafe feel
    const indianNatural = voices.find(
      (v) =>
        (v.lang.toLowerCase().includes("en-in") || v.lang.toLowerCase().includes("hi-in")) &&
        (v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("google") ||
          v.name.toLowerCase().includes("veena") ||
          v.name.toLowerCase().includes("rishi") ||
          v.name.toLowerCase().includes("neerja") ||
          v.name.toLowerCase().includes("priya"))
    );
    if (indianNatural) return indianNatural;

    // 2. High quality natural English voices
    const preferredNames = [
      "natural",
      "neural",
      "google uk english female",
      "google us english",
      "google english",
      "samantha",
      "karen",
      "serena",
      "victoria",
      "daniel",
      "fiona",
      "moira",
      "allison",
    ];

    for (const nameKey of preferredNames) {
      const match = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("en") &&
          v.name.toLowerCase().includes(nameKey)
      );
      if (match) return match;
    }

    // 3. Any English voice
    const anyEnglish = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (anyEnglish) return anyEnglish;

    // 4. Default system voice
    return voices.find((v) => v.default) || voices[0] || null;
  }

  /**
   * Generates and plays synthesized speech using SpeechSynthesisUtterance
   */
  public speak(options: TTSOptions): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (options.onError) options.onError("SpeechSynthesis not supported");
      return false;
    }

    try {
      // Cancel previous speech if active
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(options.text);
      utterance.rate = options.rate ?? 0.95; // Warm, measured natural cadence
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? 1.0;

      const voice = this.getBestVoice(options.lang || "en-IN");
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else if (options.lang) {
        utterance.lang = options.lang;
      }

      utterance.onstart = () => {
        if (options.onStart) options.onStart();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (options.onError) options.onError(e);
      };

      utterance.onboundary = (e) => {
        if (options.onBoundary) options.onBoundary(e.charIndex);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);

      // WebKit long utterance keep-alive fix
      const interval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(interval);
        } else {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);

      return true;
    } catch (err) {
      if (options.onError) options.onError(err);
      return false;
    }
  }

  public stop(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    return window.speechSynthesis.speaking;
  }

  public hasSpokenThisSession(key = "chai_greeted_home"): boolean {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(key) === "true";
    } catch {
      return false;
    }
  }

  public markSpokenThisSession(key = "chai_greeted_home"): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, "true");
    } catch {
      // ignore
    }
  }
}

export const audioEngine = new AudioEngine();
