"use client";

import React, { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  baseSize: number;
  type: "steam" | "ember" | "saffron" | "cardamom" | "leaf";
  color: string;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  rot: number;
  rotSpeed: number;
}

export function Story3DCanvas() {
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
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // 3D Camera & Perspective Parameters
    const fov = 350;
    const particles: Particle3D[] = [];
    const maxParticles = 80;

    const spiceTypes: Array<{
      type: Particle3D["type"];
      color: string;
      sizeRange: [number, number];
      alpha: number;
    }> = [
      { type: "steam", color: "245, 230, 210", sizeRange: [20, 50], alpha: 0.16 },
      { type: "ember", color: "255, 170, 50", sizeRange: [2, 4.5], alpha: 0.75 },
      { type: "saffron", color: "230, 110, 30", sizeRange: [6, 12], alpha: 0.7 },
      { type: "cardamom", color: "140, 160, 90", sizeRange: [5, 10], alpha: 0.65 },
      { type: "leaf", color: "180, 120, 60", sizeRange: [4, 8], alpha: 0.6 },
    ];

    const createParticle = (customZ?: number): Particle3D => {
      const spice = spiceTypes[Math.floor(Math.random() * spiceTypes.length)];
      const z = customZ !== undefined ? customZ : Math.random() * 400 - 100;
      const baseSize = spice.sizeRange[0] + Math.random() * (spice.sizeRange[1] - spice.sizeRange[0]);
      
      const spreadX = (Math.random() - 0.5) * (width * 0.75);
      const startX = spreadX;
      const startY = height * 0.5 + Math.random() * (height * 0.45);

      return {
        x: startX,
        y: startY,
        z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: spice.type === "steam" ? -(0.35 + Math.random() * 0.65) : -(0.25 + Math.random() * 0.45),
        vz: (Math.random() - 0.5) * 0.35,
        size: baseSize,
        baseSize,
        type: spice.type,
        color: spice.color,
        alpha: 0,
        maxAlpha: spice.alpha * (0.6 + Math.random() * 0.4),
        life: 0,
        maxLife: 220 + Math.random() * 260,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
      };
    };

    // Seed initial particles with distributed lifetimes
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle(Math.random() * 500 - 150);
      p.life = Math.random() * p.maxLife;
      p.y -= Math.random() * (height * 0.8);
      particles.push(p);
    }

    let frame = 0;

    const render = () => {
      frame++;
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Center of projection
      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle dynamic ambient glow around cursor
      if (mouseRef.current.isHovered) {
        const glowRadius = 200;
        const radGrad = ctx.createRadialGradient(
          cx + mouseRef.current.x,
          cy + mouseRef.current.y,
          0,
          cx + mouseRef.current.x,
          cy + mouseRef.current.y,
          glowRadius
        );
        radGrad.addColorStop(0, "rgba(223, 171, 95, 0.08)");
        radGrad.addColorStop(0.5, "rgba(168, 73, 36, 0.035)");
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Sort particles by Z for correct 3D depth rendering (back to front)
      particles.sort((a, b) => b.z - a.z);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Life cycle alpha fade in & out
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else if (progress > 0.7) {
          p.alpha = (1 - (progress - 0.7) / 0.3) * p.maxAlpha;
        } else {
          p.alpha = p.maxAlpha;
        }

        // 3D physics movement
        p.x += p.vx + Math.sin(frame * 0.015 + p.z * 0.02) * 0.3;
        p.y += p.vy;
        p.z += p.vz;
        p.rot += p.rotSpeed;

        // Interactive mouse 3D repulsion
        if (mouseRef.current.isHovered) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 1) {
            const force = (1 - dist / 150) * 0.7;
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.8;
            p.rotSpeed += (Math.random() - 0.5) * 0.02;
          }
        }

        // 3D perspective projection
        const scale = fov / (fov + p.z);
        if (scale <= 0) continue;

        const projX = cx + p.x * scale;
        const projY = cy + p.y * scale;
        const projSize = Math.max(0.5, p.baseSize * scale);

        // Respawn particle if expired or out of bounds
        if (p.life >= p.maxLife || projY < -50 || projX < -100 || projX > width + 100 || p.z < -250 || p.z > 500) {
          particles[i] = createParticle();
          continue;
        }

        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(p.rot);

        if (p.type === "steam") {
          // Soft billowing aromatic steam cloud
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, projSize);
          grad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.75})`);
          grad.addColorStop(0.5, `rgba(${p.color}, ${p.alpha * 0.3})`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, projSize, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "ember") {
          // Glowing heat ember with halo
          const emberGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, projSize * 2.2);
          emberGrad.addColorStop(0, `rgba(255, 230, 180, ${p.alpha})`);
          emberGrad.addColorStop(0.35, `rgba(${p.color}, ${p.alpha * 0.75})`);
          emberGrad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = emberGrad;
          ctx.beginPath();
          ctx.arc(0, 0, projSize * 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "saffron") {
          // Saffron filament thread
          ctx.strokeStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.lineWidth = Math.max(1, 1.6 * scale);
          ctx.beginPath();
          ctx.moveTo(-projSize, -projSize * 0.3);
          ctx.quadraticCurveTo(0, projSize * 0.4, projSize, -projSize * 0.2);
          ctx.stroke();
        } else if (p.type === "cardamom") {
          // Cardamom pod shape
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, projSize * 0.7, projSize * 1.2, p.rot, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(80, 100, 50, ${p.alpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Tea leaf flake
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, projSize, projSize * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
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
