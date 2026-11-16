import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const ParticleCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate nodes
    const particleCount = Math.min(65, Math.floor((width * height) / 14000));
    const particles: Particle[] = [];
    const colors = ['#38bdf8', '#818cf8', '#c084fc', '#2dd4bf'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      if (!isRunningRef.current) return;

      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      for (const p of particles) {
        // Subtle mouse pull
        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160 && mdist > 5) {
            p.x += (mdx / mdist) * 0.4;
            p.y += (mdy / mdist) * 0.4;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        render();
      }
    };

    const stopAnimation = () => {
      isRunningRef.current = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };

    // Compliance with modern-web-guidance: efficient background processing
    const hasContentVisibility = 'contentVisibility' in document.documentElement.style;
    const contentVisibilityHandler = (event: Event) => {
      const cvEvent = event as unknown as { skipped: boolean };
      if (cvEvent.skipped) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    if (hasContentVisibility) {
      container.addEventListener('contentvisibilityautostatechange', contentVisibilityHandler);
    }

    // Fallback IntersectionObserver for cross-browser power saving
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { rootMargin: '100px' }
    );
    observer.observe(container);

    // Initial start
    startAnimation();

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (hasContentVisibility) {
        container.removeEventListener('contentvisibilityautostatechange', contentVisibilityHandler);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto none auto 600px',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
};
