'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useAnchorScroll } from '@/hooks/useAnchorScroll';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { AboutBdgenSection } from '@/components/sections/AboutBdgenSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { WhySection } from '@/components/sections/WhySection';
import { ReferenceSection } from '@/components/sections/ReferenceSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { CTASection } from '@/components/sections/CTASection';
import { BackToTop } from '@/components/shared/BackToTop';
import { navItems } from '@/data/nav';
import { trustItems } from '@/data/trust';
import { services } from '@/data/services';
import { partners } from '@/data/partners';
import { references } from '@/data/references';
import { reasons } from '@/data/why';
import { newsItems } from '@/data/news';
import { contactConfig } from '@/data/contact';
import { company, linkGroups, footerBottomLinks } from '@/data/footer';

export default function LandingPage() {
  useScrollReveal();
  useAnchorScroll();

  return (
    <>
      <Header navItems={navItems} />
      <main id="main-content">
        <HeroSection />
        <TrustSection items={trustItems} />
        <AboutBdgenSection />
        <ServicesSection services={services} />
        <SolutionsSection />
        <WhySection reasons={reasons} />
        <ReferenceSection partners={partners} references={references} />
        <NewsSection news={newsItems} />
        <CTASection contact={contactConfig} />
      </main>
      <Footer company={company} linkGroups={linkGroups} bottomLinks={footerBottomLinks} />
      <BackToTop />
    </>
  );
}
