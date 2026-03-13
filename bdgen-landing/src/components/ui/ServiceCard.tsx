'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import type { Service } from '@/types/landing';

const NEON_GLOW = '0 0 40px rgba(0,200,255,0.35), 0 0 80px rgba(0,200,255,0.15)';
const NEON_GLOW_HOVER = '0 0 50px rgba(0,200,255,0.5), 0 0 100px rgba(0,200,255,0.2)';

interface ServiceCardProps {
  service: Service;
  cardIndex: 1 | 2 | 3;
  revealDelay?: string;
}

export function ServiceCard({ service, cardIndex, revealDelay = '' }: ServiceCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={800}
      glareEnable
      glareMaxOpacity={0.12}
      glareColor="#00C8FF"
      glarePosition="all"
      glareBorderRadius="1rem"
      scale={1}
      className={`reveal ${revealDelay}`.trim()}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="relative h-[560px] max-md:h-[320px] rounded-2xl overflow-hidden cursor-default"
        style={{ boxShadow: hover ? NEON_GLOW_HOVER : NEON_GLOW }}
        initial={false}
        animate={{
          y: hover ? -12 : 0,
          transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        {/* Card image layer */}
        <div className="absolute inset-0">
          {service.image && (
            <img
              src={service.image}
              alt={service.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                cardIndex === 2 && hover ? 'blur-[3px] scale-105' : ''
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,30,60,0.92)] via-[rgba(10,30,60,0.5)] to-transparent" />
        </div>

        {/* Card 1: Circuit lines + light pulse overlay */}
        {cardIndex === 1 && (
          <Card1Overlay hover={hover} />
        )}

        {/* Card 2: Floating UI cards (separate on hover) */}
        {cardIndex === 2 && (
          <Card2Overlay hover={hover} />
        )}

        {/* Card 3: Data stream + glitch overlay */}
        {cardIndex === 3 && (
          <Card3Overlay hover={hover} />
        )}

        {/* Body: title, subtitle, tags */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pt-20 flex flex-col">
          <h3 className="text-white font-extrabold text-[32px] leading-tight mb-1 flex items-start justify-between gap-3">
            <span className="leading-[1.2]" style={{ whiteSpace: 'pre-line' }}>
              {service.title}
            </span>
            <span className="flex-shrink-0 w-8 h-8 text-[#00C8FF]" aria-hidden>
              <ServiceIcon index={cardIndex} />
            </span>
          </h3>
          {service.subtitle && (
            <p className="text-white/95 text-sm font-semibold mb-4 tracking-tight">
              {service.subtitle}
            </p>
          )}

          {cardIndex === 1 && (
            <Card1Tags tags={service.tags} hover={hover} />
          )}
          {cardIndex === 2 && (
            <Card2Tags tags={service.tags} />
          )}
          {cardIndex === 3 && (
            <Card3Tags tags={service.tags} hover={hover} />
          )}
        </div>
      </motion.div>
    </Tilt>
  );
}

function ServiceIcon({ index }: { index: number }) {
  if (index === 1)
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <path pathLength="1" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );
  if (index === 2)
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <path pathLength="1" d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path pathLength="1" d="M12 18h.01" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path pathLength="1" d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
  );
}

/* ----- Card 1: Circuit + light pulse + hexagon particles on tags ----- */
function Card1Overlay({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
        <defs>
          <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,200,255,0)" />
            <stop offset="50%" stopColor="rgba(0,200,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,200,255,0)" />
          </linearGradient>
        </defs>
        {/* Circuit-style lines */}
        <path d="M 0 120 Q 80 100 160 120 T 320 120 T 480 120" stroke="rgba(0,200,255,0.25)" strokeWidth="1" fill="none" />
        <path d="M 40 200 L 200 200 L 280 280 L 400 200 L 520 200" stroke="rgba(0,200,255,0.2)" strokeWidth="1" fill="none" />
        <path d="M 80 320 L 240 320 L 320 400 L 440 320" stroke="rgba(0,200,255,0.2)" strokeWidth="1" fill="none" />
        <path d="M 0 80 L 120 80 L 120 160 L 240 80 L 360 160 L 480 80 L 600 80" stroke="rgba(0,200,255,0.15)" strokeWidth="0.8" fill="none" />
        {/* Light pulse (animated dash along path) */}
        {hover && (
          <path d="M 0 120 Q 80 100 160 120 T 320 120 T 480 120" stroke="url(#pulse-gradient)" strokeWidth="2" fill="none" strokeDasharray="8 200" className="service-card-pulse" />
        )}
      </svg>
    </div>
  );
}

function Card1Tags({ tags, hover }: { tags: string[]; hover: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2 relative">
      {hover && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={`hex-${i}`}
              className="absolute w-2 h-2 text-[#00C8FF] opacity-70"
              style={{
                left: `${15 + (i * 12) % 70}%`,
                top: `${-5 + (i % 3) * 8}px`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7, rotate: i * 60 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <Hexagon />
            </motion.span>
          ))}
        </>
      )}
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,200,255,0.3)] bg-[rgba(10,30,60,0.75)] text-white/90"
          initial={false}
          animate={{
            y: hover ? -2 - (i % 3) * 1.5 : 0,
            transition: { duration: 0.3, delay: i * 0.04 },
          }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

function Hexagon() {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full text-[#00C8FF]" fill="currentColor" opacity={0.7}>
      <path d="M12 2L22 8.5v7L12 22L2 15.5v-7L12 2z" />
    </svg>
  );
}

/* ----- Card 2: Floating UI cards + blur ----- */
function Card2Overlay({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="relative w-[55%] h-[50%] max-w-[180px]">
        {[
          { x: 0, y: 0, delay: 0, w: '80%', h: '36%' },
          { x: 20, y: -8, delay: 0.06, w: '70%', h: '32%' },
          { x: -10, y: 12, delay: 0.12, w: '65%', h: '30%' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg bg-[rgba(0,200,255,0.15)] border border-[rgba(0,200,255,0.4)] shadow-lg"
            style={{
              left: '50%',
              top: '50%',
              width: item.w,
              height: item.h,
              marginLeft: '-40%',
              marginTop: '-18%',
              transformOrigin: 'center center',
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
            animate={
              hover
                ? {
                    x: item.x * 4,
                    y: item.y * 4 - 24,
                    scale: 1.05,
                    opacity: 1,
                    transition: { duration: 0.35, delay: item.delay, ease: [0.25, 0.46, 0.45, 0.94] },
                  }
                : { x: 0, y: 0, scale: 1, opacity: 0.9 }
            }
          />
        ))}
      </div>
    </div>
  );
}

function Card2Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,200,255,0.3)] bg-[rgba(10,30,60,0.75)] text-white/90"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* ----- Card 3: Glitch/loading + data stream + tag check ----- */
function Card3Overlay({ hover }: { hover: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Data stream lines (bottom to top) */}
      <div className={`absolute inset-0 overflow-hidden ${hover ? 'opacity-80' : 'opacity-0'} transition-opacity duration-500`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#00C8FF] to-transparent rounded-full"
            style={{
              left: `${12 + i * 18}%`,
              width: '14%',
              bottom: 0,
            }}
            animate={
              hover
                ? { y: [0, -620], transition: { duration: 2 + i * 0.15, repeat: Infinity, ease: 'linear' } }
                : { y: 0 }
            }
          />
        ))}
      </div>
      {/* Glitch / loading overlay (dashboard area) */}
      {hover && (
        <motion.div
          className="absolute inset-x-[15%] top-[25%] bottom-[35%] rounded-lg border border-[rgba(0,200,255,0.3)] bg-[rgba(10,30,60,0.5)] flex items-center justify-center overflow-hidden"
          animate={{
            opacity: [1, 0.85, 1, 0.9, 1],
            boxShadow: ['0 0 0 0 rgba(0,200,255,0)', '0 0 20px 2px rgba(0,200,255,0.2)', '0 0 0 0 rgba(0,200,255,0)', '0 0 15px 1px rgba(0,200,255,0.15)', '0 0 0 0 rgba(0,200,255,0)'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-[#00C8FF] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
          <span className="sr-only">Loading</span>
        </motion.div>
      )}
    </div>
  );
}

function Card3Tags({ tags, hover }: { tags: string[]; hover: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <motion.span
          key={tag}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,200,255,0.3)] bg-[rgba(10,30,60,0.75)] text-white/90"
          initial={false}
          animate={{ transition: { duration: 0.3 } }}
        >
          {hover ? (
            <CheckIcon />
          ) : (
            <LoadingIcon />
          )}
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

function LoadingIcon() {
  return (
    <motion.span
      className="w-3.5 h-3.5 rounded-full border border-[#00C8FF] border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    />
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#00C8FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
