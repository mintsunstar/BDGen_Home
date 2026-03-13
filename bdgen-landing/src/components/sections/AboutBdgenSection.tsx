'use client';

import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

const CURSOR_RADIUS = 150;
const NODE_COUNT = 80;
const NODE_FLOAT = 0.3;

type Node = { x: number; y: number; vx: number; vy: number; baseX: number; baseY: number };

function useNodeNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1e4, y: -1e4 });
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * NODE_FLOAT,
        vy: (Math.random() - 0.5) * NODE_FLOAT,
        baseX: 0,
        baseY: 0,
      });
    }
    return nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let nodes = initNodes(w, h);
    nodes.forEach((n, i) => {
      n.baseX = n.x;
      n.baseY = n.y;
    });
    nodesRef.current = nodes;

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      nodes = initNodes(w, h);
      nodesRef.current = nodes;
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const nodes = nodesRef.current;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      });

      const inRadius: Node[] = [];
      nodes.forEach((n) => {
        const dx = n.x - mx;
        const dy = n.y - my;
        if (dx * dx + dy * dy <= CURSOR_RADIUS * CURSOR_RADIUS) inRadius.push(n);
      });

      ctx.strokeStyle = 'rgba(0, 200, 255, 0.35)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < inRadius.length; i++) {
        for (let j = i + 1; j < inRadius.length; j++) {
          ctx.beginPath();
          ctx.moveTo(inRadius[i].x, inRadius[i].y);
          ctx.lineTo(inRadius[j].x, inRadius[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(0, 200, 255, 0.6)';
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouse);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initNodes]);

  return canvasRef;
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { type: 'spring' as const, stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), spring);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    x.set(dx);
    y.set(dy);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

const copy = {
  label: 'ABOUT BDGEN',
  line1: 'Web3 기술로',
  line2: '산업의 신뢰 인프라',
  line2Suffix: '를',
  line3: '설계합니다.',
  body: '(주)비디젠(BDGen)은 2019년 설립 이후 블록체인 응용 서비스 상용화에 집중해온 전문 기업입니다. DID·NFT·Passkey 등 Web3 핵심 기술을 실제 산업에 구현하며 신뢰할 수 있는 디지털 환경을 만들어 나가고 있습니다.',
};

export function AboutBdgenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { amount: 0.25, once: true });
  const canvasRef = useNodeNetworkCanvas();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 80, 0]);
  const midY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 40, 0]);
  const fgY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);

  const [particlesInit, setParticlesInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      setParticlesInit(true);
    });
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fullScreen: false,
      particles: {
        number: { value: 40 },
        color: { value: ['#00C8FF', '#6C3FFF'] },
        move: {
          enable: true,
          speed: 0.4,
          direction: 'none' as const,
          random: true,
          outModes: { default: 'out' as const },
        },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 0.5, max: 1.5 } },
      },
      interactivity: {
        detect_on: 'canvas' as const,
        events: { onHover: { enable: false } },
      },
    }),
    []
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[95vh] flex items-center overflow-hidden bg-deep"
      aria-labelledby="about-bdgen-title"
    >
      {/* Background: node network canvas (connect within 150px of cursor) */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,20,48,0.6) 0%, #050B18 70%)' }}
        />
      </motion.div>

      {/* Middle: tsparticles */}
      {particlesInit && (
        <motion.div className="absolute inset-0 z-[1]" style={{ y: midY }}>
          <Particles
            id="about-particles"
            options={particlesOptions}
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(5,11,24,0.4) 0%, transparent 40%, transparent 60%, rgba(5,11,24,0.5) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32"
        style={{ y: fgY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div ref={textRef} className="order-2 lg:order-1">
            <motion.p
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#00C8FF] mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="w-6 h-0.5 rounded bg-gradient-to-r from-[#00C8FF] to-[#6C3FFF]" />
              {copy.label}
            </motion.p>
            <h2 id="about-bdgen-title" className="text-[#fff] font-extrabold leading-tight tracking-tight mb-6">
              <motion.span
                className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-[#00C8FF] to-[#6C3FFF] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {copy.line1}
              </motion.span>
              <motion.span
                className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
                initial={{ opacity: 0, y: 40 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-white">{copy.line2}</span>
                <span className="text-white/90">{copy.line2Suffix}</span>
              </motion.span>
              <motion.span
                className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {copy.line3}
              </motion.span>
            </h2>
            <motion.p
              className="text-base sm:text-lg text-[#8FA3C0] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 32 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {copy.body}
            </motion.p>
          </div>

          {/* Right: Visual with tilt */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={isTextInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TiltCard className="relative w-full max-w-[340px] lg:max-w-[374px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="aspect-[374/452] relative">
                {/* 이미지 경로: public/assets/web3-visual.png 에 배치 */}
                <img
                  src="/assets/web3-visual.png"
                  alt="블록체인·Web3 기술"
                  className="absolute inset-0 w-full h-full object-cover"
                  width={374}
                  height={452}
                />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
