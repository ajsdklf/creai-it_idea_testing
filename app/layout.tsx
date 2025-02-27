// app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import { FaRocket } from 'react-icons/fa';
import Header from './components/Header';

// Load Inter font with specific subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CREAI+IT 아이디어 테스트',
  description: '당신의 창업 아이디어, 투자받을 수 있을지 테스트해보세요!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#111827', // Dark theme color
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`scroll-smooth ${inter.variable}`}>
      <body className="dark min-h-screen w-full overflow-x-hidden text-base antialiased bg-gradient-to-b from-gray-900 to-black text-gray-100">
        <Header />
        
        {/* Main content */}
        <main className="flex min-h-[calc(100vh-4rem)] w-full flex-col">
          <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-black/40 border-t border-gray-800/50 py-4">
          <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2025 CREAI+IT. All rights reserved.</p>
              <div className="mt-2 sm:mt-0">
                <span className="mx-2">|</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
