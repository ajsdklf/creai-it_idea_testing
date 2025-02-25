'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaChartLine, FaLightbulb, FaUsers } from 'react-icons/fa';
import { VCAnalysisResult } from '@/app/types/analysis';
import PromotionSection from './PromotionSection';
import SummarySection from './SummarySection';
import DetailedCategories from './DetailedCategories';

interface AnalysisResultsProps {
  result: VCAnalysisResult;
  onShowPopup: () => void;
}

export default function AnalysisResults({ result, onShowPopup }: AnalysisResultsProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80 p-6 sm:p-8 rounded-3xl backdrop-blur-lg border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-shadow duration-500"
    >
      <div className="flex flex-col items-center gap-5 mb-8 sm:mb-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="bg-blue-500/20 p-4 rounded-full"
        >
          <FaChartLine className="text-3xl sm:text-4xl md:text-5xl text-blue-400" />
        </motion.div>
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500"
        >
          VC 분석 결과
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full"
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none"
      >
        <div className="bg-gradient-to-b from-gray-800/70 to-gray-900/70 p-5 sm:p-7 md:p-8 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.2)] border border-gray-700/50">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <PromotionSection onShowPopup={onShowPopup} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <SummarySection totalScore={result.total_score} summary={result.summary} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <DetailedCategories result={result} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex justify-center mt-8"
            >
              <div className="flex items-center gap-3 text-gray-400 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700/50">
                <FaLightbulb className="text-yellow-400" />
                <p className="text-sm">분석 결과를 바탕으로 비즈니스 모델을 개선해보세요</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-5 rounded-xl border border-blue-500/30"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="bg-blue-500/30 p-3 rounded-full">
                  <FaUsers className="text-2xl text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-1">CREAI+IT 커뮤니티와 함께 성장하세요</h3>
                  <p className="text-sm text-gray-300">더 정확한 분석과 전문가의 피드백을 받아보세요. 동일 관심사의 구성원들과 네트워킹하며 아이디어를 발전시킬 수 있습니다.</p>
                </div>
                <button 
                  onClick={onShowPopup}
                  className="mt-3 sm:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30 whitespace-nowrap"
                >
                  가입하기
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}