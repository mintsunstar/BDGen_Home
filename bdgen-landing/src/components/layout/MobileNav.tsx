'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import type { NavItem } from '@/types/landing';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ navItems, isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <div
      className={`gnb-mobile ${isOpen ? 'open' : ''}`}
      id="mobileMenu"
      role="dialog"
      aria-label="모바일 메뉴"
      aria-modal="true"
      hidden={!isOpen}
    >
      <button
        type="button"
        className="gnb-mobile-close"
        aria-label="메뉴 닫기"
        onClick={onClose}
      >
        ✕
      </button>
      {navItems
        .filter((item) => !item.cta)
        .map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </Link>
        ))}
      {navItems
        .filter((item) => item.cta)
        .map((item) => (
          <Button key={item.href} href={item.href} variant="primary" onClick={onClose}>
            {item.label}
          </Button>
        ))}
    </div>
  );
}
