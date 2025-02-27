'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaTrophy, FaShareAlt, FaArrowRight } from 'react-icons/fa';

interface UserRegistrationPopupProps {
  onComplete: (userData: {
    userName: string;
    email?: string;
    phone?: string;
  }) => void;
}

export default function UserRegistrationPopup({ onComplete }: UserRegistrationPopupProps) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('사용자 이름을 입력해주세요.');
      return;
    }
    
    onComplete({
      userName: userName.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-4 sm:p-6 w-full max-w-[95%] sm:max-w-md mx-auto shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
            <FaUser className="text-blue-400 text-xl sm:text-2xl" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            환영합니다!
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3 sm:mb-4"></div>
        </div>
        
        <div className="mb-5 sm:mb-8 space-y-3 sm:space-y-4 bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-gray-700/50">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="bg-yellow-500/10 p-2 rounded-lg">
              <FaTrophy className="text-yellow-400 flex-shrink-0 text-sm sm:text-base" />
            </div>
            <p className="text-xs sm:text-sm text-gray-200">
              리더보드에서 다른 사용자들과 아이디어를 공유하고 순위를 확인해보세요.
            </p>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <FaShareAlt className="text-blue-400 flex-shrink-0 text-sm sm:text-base" />
            </div>
            <p className="text-xs sm:text-sm text-gray-200">
              분석 결과를 저장하고 다른 사람들과 공유할 수 있습니다.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-gray-300 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">
              사용자 이름 <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                <FaUser className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm sm:text-base" />
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 text-sm"
                placeholder="리더보드에 표시될 이름"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">
              이메일 <span className="text-gray-500 font-normal">(선택)</span>
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                <FaEnvelope className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm sm:text-base" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 text-sm"
                placeholder="결과 공유를 위한 이메일"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1 ml-1">분석 결과 공유 및 알림용</p>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 sm:mb-2 text-xs sm:text-sm font-medium">
              전화번호 <span className="text-gray-500 font-normal">(선택)</span>
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                <FaPhone className="text-gray-400 group-hover:text-blue-400 transition-colors text-sm sm:text-base" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 text-sm"
                placeholder="결과 알림을 받을 전화번호"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1 ml-1">분석 결과 알림용</p>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs sm:text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/20"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                    text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-600/20
                    flex items-center justify-center gap-2 mt-4 sm:mt-6 text-sm sm:text-base"
          >
            시작하기
            <FaArrowRight className="text-xs sm:text-sm" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
} 