// app/components/PopupCREAIIT.tsx
import React from 'react';
import { FaRocket, FaLightbulb, FaBrain, FaTimes, FaGlobe, FaInstagram, FaChevronRight, FaFileAlt, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PopupProps {
  onClose: () => void;
}

export default function PopupCREAIIT({ onClose }: PopupProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 md:p-8 w-[95%] md:w-[85%] lg:w-[75%] max-w-4xl text-white border border-gray-700/80 shadow-2xl overflow-y-auto max-h-[85vh] md:max-h-[90vh]"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px 5px rgba(79, 70, 229, 0.15)' }}
      >
        <motion.button
          whileHover={{ rotate: 90 }}
          onClick={onClose}
          className="absolute top-3 right-3 md:top-5 md:right-5 text-gray-400 hover:text-white transition-colors duration-300 p-1.5 bg-gray-800/50 rounded-full"
        >
          <FaTimes size={24} className="md:text-3xl" />
        </motion.button>

        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex flex-col items-center space-y-4 md:space-y-6 mb-6 md:mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70 blur-sm animate-pulse-slow"></div>
            <Image
              src="/logo.png"
              alt="CREAI+IT Logo"
              width={160}
              height={52}
              className="relative object-contain w-[130px] h-[42px] md:w-[180px] md:h-[58px]"
            />
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2.5 md:p-4 rounded-full shadow-lg">
              <FaBrain className="text-2xl md:text-3xl text-white" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 text-transparent bg-clip-text animate-gradient-x">
              CREAI+IT 학회
            </h2>
          </div>
        </motion.div>

        <div className="space-y-5 md:space-y-7">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-start space-x-4 md:space-x-5 bg-gradient-to-r from-blue-900/30 to-transparent p-4 rounded-xl"
          >
            <div className="bg-blue-500/20 p-2 rounded-full">
              <FaRocket className="text-blue-400 text-xl md:text-2xl flex-shrink-0" />
            </div>
            <p className="text-base md:text-xl text-gray-200 leading-relaxed">
              기술과 아이디어가 만나 혁신을 이루는 곳, <span className="font-semibold text-blue-300">CREAI+IT</span>에서 함께하세요!
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start space-x-4 md:space-x-5 bg-gradient-to-r from-yellow-900/30 to-transparent p-4 rounded-xl"
          >
            <div className="bg-yellow-500/20 p-2 rounded-full">
              <FaLightbulb className="text-yellow-400 text-xl md:text-2xl flex-shrink-0" />
            </div>
            <p className="text-base md:text-xl text-gray-200 leading-relaxed">
              최신 <span className="font-semibold text-yellow-300">AI 기술</span>을 배우고, 디지털 트렌드를 선도하며, 실제 가치를 창출하는 혁신적인 스타트업 아이디어를 함께 발전시킵니다.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700/50 p-5 md:p-7 rounded-xl border border-gray-600/80 shadow-xl"
          >
            <p className="text-base md:text-xl text-gray-200 leading-relaxed mb-5">
              연세대학교 <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">AI+IT 스타트업 학회 CREAI+IT</span>와 함께 여러분의 혁신적인 아이디어를 현실로 만들어보세요.
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/30 mb-6 shadow-lg"
            >
              <div className="flex items-center mb-3">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <FaFileAlt className="text-purple-400 text-xl" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-purple-300">지금 바로 지원하세요!</h3>
              </div>
              <p className="text-gray-300 mb-4">
                CREAI+IT 학회에서 여러분의 창의적인 아이디어와 열정을 기다립니다. 함께 미래를 만들어갈 준비가 되셨나요?
              </p>
              <a 
                href="https://forms.gle/bq2kba9ked7iWKQC8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] group"
              >
                <span>지원서 작성하기</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <a 
                href="https://creai-it.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start space-x-3 text-blue-400 hover:text-blue-300 transition-colors duration-300 group bg-blue-900/20 hover:bg-blue-900/30 p-3 rounded-lg"
              >
                <FaGlobe className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base md:text-lg font-medium">웹사이트 방문하기</span>
                <FaChevronRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a 
                href="https://www.instagram.com/yonsei_creai_it/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start space-x-3 text-pink-400 hover:text-pink-300 transition-colors duration-300 group bg-pink-900/20 hover:bg-pink-900/30 p-3 rounded-lg"
              >
                <FaInstagram className="text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base md:text-lg font-medium">인스타그램에서 더 알아보기</span>
                <FaChevronRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center md:justify-end mt-7 md:mt-9"
        >
          <button
            className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 rounded-xl font-bold text-white transition-all duration-300 shadow-lg text-lg md:text-xl hover:shadow-xl hover:scale-[1.02] relative overflow-hidden group"
            onClick={onClose}
          >
            <span className="relative z-10">닫기</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
