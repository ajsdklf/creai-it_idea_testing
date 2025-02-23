// app/components/PopupCREAIIT.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaLightbulb, FaBrain, FaTimes, FaGlobe, FaInstagram } from 'react-icons/fa';
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
        className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-6"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 md:p-8 w-[95%] md:w-[85%] lg:w-[75%] max-w-4xl text-white border border-gray-700 shadow-2xl overflow-y-auto max-h-[85vh] md:max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-5 md:right-5 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTimes size={24} className="md:text-3xl" />
          </button>

          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex flex-col items-center space-y-4 md:space-y-6 mb-6 md:mb-8"
          >
            <Image
              src="/logo.png"
              alt="CREAI+IT Logo"
              width={140}
              height={45}
              className="object-contain w-[120px] h-[38px] md:w-[160px] md:h-[52px]"
            />
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="bg-blue-500 p-2.5 md:p-4 rounded-full shadow-lg">
                <FaBrain className="text-2xl md:text-3xl text-white" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 text-transparent bg-clip-text">
                CREAI+IT 학회
              </h2>
            </div>
          </motion.div>

          <div className="space-y-5 md:space-y-7">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4 md:space-x-5"
            >
              <FaRocket className="text-blue-400 text-xl md:text-2xl mt-1 flex-shrink-0" />
              <p className="text-base md:text-xl text-gray-200 leading-relaxed">
                기술과 아이디어가 만나 혁신을 이루는 곳, CREAI+IT에서 함께하세요!
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4 md:space-x-5"
            >
              <FaLightbulb className="text-yellow-400 text-xl md:text-2xl mt-1 flex-shrink-0" />
              <p className="text-base md:text-xl text-gray-200 leading-relaxed">
                최신 AI 기술을 배우고, 디지털 트렌드를 선도하며, 실제 가치를 창출하는 혁신적인 스타트업 아이디어를 함께 발전시킵니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-700/50 p-5 md:p-7 rounded-xl border border-gray-600 shadow-xl"
            >
              <p className="text-base md:text-xl text-gray-200 leading-relaxed mb-5">
                연세대학교 AI+IT 스타트업 컨퍼런스와 함께 여러분의 혁신적인 아이디어를 현실로 만들어보세요.
              </p>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <a 
                  href="https://creai-it.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
                >
                  <FaGlobe className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base md:text-lg font-medium">웹사이트 방문하기</span>
                </a>
                <a 
                  href="https://www.instagram.com/yonsei_creai_it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-pink-400 hover:text-pink-300 transition-colors duration-300 group"
                >
                  <FaInstagram className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base md:text-lg font-medium">인스타그램에서 더 알아보기</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end mt-7 md:mt-9"
          >
            <button
              className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 via-purple-400 to-purple-500 rounded-xl font-bold text-white hover:opacity-90 transition-all duration-300 shadow-lg text-lg md:text-xl hover:shadow-xl hover:scale-[1.02]"
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
