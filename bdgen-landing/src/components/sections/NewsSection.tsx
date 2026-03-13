'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { NewsCard } from '@/components/ui/NewsCard';
import type { NewsItem } from '@/types/landing';

const THUMB_EMOJIS = ['🤝', '🏆', '💰'];

interface NewsSectionProps { news: NewsItem[]; }

export function NewsSection({ news }: NewsSectionProps) {
  useScrollReveal();
  return (
    <section id="news" className="section section-alt" aria-labelledby="news-title">
      <div className="container">
        <SectionHeader label="NEWS & INSIGHTS" title={<>비디젠 <span>소식</span></>} sub="수주·파트너십·사업 확장 등 비디젠의 주요 소식을 전합니다" />
        <div className="news-grid">
          {news.map((item, i) => (
            <NewsCard key={item.title + i} item={item} thumbEmoji={THUMB_EMOJIS[i] ?? '📰'} thumbBg={i > 0 ? { background: 'linear-gradient(135deg,#0A1428,#0F1E3A)' } : undefined} revealDelay={i === 1 ? 'reveal-delay-2' : i === 2 ? 'reveal-delay-4' : ''} />
          ))}
        </div>
        <div className="ref-more-wrap reveal">
          <Button href="#news" variant="outline" title="TODO: 뉴스 목록 페이지 있으면 URL 연결">모든 소식 보기</Button>
        </div>
      </div>
    </section>
  );
}
