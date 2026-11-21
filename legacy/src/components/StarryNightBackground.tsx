import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number; // 1: distant, 2: mid, 3: foreground
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface GentleShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
  width: number;
}

export const StarryNightBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let stars: Star[] = [];
    let shootingStars: GentleShootingStar[] = [];
    let lastShootingStarTime = performance.now();

    const starPalette = [
      '#FFFFFF',
      '#F0F9FF',
      '#E0F2FE',
      '#BAE6FD',
      '#7DD3FC',
      '#38BDF8',
      '#93C5FD'
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initStars();
    };

    const initStars = () => {
      const isMobile = width < 768;
      const count = isMobile ? 160 : 280;
      stars = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const z = rand < 0.6 ? 1 : rand < 0.88 ? 2 : 3;
        const radius = z === 1 ? 0.5 + Math.random() * 0.5 : z === 2 ? 0.9 + Math.random() * 0.6 : 1.5 + Math.random() * 0.8;
        const baseAlpha = z === 1 ? 0.25 + Math.random() * 0.3 : z === 2 ? 0.45 + Math.random() * 0.35 : 0.7 + Math.random() * 0.25;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: 0.01 + Math.random() * 0.025,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starPalette[Math.floor(Math.random() * starPalette.length)]
        });
      }
    };

    const spawnGentleShootingStar = () => {
      // Occasional rare, gentle shooting star traversing the night sky
      const startX = Math.random() * (width * 0.75);
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 180) * (28 + Math.random() * 18); // Graceful ~35 degree drift
      const speed = 7 + Math.random() * 4;
      const length = 70 + Math.random() * 60;
      const maxLife = 50 + Math.random() * 25;

      shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        alpha: 0,
        life: 0,
        maxLife,
        width: 1.2 + Math.random() * 0.8
      });
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw static twinkling celestial stars (no scroll movement)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Soft, peaceful twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.25;
        star.alpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();

        // Subtle soft halo on brighter foreground stars
        if (star.z === 3 && star.alpha > 0.65) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = (star.alpha - 0.65) * 0.2;
          ctx.fill();
        }
      }

      // 2. Rare, graceful ambient shooting star (approx every 6 to 9 seconds)
      if (time - lastShootingStarTime > 6500 + Math.random() * 3000) {
        if (shootingStars.length < 2) {
          spawnGentleShootingStar();
        }
        lastShootingStarTime = time;
      }

      // 3. Render gentle shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        // Smooth fade-in and gentle fade-out
        s.alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        if (s.life >= s.maxLife || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        grad.addColorStop(0.7, 'rgba(147, 197, 253, 0.4)');
        grad.addColorStop(1, '#FFFFFF');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha * 0.8));
        ctx.stroke();

        // Soft white head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha * 0.9));
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020612]" aria-hidden="true">
      {/* Deep cosmic night celestial radial gradient base */}
      <div 
        className="absolute inset-0 bg-radial from-[#0a2046]/60 via-[#030c1d]/85 to-[#01040d]" 
      />

      {/* Atmospheric deep-space nebulae luminous clouds with soft ambient tone */}
      <div className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] rounded-full bg-radial from-[#38BDF8]/10 via-[#2563EB]/5 to-transparent blur-[120px] animate-glow-pulse" />
      <div className="absolute top-[35%] -left-[12%] w-[850px] h-[850px] rounded-full bg-radial from-[#1D4ED8]/12 via-[#071E42]/8 to-transparent blur-[140px]" />
      <div className="absolute top-[65%] right-[3%] w-[750px] h-[750px] rounded-full bg-radial from-[#38BDF8]/8 via-[#1E40AF]/4 to-transparent blur-[130px]" />
      <div className="absolute -bottom-[10%] left-[20%] w-[950px] h-[700px] rounded-full bg-radial from-[#2563EB]/10 via-[#020612]/30 to-transparent blur-[150px]" />

      {/* Cybernetic subtle coordinate grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />

      {/* Serene Starry Night Canvas with gentle twinkling stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
