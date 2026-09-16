// Web Audio API ambient chai stall synth for crackling flame & soft simmering tea sound

class ChaiAmbiencePlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;

  public init() {
    if (typeof window === "undefined") return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx && AudioCtxClass) {
      this.ctx = new AudioCtxClass();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 1.5);
      this.masterGain.connect(this.ctx.destination);

      // 1. Simmering Pink Noise (water bubbling / tea boiling texture)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Filter noise to sound like gentle bubbling steam
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      this.noiseNode.connect(filter);
      filter.connect(this.masterGain);
      this.noiseNode.start();

      // 2. Warm harmonic drone (like ancient Indian tanpura / brass resonance)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(108, this.ctx.currentTime); // Sacred 108Hz harmonic

      const droneGain1 = this.ctx.createGain();
      droneGain1.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.droneOsc1.connect(droneGain1);
      droneGain1.connect(this.masterGain);
      this.droneOsc1.start();

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = "sine";
      this.droneOsc2.frequency.setValueAtTime(162, this.ctx.currentTime); // Perfect fifth (Sa-Pa)

      const droneGain2 = this.ctx.createGain();
      droneGain2.gain.setValueAtTime(0.025, this.ctx.currentTime);
      this.droneOsc2.connect(droneGain2);
      droneGain2.connect(this.masterGain);
      this.droneOsc2.start();

      this.isPlaying = true;
    } catch {
      // Audio playback blocked or not supported
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
        } catch {
          // ignore
        }
        this.isPlaying = false;
      }, 850);
    } catch {
      this.isPlaying = false;
    }
  }
}

export const chaiAmbience = new ChaiAmbiencePlayer();
