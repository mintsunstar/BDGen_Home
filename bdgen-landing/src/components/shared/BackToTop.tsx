'use client';

import { useState, useEffect } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY ?? window.pageYOffset;
      setVisible(y > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-top ${visible ? 'visible' : ''}`}
      aria-label="맨 위로 이동"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}
