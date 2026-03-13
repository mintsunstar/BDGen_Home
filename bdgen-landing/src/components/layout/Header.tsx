'use client';

import Link from 'next/link';
import { useGnbScroll } from '@/hooks/useGnbScroll';
import { useMobileNav } from '@/hooks/useMobileNav';
import type { NavItem } from '@/types/landing';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  navItems: NavItem[];
}

export function Header({ navItems }: HeaderProps) {
  const { scrolled } = useGnbScroll();
  const { isOpen, open, close } = useMobileNav();

  return (
    <>
      <header
        className={`gnb ${scrolled ? 'scrolled' : ''}`}
        id="gnb"
        role="banner"
      >
        <div className="gnb-inner container">
          <Link href="#hero" className="gnb-logo" aria-label="BDGen 홈">
            <span className="gnb-logo-icon" aria-hidden="true">
              B
            </span>
            <span>BDGen</span>
          </Link>
          <nav className="gnb-nav" aria-label="주요 메뉴">
            {navItems
              .filter((item) => !item.cta)
              .map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            {navItems
              .filter((item) => item.cta)
              .map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  variant="primary"
                  className="gnb-cta"
                >
                  {item.label}
                </Button>
              ))}
          </nav>
          <button
            type="button"
            className="gnb-hamburger"
            id="hamburger"
            aria-label="메뉴 열기"
            aria-expanded={isOpen}
            aria-controls="mobileMenu"
            onClick={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <MobileNav
        navItems={navItems}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
