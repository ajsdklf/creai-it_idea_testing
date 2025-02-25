// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import { motion } from 'framer-motion';
import { FaBrain, FaRocket, FaLightbulb, FaArrowDown, FaTrash } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import PopupCREAIIT from './components/PopUpCREAIIT';
import UsageGuidePopup from './components/UsageGuidePopup';
import HelperSidebar from './components/HelperSidebar';
import WarningPopup from './components/WarningPopup';
import UserRegistrationPopup from './components/UserRegistrationPopup';

export type StatusType = {
  idea: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  target_customer: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  value_proposition: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  etc: {
    content: string;
    provided: "true" | "false" | "partial";
  };
}

interface Message {
  role: string;
  content: string;
}

export default function HomePage() {
  const router = useRouter();
  const [showCREAIITPopup, setShowCREAIITPopup] = useState(true);
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showUserRegistration, setShowUserRegistration] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<StatusType>({
    idea: {
      content: '',
      provided: "false"
    },
    target_customer: {
      content: '',
      provided: "false"
    },
    value_proposition: {
      content: '',
      provided: "false"
    },
    etc: {
      content: '',
      provided: "false"
    }
  });
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<{
    userName: string;
    email?: string;
    phone?: string;
  } | null>(null);

  const handleCREAIITPopupClose = () => {
    setShowCREAIITPopup(false);
    setShowUsageGuide(true);
  };

  const handleUsageGuideClose = () => {
    setShowUsageGuide(false);
  };

  const handleUserRegistration = (userData: {
    userName: string;
    email?: string;
    phone?: string;
  }) => {
    setUserData(userData);
    setShowUserRegistration(false);
    setShowCREAIITPopup(true);
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setShowUserRegistration(false);
    }
  }, []);

  const handleMessagesUpdate = (messages: Message[]) => {
    setCurrentMessages(messages);
    // Store messages in localStorage as well
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  };

  const handleDirectAnalysis = () => {
    const hasTrueContent = Object.values(currentStatus).some(
      status => status.provided === "true"
    );
    
    if (!hasTrueContent && !showWarning) {
      setShowWarning(true);
      return;
    }

    // 현재 세션의 데이터만 사용
    const queryParams = new URLSearchParams();
    Object.entries(currentStatus).forEach(([key, value]) => {
      if (value.provided !== "false" && value.content) {
        queryParams.append(key, value.content);
      }
    });

    // localStorage 사용하지 않고 state의 현재 메시지만 사용
    router.push(`/result?${queryParams.toString()}&messages=${encodeURIComponent(JSON.stringify(currentMessages))}`);
  };

  const handleStatusUpdate = (status: StatusType) => {
    setCurrentStatus(status);
  };

  const handleStartOver = () => {
    // Clear all localStorage
    localStorage.clear();
    
    // Reset all states
    setCurrentStatus({
      idea: { content: '', provided: "false" },
      target_customer: { content: '', provided: "false" },
      value_proposition: { content: '', provided: "false" },
      etc: { content: '', provided: "false" }
    });
    setCurrentMessages([]);
    setUserData(null);
    setShowUserRegistration(true);
    
    // Refresh the page to ensure clean slate
    window.location.reload();
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Enhanced background with more sophisticated particle system */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Use simple CSS classes instead of motion.div with complex animations */}
          <div className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-blue-500/30 rounded-full blur-3xl -top-[25vw] -left-[25vw] animate-pulse-slow"></div>
          
          <div className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-purple-500/30 rounded-full blur-3xl -bottom-[25vw] -right-[25vw] animate-pulse-slow-delayed"></div>
          
          {/* Simple grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Enhanced logo animation with hover effect */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100 
            }}
            className="mx-auto w-full max-w-[100px] sm:max-w-[120px] lg:max-w-[140px] mb-8 lg:mb-12 group"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={360}
              height={120}
              className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(96,165,250,0.5)]"
              priority
            />
          </motion.div>

          {/* Enhanced hero section with better visual hierarchy and animations */}
          <motion.div
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center mb-12 lg:mb-16 relative z-10"
          >
            {/* Replace basic brain icon with 3D-like animated element */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <FaBrain className="text-5xl lg:text-7xl text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                {/* Use CSS class instead of motion.div */}
                <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-150 blur-xl animate-pulse-slow"></div>
              </div>
            </div>
            
            {/* Enhanced typography with layered text effects */}
            <h1 className="relative text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6">
              <span className="absolute -z-10 blur-sm text-purple-600/30 translate-x-[2px] translate-y-[2px]">
                <Typewriter
                  words={['아이디어를 테스트하세요', '혁신을 시작하세요', '미래를 만드세요']}
                  loop={true}
                  cursor={false}
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 drop-shadow-lg">
                <Typewriter
                  words={['아이디어를 테스트하세요', '혁신을 시작하세요', '미래를 만드세요']}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>
            
            {/* More expressive subtitle with animated highlighting */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-10"
            >
              <motion.span 
                className="font-bold inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 px-1 relative">
                  Powered by CREAI+IT
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
              </motion.span>
              <br className="hidden lg:block" />
              <span className="opacity-90 leading-relaxed">
                AI와 함께 여러분의 아이디어를 구체화하고, <br className="hidden sm:block" />
                <span className="relative inline-block">
                  VC의 관점에서 평가받아보세요.
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-gray-400/30"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  />
                </span>
              </span>
            </motion.p>

            {/* Improved scroll indicator with pulsing animation */}
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-sm mb-2 font-medium">시작하기</span>
              <div className="relative">
                <FaArrowDown className="text-xl" />
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gray-400/20 scale-150 blur-md"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Redesigned chat container with enhanced depth and polish */}
          <motion.div 
            className="w-full max-w-5xl mx-auto relative z-10"
            id="chat-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Add floating elements for visual interest */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
            
            {/* Main chat container with improved glass morphism */}
            <div className="backdrop-blur-lg bg-white/8 rounded-2xl border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.3)] overflow-hidden">
              {/* Chat header with subtle visual separator */}
              <div className="p-4 border-b border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium ml-2">CREAI+IT Console</div>
                </div>
              </div>
              
              {/* Main chat content */}
              <div className="p-4 sm:p-6 lg:p-8">
                {showUserRegistration && (
                  <UserRegistrationPopup onComplete={handleUserRegistration} />
                )}
                <ChatInterface 
                  onStatusUpdate={handleStatusUpdate}
                  onMessagesUpdate={handleMessagesUpdate}
                  userData={userData}
                  onInvalidAnalysis={() => setShowWarning(true)}
                />
              </div>
              
              {/* Chat footer with progress indication */}
              <div className="py-3 px-6 border-t border-white/5 bg-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>AI 분석 준비됨</span>
                </div>
                <div className="flex gap-2">
                  {Object.entries(currentStatus).map(([key, status]) => (
                    <div key={key} className="tooltip" data-tip={key}>
                      <div className={`w-2 h-2 rounded-full ${
                        status.provided === "true" ? "bg-green-500" :
                        status.provided === "partial" ? "bg-yellow-500" : "bg-gray-500"
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Redesigned action buttons with advanced interactions */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 max-w-3xl mx-auto mt-16"
          >
            {/* First Button: Start Chat */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto min-w-[240px] relative overflow-hidden"
              onClick={() => {
                document
                  .getElementById('chat-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FaLightbulb className="text-xl group-hover:rotate-12 transition-transform" />
              <span>아이디어 대화 시작하기</span>
              {/* Use CSS transition instead of motion.div animation */}
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </motion.button>

            {/* Similar advanced styling for other buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto min-w-[240px] relative overflow-hidden animate-gradient-x"
              onClick={handleDirectAnalysis}
            >
              <FaRocket className="text-xl group-hover:rotate-12 transition-transform relative z-10" />
              <span className="relative z-10">바로 분석해보기</span>
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto min-w-[240px] relative overflow-hidden"
              onClick={handleStartOver}
            >
              <FaTrash className="text-xl group-hover:rotate-12 transition-transform relative z-10" />
              <span className="relative z-10">처음부터 다시 시작</span>
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </motion.button>
          </motion.div>
          {/* Add subtle footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center text-gray-500 text-sm"
          >
            <p>© 2023 CREAI+IT. All rights reserved.</p>
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
      <WarningPopup 
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onProceed={() => {
          setShowWarning(false);
          const queryParams = new URLSearchParams();
          Object.entries(currentStatus).forEach(([key, value]) => {
            if (value.provided !== "false" && value.content) {
              queryParams.append(key, value.content);
            }
          });
          localStorage.setItem('chatMessages', JSON.stringify(currentMessages));
          router.push(`/result?${queryParams.toString()}`);
        }}
      />

      {/* Enhanced helper button with contextual assistant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed z-50 bottom-6 right-6 lg:right-12 flex flex-col items-end gap-3"
      >
        {/* Add floating status indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { delay: 2 }
          }}
          className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
        >
          {Object.values(currentStatus).some(status => status.provided === "true") ? 
            "아이디어가 준비되었습니다 ✅" : "아이디어를 입력해주세요 👋"}
        </motion.div>

        {/* Main helper button with enhanced effects */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed z-50 bottom-6 right-6 lg:right-12 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          onClick={() => setShowHelper(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLightbulb className="text-2xl text-white group-hover:text-yellow-200 transition-colors" />
          {/* Use CSS animation instead of motion.div */}
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping-slow opacity-30"></div>
        </motion.button>
      </motion.div>
    </>
  );
}
