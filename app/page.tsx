// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ChatInterface from './components/ChatInterface';
import { motion } from 'framer-motion';
import { FaBrain, FaRocket, FaLightbulb } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  const handleDirectAnalysis = () => {
    router.push('/result?type=direct');
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={60}
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex items-center gap-4 mb-8"
        >
          <FaBrain className="text-4xl sm:text-6xl text-blue-400" />
          <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            <Typewriter
              words={['아이디어를 테스트하세요', '혁신을 시작하세요', '미래를 만드세요']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12 max-w-2xl text-lg text-gray-300 leading-relaxed"
        >
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            CREAI+IT 학회
          </span>가 주최하는 AI+IT 스타트업 컨퍼런스에 오신 것을 환영합니다.
          <br />
          최첨단 AI 기술로 당신의 아이디어를 분석하고 VC 관점에서 평가받아보세요.
        </motion.p>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-4xl backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
        >
          <ChatInterface />
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
            onClick={() => {
              document
                .getElementById('chat-section')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <FaLightbulb className="text-xl group-hover:rotate-12 transition-transform" />
            아이디어 대화 시작하기
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
            onClick={handleDirectAnalysis}
          >
            <FaRocket className="text-xl group-hover:translate-x-1 transition-transform" />
            바로 분석해보기
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
