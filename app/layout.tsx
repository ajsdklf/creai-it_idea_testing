// app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CREAI+IT 아이디어 테스트',
  description: '당신의 창업 아이디어, 투자받을 수 있을지 테스트해보세요!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="dark min-h-screen w-full overflow-x-hidden text-base antialiased">
        {/* Header or Nav (if needed) */}
        <main className="flex min-h-screen w-full flex-col">
          <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        {/* Footer (if needed) */}
      </body>
    </html>
  );
}
