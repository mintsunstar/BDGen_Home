import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BDGen — Web 3.0 블록체인 DID 전문기업',
  description: '블록체인·DID·Passkey 기술로 산업의 디지털 전환을 완성하는 BDGen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
