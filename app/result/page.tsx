// app/result/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PopupCREAIIT from '../components/PopUpCREAIIT';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChartLine, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import confetti from 'canvas-confetti';

export default function ResultPage() {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const analysisType = searchParams?.get('type') || '';
  const userIdea = searchParams?.get('idea') || '';

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const endpoint = analysisType === 'vc' ? '/api/vc_analyzer' : '/api/analyzer';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIdea }),
        });

        if (!response.ok) {
          throw new Error('분석 요청에 실패했습니다.');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setAnalysisResult(data.analysis || data.verdict);
        setAnalysisComplete(true);
        setShowPopup(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        setAnalysisComplete(true);
      }
    };

    fetchAnalysis();
  }, [analysisType, userIdea]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8"
    >
      <div className="max-w-4xl mx-auto">
        {!analysisComplete ? (
          <motion.div 
            className="flex flex-col items-center justify-center min-h-[60vh]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <LoadingSpinner />
            <h2 className="mt-8 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              <Typewriter
                words={[analysisType === 'vc' ? 'VC 관점에서 아이디어를 분석중입니다...' : '아이디어를 분석중입니다...']}
                loop={true}
                cursor
                cursorStyle="_"
              />
            </h2>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-red-900/30 p-8 rounded-2xl backdrop-blur-lg border border-red-500/30"
          >
            <div className="flex items-center justify-center mb-6">
              <FaExclamationTriangle className="text-5xl text-red-500 mr-4" />
              <h1 className="text-3xl font-bold text-red-400">오류 발생</h1>
            </div>
            <p className="text-red-300 text-center text-lg">{error}</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20"
          >
            <div className="flex items-center justify-center mb-8">
              {analysisType === 'vc' ? 
                <FaChartLine className="text-5xl text-blue-400 mr-4" /> :
                <FaLightbulb className="text-5xl text-yellow-400 mr-4" />
              }
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {analysisType === 'vc' ? 'VC 분석 결과' : '아이디어 분석 결과'}
              </h1>
            </div>
            
            <motion.div 
              className="prose prose-lg prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gray-800/50 p-8 rounded-xl shadow-2xl border border-gray-700">
                <div className="whitespace-pre-line text-gray-200 leading-relaxed">
                  {analysisResult}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showPopup && !error && <PopupCREAIIT onClose={() => setShowPopup(false)} />}
      </div>
    </motion.div>
  );
}
