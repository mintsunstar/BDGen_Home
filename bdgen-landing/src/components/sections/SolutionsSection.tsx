'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/Button';
import { genidFeatures, genidUseCases, genidFlowSteps } from '@/data/genid';

const TABS = [
  { id: 'tab-features', label: '핵심 특징', icon: '🛡️' },
  { id: 'tab-usecases', label: '적용 분야', icon: '🏢' },
  { id: 'tab-flow', label: '서비스 플로우', icon: '🔄' },
];

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState('tab-features');
  useScrollReveal();

  return (
    <section id="genid" className="section landing-solutions" aria-labelledby="genid-title">
      <div className="container">
        <div className="genid-header">
          <div className="genid-product-badge reveal">FLAGSHIP SOLUTION</div>
          <h2 id="genid-title" className="section-title reveal reveal-delay-1">
            GenID — 나의 신원을<br />내가 <span>소유하는</span> DID 플랫폼
          </h2>
          <p className="section-sub reveal reveal-delay-2" style={{ margin: '16px auto 0' }}>
            W3C 글로벌 표준 기반 · 하이퍼레저 패브릭 · 위변조 불가 · 간편 SDK 제공
          </p>
        </div>
        <div className="genid-tabs reveal reveal-delay-2" role="tablist" aria-label="GenID 소개 탭">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`genid-tab ${activeTab === t.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === t.id}
              aria-controls={t.id}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'tab-features' && (
          <div id="tab-features" className="genid-panel active" role="tabpanel">
            <div className="genid-features-grid">
              {genidFeatures.map((f, i) => (
                <div key={f.title} className={`genid-feature reveal ${i ? 'reveal-delay-' + i : ''}`}>
                  <div className="genid-feature-icon">{f.icon}</div>
                  <div>
                    <div className="genid-feature-title">{f.title}</div>
                    <div className="genid-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tab-usecases' && (
          <div id="tab-usecases" className="genid-panel active" role="tabpanel">
            <div className="genid-usecases">
              {genidUseCases.map((u, i) => (
                <div key={u.title} className={`genid-usecase reveal ${i % 3 ? 'reveal-delay-' + (i % 3) : ''}`}>
                  <div className="genid-usecase-emoji">{u.emoji}</div>
                  <div className="genid-usecase-title">{u.title}</div>
                  <div className="genid-usecase-desc">{u.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tab-flow' && (
          <div id="tab-flow" className="genid-panel active" role="tabpanel">
            <div className="genid-flow">
              {genidFlowSteps.map((s, i) => (
                <div key={s.num} style={{ display: 'contents' }}>
                  <div className={`genid-flow-step reveal ${i ? 'reveal-delay-' + i : ''}`}>
                    <div className="genid-flow-num">{s.num}</div>
                    <div className="genid-flow-icon">{s.icon}</div>
                    <div className="genid-flow-title">{s.title}</div>
                    <div className="genid-flow-desc" dangerouslySetInnerHTML={{ __html: s.desc }} />
                  </div>
                  {i < genidFlowSteps.length - 1 && (
                    <div className={'genid-flow-arrow reveal reveal-delay-' + (i + 1)}>›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="genid-cta-wrap reveal">
          <Button href="#cta" variant="primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
            GenID 기술 협업 상담
          </Button>
        </div>
      </div>
    </section>
  );
}
