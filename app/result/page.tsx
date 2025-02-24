// app/result/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PopupCREAIIT from '../components/PopUpCREAIIT';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChartLine, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import confetti from 'canvas-confetti';

interface VCAnalysisResult {
  market_opportunity: {
    score: number;
    feedback: string;
  };
  product_solution: {
    score: number;
    feedback: string;
  };
  business_model: {
    score: number;
    feedback: string;
  };
  competition_differentiation: {
    score: number;
    feedback: string;
  };
  team_execution: {
    score: number;
    feedback: string;
  };
  investment_potential: {
    score: number;
    feedback: string;
  };
  total_score: number;
  summary: string;
}

interface AnalysisInput {
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
}

function ResultContent() {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VCAnalysisResult | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const idea = searchParams?.get('idea') || '';
  const targetCustomer = searchParams?.get('target_customer') || '';
  const valueProposition = searchParams?.get('value_proposition') || '';

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // Allow analysis even if some fields are missing

        const analysisInput: AnalysisInput = {
          idea: {
            content: idea,
            provided: idea ? "true" : "false"
          },
          target_customer: {
            content: targetCustomer,
            provided: targetCustomer ? "true" : "false"
          },
          value_proposition: {
            content: valueProposition,
            provided: valueProposition ? "true" : "false"
          }
        };

        const response = await fetch('/api/vc_analyzer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ analysisInput })
        });

        if (!response.ok) {
          throw new Error('분석 요청에 실패했습니다.');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setAnalysisResult(data.analysis);
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
  }, [idea, targetCustomer, valueProposition]);

  const renderVCAnalysis = (result: VCAnalysisResult) => (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-400 mb-3">종합 평가</h2>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-white">총점</span>
            <span className="text-3xl font-bold text-blue-400">{result.total_score}/100</span>
          </div>
          <p className="text-gray-200 whitespace-pre-line">{result.summary}</p>
        </div>
      </div>

      {/* Detailed Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(result).map(([key, value]) => {
          if (key === 'total_score' || key === 'summary') return null;
          
          const categoryInfo = {
            market_opportunity: { name: '시장 기회', maxScore: 25 },
            product_solution: { name: '제품/솔루션', maxScore: 20 },
            business_model: { name: '비즈니스 모델', maxScore: 20 },
            competition_differentiation: { name: '경쟁력/차별화', maxScore: 15 },
            team_execution: { name: '팀/실행력', maxScore: 10 },
            investment_potential: { name: '투자 잠재력', maxScore: 10 }
          }[key];

          if (!categoryInfo) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/30 p-5 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-200">{categoryInfo.name}</h3>
                <span className="text-xl font-bold text-blue-400">{value.score}/{categoryInfo.maxScore}</span>
              </div>
              <p className="text-gray-300 text-sm">{value.feedback}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft className="text-sm" />
          <span className="hidden sm:inline">돌아가기</span>
        </motion.button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {!analysisComplete ? (
            <motion.div 
              className="flex flex-col items-center justify-center min-h-[70vh] px-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <LoadingSpinner />
              <h2 className="mt-8 text-lg sm:text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <Typewriter
                  words={['VC 관점에서 아이디어를 분석중입니다...']}
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
              className="bg-red-900/30 p-6 sm:p-8 rounded-2xl backdrop-blur-lg border border-red-500/30 shadow-xl"
            >
              <div className="flex flex-col items-center gap-4 mb-6">
                <FaExclamationTriangle className="text-3xl sm:text-4xl md:text-5xl text-red-500" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 text-center">오류 발생</h1>
              </div>
              <p className="text-red-300 text-center text-sm sm:text-base md:text-lg">{error}</p>
            </motion.div>
          ) : analysisResult && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow-2xl"
            >
              <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
                <FaChartLine className="text-3xl sm:text-4xl md:text-5xl text-blue-400" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  VC 분석 결과
                </h1>
              </div>
              
              <motion.div 
                className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-800/50 p-5 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
                  {renderVCAnalysis(analysisResult)}
                </div>
              </motion.div>
            </motion.div>
          )}

          {showPopup && !error && <PopupCREAIIT onClose={() => setShowPopup(false)} />}
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResultContent />
    </Suspense>
  );
}
