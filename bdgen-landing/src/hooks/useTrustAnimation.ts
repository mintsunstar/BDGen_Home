'use client';

import { useEffect } from 'react';

export function useTrustAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateNumber(el: Element) {
      const target = parseInt(el.getAttribute('data-count') ?? '', 10);
      const suffix = el.getAttribute('data-suffix') ?? '';
      if (isNaN(target)) return;
      const duration = parseInt(el.getAttribute('data-duration') ?? '1600', 10) || 1600;
      const scramblePhase = 200;

      if (reducedMotion) {
        (el as HTMLElement).textContent = `${target}${suffix}`;
        return;
      }

      let start: number | null = null;
      function tick(now: number) {
        if (!start) start = now;
        const elapsed = now - start;

        if (elapsed < scramblePhase) {
          (el as HTMLElement).textContent = `${Math.floor(Math.random() * (target + 1))}${suffix}`;
          requestAnimationFrame(tick);
          return;
        }

        const countElapsed = elapsed - scramblePhase;
        const countDuration = duration - scramblePhase;
        const progress = Math.min(countElapsed / countDuration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = Math.round(eased * target);
        (el as HTMLElement).textContent = `${progress >= 1 ? target : current}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const items = entry.target.querySelectorAll('.trust-item');
          const staggerMs = 100;
          items.forEach((item, i) => {
            const numEl = item.querySelector('.trust-num[data-trust-type="number"]');
            const textEl = item.querySelector('.trust-num[data-trust-type="text"]');
            const delay = i * staggerMs;
            if (numEl) {
              setTimeout(() => {
                item.classList.add('trust-visible');
                animateNumber(numEl);
              }, delay);
            } else if (textEl) {
              setTimeout(() => item.classList.add('trust-visible'), delay);
            }
          });
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);
}
