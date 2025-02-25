// app/layout.tsx
import '@/app/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import { FaRocket } from 'react-icons/fa';

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
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-gray-800/50 shadow-lg">
          <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <FaRocket className="text-blue-400 text-xl" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  CREAI+IT
                </span>
              </div>
            </div>
          </div>
        </header>
        
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
              <p>© 2023 CREAI+IT. All rights reserved.</p>
              <div className="mt-2 sm:mt-0">
                <a href="#" className="hover:text-blue-400 transition-colors">이용약관</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:text-blue-400 transition-colors">개인정보처리방침</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
