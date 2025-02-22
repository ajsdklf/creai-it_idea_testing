// app/components/PopupCREAIIT.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaLightbulb, FaBrain, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface PopupProps {
  onClose: () => void;
}

export default function PopupCREAIIT({ onClose }: PopupProps) {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        {/* Overlay with blur effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Popup Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-lg w-full text-white border border-gray-700 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>

          {/* Logo and Header with animation */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex flex-col items-center space-y-4 mb-6"
          >
            <Image
              src="/logo.png"
              alt="CREAI+IT Logo"
              width={140}
              height={45}
              className="object-contain"
            />
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full">
                <FaBrain className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                CREAI+IT 학회
              </h2>
            </div>
          </motion.div>

          {/* Content with icons */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <FaRocket className="text-blue-400 text-xl mt-1" />
              <p className="text-lg text-gray-200">
                연세대학교 AI+IT 스타트업 컨퍼런스에 참가해 보세요!
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <FaLightbulb className="text-yellow-400 text-xl mt-1" />
              <p className="text-lg text-gray-200">
                LLM과 생성형 AI를 활용해 실제 가치를 창출하는 스타트업 아이디어를 함께 발전시킵니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
            >
              <p className="text-lg text-gray-200">
                더 궁금하신 점이 있거나, 함께 하고 싶다면 지금 바로 문의 주세요.
              </p>
            </motion.div>
          </div>

          {/* Action buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end mt-8 space-x-4"
          >
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity shadow-lg"
              onClick={onClose}
            >
              닫기
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
