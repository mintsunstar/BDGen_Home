'use client';

import { useEffect } from 'react';

const OFFSET = 80;

export function useAnchorScroll() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      const top = el.getBoundingClientRect().top + (window.scrollY ?? window.pageYOffset) - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
