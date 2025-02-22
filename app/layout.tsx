// app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CREAI+IT 아이디어 테스트',
  description: '당신의 창업 아이디어, 투자받을 수 있을지 테스트해보세요!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="dark">
        {/* Header or Nav (if needed) */}
        <main>{children}</main>
        {/* Footer (if needed) */}
      </body>
    </html>
  );
}
