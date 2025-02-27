'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaGlobe, FaInstagram, FaChevronDown, FaAward } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-gray-800/50 shadow-lg">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo.png"
              alt="CREAI+IT Logo"
              width={40}
              height={15}
              className="object-contain"
            />
            <div className="hidden md:flex items-center space-x-2">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                CREAI+IT
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
              홈
            </Link>
            <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-1">
              <FaAward className="text-blue-400 mr-1" />
              <span>리더보드</span>
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>더 알아보기</span>
                <FaChevronDown className={`text-xs transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                >
                  <div className="py-1">
                    <a 
                      href="https://creai-it.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <FaGlobe className="mr-2 text-blue-400" />
                      웹사이트
                    </a>
                    <a 
                      href="https://www.instagram.com/yonsei_creai_it/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <FaInstagram className="mr-2 text-pink-400" />
                      인스타그램
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </nav>

          {/* CTA Button */}
          <div>
            <a 
              href="https://forms.gle/bq2kba9ked7iWKQC8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaLightbulb className="text-yellow-300" />
              <span className="hidden sm:inline">지원하기</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
