import Link from 'next/link';
import type { NewsItem } from '@/types/landing';

interface NewsCardProps {
  item: NewsItem;
  thumbEmoji?: string;
  thumbBg?: React.CSSProperties;
  revealDelay?: string;
}

export function NewsCard({ item, thumbEmoji = '📰', thumbBg, revealDelay = '' }: NewsCardProps) {
  return (
    <article className={`news-card reveal ${revealDelay}`.trim()}>
      <div className="news-thumb">
        <div className="news-thumb-bg" style={thumbBg} />
        {item.thumb ? (
          <img src={item.thumb} alt="" className="news-thumb-img" />
        ) : (
          <div className="news-thumb-emoji" aria-hidden>
            {thumbEmoji}
          </div>
        )}
      </div>
      <div className="news-body">
        <div className="news-meta">
          <span className="news-category">{item.category}</span>
          <span className="news-date">{item.date}</span>
        </div>
        <h3 className="news-title">{item.title}</h3>
        <p className="news-excerpt">{item.excerpt}</p>
        <Link href={item.url} className="news-link" title="TODO: 뉴스 상세 페이지 URL 연결">
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
