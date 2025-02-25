'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaTimes, FaSpinner, FaQuestion, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

interface StatusType {
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
  etc: {
    content: string;
    provided: "true" | "false" | "partial";
  };
}

interface HelperSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: StatusType;
}

export default function HelperSidebar({ isOpen, onClose, currentStatus }: HelperSidebarProps) {
  const [suggestion, setSuggestion] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [userPrompt, setUserPrompt] = React.useState('');

  const getHelp = async () => {
    if (!userPrompt.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentStatus, userPrompt }),
      });
      
      const data = await response.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error('Helper error:', error);
      setSuggestion('죄송합니다. 도움말을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (provided: "true" | "false" | "partial") => {
    switch(provided) {
      case "true":
        return <FaCheckCircle className="text-green-400 text-lg sm:text-xl" />;
      case "partial":
        return <FaExclamationTriangle className="text-yellow-400 text-lg sm:text-xl" />;
      case "false":
        return <FaTimesCircle className="text-red-400 text-lg sm:text-xl" />;
      default:
        return "";
    }
  };

  const getStatusColor = (provided: "true" | "false" | "partial") => {
    switch(provided) {
      case "true":
        return "border-green-400/30 bg-green-400/5";
      case "partial":
        return "border-yellow-400/30 bg-yellow-400/5";
      case "false":
        return "border-red-400/30 bg-red-400/5";
      default:
        return "border-gray-700/50";
    }
  };

  const getStatusLabel = (provided: "true" | "false" | "partial") => {
    switch(provided) {
      case "true":
        return <span className="font-medium text-green-400">완료</span>;
      case "partial":
        return <span className="font-medium text-yellow-400">부분 완료</span>;
      case "false":
        return <span className="font-medium text-red-400">미완료</span>;
      default:
        return "";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[420px] bg-gradient-to-b from-gray-900 to-gray-950 border-l border-gray-700/70 shadow-2xl z-50"
        >
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 p-2.5 rounded-lg shadow-inner">
                  <FaLightbulb className="text-xl sm:text-2xl text-yellow-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">도움말</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/70 rounded-lg"
                aria-label="Close helper sidebar"
              >
                <FaTimes className="text-xl sm:text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
              <div className="prose prose-invert max-w-none">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-800/40 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 shadow-lg border border-gray-700/50"
                >
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-2"></span>
                    현재 상태
                  </h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {Object.entries(currentStatus).map(([key, value]) => (
                      <motion.li 
                        key={key} 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`flex flex-col gap-2 rounded-lg p-3.5 border ${getStatusColor(value.provided)} 
                          transition-all duration-300 hover:shadow-md`}
                      >
                        <div className="flex items-center gap-2.5 text-sm sm:text-base">
                          {getStatusIcon(value.provided)}
                          <span className="font-medium text-gray-200">
                            {key === 'idea' ? '아이디어 설명' : 
                             key === 'target_customer' ? '타겟 고객' : 
                             key === 'value_proposition' ? '가치 제안' :
                             '추가 정보'}
                          </span>
                          <span className="mx-1 text-gray-500">:</span>
                          {getStatusLabel(value.provided)}
                        </div>
                        {value.content && (
                          <div className="bg-gray-900/50 rounded-lg p-3 mt-1">
                            <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">&ldquo;{value.content}&rdquo;</p>
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800/40 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 shadow-lg border border-gray-700/50"
                >
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full mr-2"></span>
                    질문하기
                  </h4>
                  <div className="relative">
                    <textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="어떤 도움이 필요하신가요?"
                      className="w-full bg-gray-900/70 text-white rounded-xl p-4 min-h-[120px] sm:min-h-[150px] mb-4 
                        border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all
                        placeholder:text-gray-500 text-sm sm:text-base resize-none shadow-inner"
                    />
                    <div className="absolute top-3 right-3 bg-gray-800/80 rounded-lg p-1.5 text-gray-400">
                      <FaQuestion className="text-sm" />
                    </div>
                  </div>
                  <button
                    onClick={getHelp}
                    disabled={isLoading || !userPrompt.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 
                      disabled:from-gray-700 disabled:to-gray-800 text-white rounded-xl py-3.5 sm:py-4 px-6 
                      transition-all duration-300 font-medium text-sm sm:text-base shadow-lg 
                      disabled:cursor-not-allowed flex items-center justify-center gap-2.5
                      hover:shadow-blue-500/20 hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        답변 생성 중...
                      </>
                    ) : '답변 받기'}
                  </button>
                </motion.div>

                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/40 backdrop-blur rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700/50"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-2"></span>
                      답변 생성 중
                    </h4>
                    <div className="flex justify-center">
                      <LoadingSpinner />
                    </div>
                  </motion.div>
                )}

                {!isLoading && suggestion && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/40 backdrop-blur rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700/50"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full mr-2"></span>
                      답변
                    </h4>
                    <div className="bg-gray-900/50 rounded-xl p-4 shadow-inner">
                      <p className="text-gray-200 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{suggestion}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
