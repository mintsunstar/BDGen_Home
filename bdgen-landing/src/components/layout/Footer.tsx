import Link from 'next/link';
import type { CompanyInfo, LinkGroup } from '@/types/landing';

interface FooterProps {
  company: CompanyInfo;
  linkGroups: LinkGroup[];
}

export function Footer({ company, linkGroups }: FooterProps) {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">B</div>
              <span>BDGen</span>
            </div>
            <p className="footer-desc">
              블록체인·DID 전문기업. 통신·금융·공공·의료 등 산업의 인증·증명 솔루션을 제공합니다.
            </p>
            <div className="footer-info">
              <span>{company.name}</span>
              <br />
              대표이사 : {company.ceo}
              <br />
              사업자등록번호 : {company.registrationNumber}
              <br />
              주소 : {company.address}
              <br />
              전화 : <a href={`tel:${company.phone}`}>{company.phone}</a>
              <br />
              이메일 : <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title} className="footer-col">
              <div className="footer-col-title">{group.title}</div>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2024 {company.name}. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a
              href="https://www.bdgen.co.kr/hrm/sign-in"
              target="_blank"
              rel="noopener noreferrer"
            >
              비디젠 직원 전용 HRM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
