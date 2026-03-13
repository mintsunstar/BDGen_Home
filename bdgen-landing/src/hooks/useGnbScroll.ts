'use client';

import { useState, useEffect } from 'react';

export function useGnbScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY ?? window.pageYOffset;
      setScrolled(y > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled };
}
