"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  trail: { x: number; y: number }[];
  maxTrailLength: number;
  directionTimer: number;
  directionInterval: number;
}

export default function GridParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPausedRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });

  const createParticle = useCallback(
    (width: number, height: number): Particle => {
      const speed = 0.15 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: 3 + Math.random() * 3,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 0.15 + Math.random() * 0.25,
        trail: [],
        maxTrailLength: 12 + Math.floor(Math.random() * 14),
        directionTimer: 0,
        directionInterval: 180 + Math.floor(Math.random() * 300),
      };
    },
    []
  );

  // Build offscreen grid canvas (drawn once, reused every frame)
  const buildGridCanvas = useCallback((w: number, h: number, dpr: number) => {
    const offscreen = document.createElement("canvas");
    offscreen.width = w * dpr;
    offscreen.height = h * dpr;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return null;

    offCtx.scale(dpr, dpr);

    const gridSpacing = 100;
    offCtx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    offCtx.lineWidth = 0.5;

    // Square grid lines
    offCtx.beginPath();
    for (let x = 0; x <= w; x += gridSpacing) {
      offCtx.moveTo(x, 0);
      offCtx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += gridSpacing) {
      offCtx.moveTo(0, y);
      offCtx.lineTo(w, y);
    }
    offCtx.stroke();

    // Radial fade mask — grid fades toward edges
    const gradient = offCtx.createRadialGradient(
      w / 2, h * 0.4, w * 0.15,
      w / 2, h * 0.4, w * 0.75
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    offCtx.globalCompositeOperation = "destination-out";
    offCtx.fillStyle = gradient;
    offCtx.fillRect(0, 0, w, h);
    offCtx.globalCompositeOperation = "source-over";

    return offscreen;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { w, h };

      // Rebuild grid cache
      gridCanvasRef.current = buildGridCanvas(w, h, dpr);

      // Calculate particle count based on screen size
      const area = w * h;
      const count = Math.floor(area / 80000);
      const clampedCount = Math.max(2, Math.min(count, 6));

      // Reset particles
      particlesRef.current = Array.from({ length: clampedCount }, () =>
        createParticle(w, h)
      );
    };

    // Throttled mousemove (update at most every 16ms ≈ 60fps)
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = e.timeStamp;
      if (now - lastMouseUpdate < 16) return;
      lastMouseUpdate = now;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Pause when tab is hidden
    const handleVisibility = () => {
      isPausedRef.current = document.hidden;
      if (!document.hidden && animationRef.current === 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = () => {
      if (isPausedRef.current) {
        animationRef.current = 0;
        return;
      }

      const { w, h } = sizeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Blit cached grid (single drawImage instead of hundreds of stroke calls)
      if (gridCanvasRef.current) {
        ctx.drawImage(gridCanvasRef.current, 0, 0, w, h);
      }

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update direction timer
        p.directionTimer++;
        if (p.directionTimer >= p.directionInterval) {
          p.directionTimer = 0;
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.15 + Math.random() * 0.35;
          p.speedX = Math.cos(angle) * speed;
          p.speedY = Math.sin(angle) * speed;
          p.directionInterval = 180 + Math.floor(Math.random() * 300);
        }

        // Subtle mouse repulsion (avoid sqrt when possible)
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400 && distSq > 0) {
          // 120^2 = 14400
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.speedX += (dx / dist) * force * 0.02;
          p.speedY += (dy / dist) * force * 0.02;
        }

        // Clamp speed
        const speedSq = p.speedX * p.speedX + p.speedY * p.speedY;
        if (speedSq > 0.64) {
          // 0.8^2 = 0.64
          const currentSpeed = Math.sqrt(speedSq);
          p.speedX = (p.speedX / currentSpeed) * 0.8;
          p.speedY = (p.speedY / currentSpeed) * 0.8;
        }

        // Store trail position (reuse object pool via circular buffer)
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrailLength) {
          p.trail.shift();
        }

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        // Draw trail — batch by pre-computing values
        const trailLen = p.trail.length;
        const baseOpacity = p.opacity * 0.5;
        for (let t = 0; t < trailLen; t++) {
          const trail = p.trail[t];
          const trailProgress = t / trailLen;
          const trailSize = p.size * (0.3 + trailProgress * 0.7);
          const halfSize = trailSize * 0.5;

          ctx.globalAlpha = baseOpacity * trailProgress;
          ctx.fillStyle = "#fff";
          ctx.fillRect(trail.x - halfSize, trail.y - halfSize, trailSize, trailSize);
        }

        // Draw particle (small square)
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
      }

      // Reset globalAlpha
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [createParticle, buildGridCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}