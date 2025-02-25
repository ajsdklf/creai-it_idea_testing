// app/components/UsageGuidePopup.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaTimes, FaQuestionCircle, FaBrain, FaLightbulb, FaUsers, FaDesktop, FaChevronRight } from 'react-icons/fa';

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
        className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 md:p-8 w-[95%] md:w-[650px] mx-auto text-white border border-gray-700/50 shadow-2xl overflow-y-auto max-h-[85vh] md:max-h-[80vh]"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px 5px rgba(79, 70, 229, 0.15)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform bg-gray-800/50 p-2 rounded-full"
          >
            <FaTimes size={20} />
          </button>

          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 md:p-3.5 rounded-full shadow-lg">
              <FaQuestionCircle className="text-xl md:text-2xl text-white" />
            </div>
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text leading-tight">
              AI+IT 스타트업 분석 가이드
            </h2>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-4 md:p-6 rounded-xl border border-blue-700/20"
            >
              <div className="bg-blue-500/20 p-2.5 rounded-full mt-0.5 flex-shrink-0">
                <FaDesktop className="text-blue-300 text-lg" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-2 flex items-center">
                  최적의 사용 환경
                  <FaChevronRight className="ml-2 text-blue-400/50 text-xs" />
                </h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  더 나은 아이디어 발전과 분석을 위해 데스크톱/노트북 환경에서의 사용을 권장드립니다. 
                  모바일에서도 이용 가능하지만, PC에서 더 편리한 경험을 제공해드릴 수 있습니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 bg-gradient-to-br from-indigo-900/20 to-indigo-800/5 p-4 md:p-6 rounded-xl border border-indigo-700/20"
            >
              <div className="bg-indigo-500/20 p-2.5 rounded-full mt-0.5 flex-shrink-0">
                <FaBrain className="text-indigo-300 text-lg" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-indigo-300 mb-2 flex items-center">
                  아이디어 발전하기
                  <FaChevronRight className="ml-2 text-indigo-400/50 text-xs" />
                </h3>
                <p className="text-sm md:text-base text-gray-200 mb-3 leading-relaxed">
                  AI와의 대화를 통해 아이디어를 구체화할 수 있습니다. 다음 요소들을 중심으로 설명해주세요:
                </p>
                <ul className="list-none space-y-2 text-sm md:text-base text-gray-300">
                  {[
                    '아이디어 설명: 무엇을 만들고 싶으신가요?',
                    '타겟 고객: 누구를 위한 서비스인가요?',
                    '가치 제안: 어떤 문제를 해결하나요?',
                    '기타: 기타 정보가 있으시다면 입력해주세요. (기술적 가능성, 시장 진입 전략, 등등 뭐든 상관 없습니다.)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-5 h-5 bg-indigo-500/20 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-xs text-indigo-300 mt-0.5">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 bg-gradient-to-br from-amber-900/20 to-amber-800/5 p-4 md:p-6 rounded-xl border border-amber-700/20"
            >
              <div className="bg-amber-500/20 p-2.5 rounded-full mt-0.5 flex-shrink-0">
                <FaLightbulb className="text-amber-300 text-lg" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-amber-300 mb-2 flex items-center">
                  도움말 기능 활용하기
                  <FaChevronRight className="ml-2 text-amber-400/50 text-xs" />
                </h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  화면 오른쪽의 도움말 버튼을 클릭하면 현재 진행 상황을 확인하고, 
                  AI에게 구체적인 질문을 할 수 있습니다. 막히는 부분이 있다면 언제든 도움을 요청하세요.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 bg-gradient-to-br from-purple-900/20 to-purple-800/5 p-4 md:p-6 rounded-xl border border-purple-700/20"
            >
              <div className="bg-purple-500/20 p-2.5 rounded-full mt-0.5 flex-shrink-0">
                <FaRocket className="text-purple-300 text-lg" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 flex items-center">
                  VC 관점의 분석받기
                  <FaChevronRight className="ml-2 text-purple-400/50 text-xs" />
                </h3>
                <p className="text-sm md:text-base text-gray-200 mb-3 leading-relaxed">
                  아이디어가 충분히 구체화되었다면, VC 관점에서 다음 항목들을 분석받을 수 있습니다:
                </p>
                <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-2 text-sm md:text-base text-gray-300">
                  {[
                    '시장 규모와 성장 가능성',
                    '비즈니스 모델의 실현 가능성',
                    '경쟁사 분석',
                    '투자 추천 의견'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-900/30 to-green-800/10 p-5 md:p-6 rounded-xl border border-green-700/30 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500/20 p-2.5 rounded-full flex-shrink-0">
                  <FaUsers className="text-green-300 text-lg" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-green-300 flex items-center">
                  시작하기 전에
                  <FaChevronRight className="ml-2 text-green-400/50 text-xs" />
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                구체적인 아이디어가 없으시더라도 걱정하지 마세요. 관심 있는 분야나 기술에 대해 
                이야기하시면, AI가 아이디어 발굴부터 구체화까지 단계적으로 도와드립니다.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center md:justify-end mt-8 md:mt-10"
          >
            <button
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-700 rounded-xl font-semibold text-base text-white transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              onClick={onClose}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
              <span className="relative">시작하기</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}