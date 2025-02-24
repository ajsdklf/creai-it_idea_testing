// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import { motion } from 'framer-motion';
import { FaBrain, FaRocket, FaLightbulb, FaArrowDown } from 'react-icons/fa';
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

  // Add useEffect to scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {/* Enhanced background with more dynamic animations */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-blue-500/20 rounded-full blur-3xl -top-[25vw] -left-[25vw]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-purple-500/20 rounded-full blur-3xl -bottom-[25vw] -right-[25vw]"
          />
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Enhanced logo animation */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100 
            }}
            className="mx-auto w-full max-w-[100px] sm:max-w-[120px] lg:max-w-[140px] mb-12 lg:mb-20 hover:scale-110 transition-transform duration-300"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={360}
              height={120}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Enhanced hero section with better visual hierarchy */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center mb-16 lg:mb-24"
          >
            <motion.div 
              className="flex justify-center mb-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaBrain className="text-5xl lg:text-7xl text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 leading-tight mb-8 drop-shadow-2xl">
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
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12"
            >
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Powered by CREAI+IT
              </span>
              <br className="hidden lg:block" />
              <span className="opacity-90">
                AI와 함께 여러분의 아이디어를 구체화하고, <br className="hidden sm:block" />
                VC의 관점에서 평가받아보세요.
              </span>
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-sm mb-2">시작하기</span>
              <FaArrowDown className="text-xl" />
            </motion.div>
          </motion.div>

          {/* Rest of the components remain the same */}
          <motion.div className="w-full max-w-5xl mx-auto backdrop-blur-lg bg-white/5 p-4 sm:p-6 lg:p-8 rounded-2xl border border-white/10 shadow-2xl mb-12">
            <ChatInterface onStatusUpdate={handleStatusUpdate} />
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed z-50 bottom-6 right-6 lg:right-12 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => setShowHelper(true)}
          >
            <FaLightbulb className="text-2xl text-white" />
          </motion.button>

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
