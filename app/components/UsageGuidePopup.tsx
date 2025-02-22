// app/components/UsageGuidePopup.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaRocket, FaTimes, FaQuestionCircle } from 'react-icons/fa';

interface PopupProps {
  onClose: () => void;
}

export default function UsageGuidePopup({ onClose }: PopupProps) {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-lg w-full text-white border border-gray-700 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>

          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center space-x-3 mb-6"
          >
            <div className="bg-purple-500 p-3 rounded-full">
              <FaQuestionCircle className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              사용 가이드
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <FaComments className="text-blue-400 text-xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">대화형 분석</h3>
                <p className="text-gray-200">
                  AI와 대화하며 아이디어를 발전시키고 피드백을 받아보세요. 
                  더 구체적인 아이디어 발전을 위한 질문들을 받게 됩니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <FaRocket className="text-purple-400 text-xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">즉시 분석</h3>
                <p className="text-gray-200">
                  준비된 아이디어가 있다면 '바로 분석해보기'를 통해 
                  즉시 VC 관점의 평가를 받아볼 수 있습니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
            >
              <p className="text-lg text-gray-200">
                아이디어가 없으시더라도 관심 있는 분야나 기술에 대해 
                자유롭게 이야기해 주세요. AI가 도와드립니다.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end mt-8"
          >
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity shadow-lg"
              onClick={onClose}
            >
              시작하기
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}