'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaTrophy, FaShareAlt } from 'react-icons/fa';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          환영합니다!
        </h2>
        
        <div className="mb-6 space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <FaTrophy className="text-yellow-400 mt-1 flex-shrink-0" />
            <p className="text-sm">
              리더보드에서 다른 사용자들과 아이디어를 공유하고 순위를 확인해보세요.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FaShareAlt className="text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-sm">
              분석 결과를 저장하고 다른 사람들과 공유할 수 있습니다.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              사용자 이름 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="리더보드에 표시될 이름을 입력해주세요"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              이메일 (선택) - 분석 결과 공유 및 알림용
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="결과 공유를 위한 이메일 주소"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              전화번호 (선택) - 분석 결과 알림용
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="결과 알림을 받을 전화번호"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 
                     text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
          >
            시작하기
          </button>
        </form>
      </motion.div>
    </div>
  );
} 