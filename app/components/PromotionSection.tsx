'use client';

import React from 'react';
import { FaRocket, FaLightbulb, FaArrowRight, FaUserPlus, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PromotionSectionProps {
  onShowPopup: () => void;
}

export default function PromotionSection({ onShowPopup }: PromotionSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 bg-gradient-to-br from-blue-900/40 to-indigo-900/30 p-6 rounded-xl border border-blue-500/30 shadow-lg"
    >
      <div className="flex flex-col items-center space-y-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src="/logo.png"
            alt="CREAI+IT Logo"
            width={180}
            height={60}
            className="object-contain"
          />
        </motion.div>
        
        <div className="text-center space-y-3 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
            당신의 혁신적인 아이디어를 현실로 만들어보세요!
          </h2>
          <p className="text-gray-300 text-lg">
            CREAI+IT 커뮤니티와 함께라면 가능합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl">
          <div className="flex items-start space-x-4 bg-blue-900/20 p-5 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-md">
            <FaRocket className="text-blue-400 text-xl flex-shrink-0 mt-1" />
            <p className="text-gray-200">
              최신 AI 기술을 배우고 실제 스타트업으로 발전시킬 수 있는 기회
            </p>
          </div>
          <div className="flex items-start space-x-4 bg-blue-900/20 p-5 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-md">
            <FaLightbulb className="text-yellow-400 text-xl flex-shrink-0 mt-1" />
            <p className="text-gray-200">
              전문가 멘토링과 함께 아이디어를 검증하고 발전시키는 과정
            </p>
          </div>
          <div className="flex items-start space-x-4 bg-blue-900/20 p-5 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-md">
            <FaUsers className="text-green-400 text-xl flex-shrink-0 mt-1" />
            <p className="text-gray-200">
              함께 성장하는 커뮤니티 네트워크
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <motion.button
            onClick={onShowPopup}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            CREAI+IT 더 알아보기
            <FaArrowRight className="text-sm" />
          </motion.button>
          
          <motion.button
            onClick={() => window.open('https://forms.gle/bq2kba9ked7iWKQC8', '_blank')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            지금 가입하기
            <FaUserPlus className="text-sm" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}