// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import { motion } from 'framer-motion';
import { FaBrain, FaRocket, FaLightbulb } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import PopupCREAIIT from './components/PopUpCREAIIT';
import UsageGuidePopup from './components/UsageGuidePopup';
import HelperSidebar from './components/HelperSidebar';

interface StatusType {
  idea: {
    content: string;
    provided: boolean;
  };
  target_customer: {
    content: string;
    provided: boolean;
  };
  value_proposition: {
    content: string;
    provided: boolean;
  };
}

export default function HomePage() {
  const router = useRouter();
  const [showCREAIITPopup, setShowCREAIITPopup] = useState(true);
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusType>({
    idea: {
      content: '',
      provided: false
    },
    target_customer: {
      content: '',
      provided: false
    },
    value_proposition: {
      content: '',
      provided: false
    }
  });

  const handleCREAIITPopupClose = () => {
    setShowCREAIITPopup(false);
    setShowUsageGuide(true);
  };

  const handleUsageGuideClose = () => {
    setShowUsageGuide(false);
  };

  const handleDirectAnalysis = () => {
    router.push('/result?type=direct');
  };

  const handleStatusUpdate = (newStatus: StatusType) => {
    setCurrentStatus(newStatus);
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Refined background elements with better positioning and animation */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-500/20 rounded-full blur-3xl -top-[20vw] -left-[20vw] animate-pulse"></div>
          <div className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-purple-500/20 rounded-full blur-3xl -bottom-[20vw] -right-[20vw] animate-pulse delay-700"></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Responsive logo container */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[80px] sm:max-w-[100px] lg:max-w-[120px] mb-8 lg:mb-16"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={360}
              height={120}
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Hero section with improved spacing and responsiveness */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="flex justify-center mb-6">
              <FaBrain className="text-4xl lg:text-6xl text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-tight mb-6">
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
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            >
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                CREAI+IT 학회
              </span>가 주최하는 AI+IT 스타트업 컨퍼런스에 오신 것을 환영합니다.
              <br className="hidden lg:block" />
              최첨단 AI 기술로 당신의 아이디어를 분석하고 VC 관점에서 평가받아보세요.
            </motion.p>
          </motion.div>

          {/* Chat interface with improved container styling */}
          <motion.div className="w-full max-w-5xl mx-auto backdrop-blur-lg bg-white/5 p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl mb-12">
            <ChatInterface onStatusUpdate={handleStatusUpdate} />
          </motion.div>

          {/* Floating helper button with better positioning */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed z-50 bottom-6 right-6 lg:right-12 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setShowHelper(true)}
          >
            <FaLightbulb className="text-2xl text-white" />
          </motion.button>

          {/* Action buttons with improved layout and responsiveness */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-3xl mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto min-w-[240px]"
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
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto min-w-[240px]"
              onClick={handleDirectAnalysis}
            >
              <FaRocket className="text-xl group-hover:translate-x-1 transition-transform" />
              바로 분석해보기
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {showCREAIITPopup && <PopupCREAIIT onClose={handleCREAIITPopupClose} />}
      {showUsageGuide && <UsageGuidePopup onClose={handleUsageGuideClose} />}
      <HelperSidebar 
        isOpen={showHelper}
        onClose={() => setShowHelper(false)}
        currentStatus={currentStatus}
      />
    </>
  );
}
