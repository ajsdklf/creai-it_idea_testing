'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaTimes, FaSpinner } from 'react-icons/fa';

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
        return "✓";
      case "partial":
        return "!";
      case "false":
        return "✕";
      default:
        return "";
    }
  };

  const getStatusColor = (provided: "true" | "false" | "partial") => {
    switch(provided) {
      case "true":
        return "text-green-400";
      case "partial":
        return "text-yellow-400";
      case "false":
        return "text-red-400";
      default:
        return "text-gray-400";
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
          className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[420px] bg-gray-900 border-l border-gray-700 shadow-2xl z-50"
        >
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400/10 p-2 rounded-lg">
                  <FaLightbulb className="text-xl sm:text-2xl text-yellow-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">도움말</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <FaTimes className="text-xl sm:text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert max-w-none">
                <div className="bg-gray-800/80 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 shadow-lg border border-gray-700/50">
                  <h4 className="text-base sm:text-lg font-medium text-gray-200 mb-4">현재 상태</h4>
                  <ul className="space-y-3 sm:space-y-4">
                    {Object.entries(currentStatus).map(([key, value]) => (
                      <li key={key} className={`flex flex-col gap-2 ${getStatusColor(value.provided)} 
                        bg-gray-800/50 rounded-lg p-3 border border-gray-700/50`}>
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                          {getStatusIcon(value.provided)} {
                            key === 'idea' ? '아이디어 설명' : 
                            key === 'target_customer' ? '타겟 고객' : 
                            key === 'value_proposition' ? '가치 제안' :
                            '추가 정보'
                          }: 
                          <span className="font-medium">
                            {value.provided === "true" ? '완료' : 
                             value.provided === "partial" ? '부분 완료' : '미완료'}
                          </span>
                        </div>
                        {value.content && (
                          <p className="text-sm sm:text-base text-gray-300 ml-4 italic">&ldquo;{value.content}&rdquo;</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 shadow-lg border border-gray-700/50">
                  <h4 className="text-base sm:text-lg font-medium text-gray-200 mb-4">질문하기</h4>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="어떤 도움이 필요하신가요?"
                    className="w-full bg-gray-700/70 text-white rounded-xl p-4 min-h-[120px] sm:min-h-[150px] mb-4 
                      border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all
                      placeholder:text-gray-400 text-sm sm:text-base resize-none"
                  />
                  <button
                    onClick={getHelp}
                    disabled={isLoading || !userPrompt.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                      disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl py-3 sm:py-4 px-6 
                      transition-all duration-200 font-medium text-sm sm:text-base shadow-lg 
                      disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        답변 생성 중...
                      </>
                    ) : '답변 받기'}
                  </button>
                </div>

                {suggestion && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 backdrop-blur rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700/50"
                  >
                    <h4 className="text-base sm:text-lg font-medium text-gray-200 mb-4">답변</h4>
                    <p className="text-gray-200 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{suggestion}</p>
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
