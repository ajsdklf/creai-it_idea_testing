import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

interface WarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export default function WarningPopup({ isOpen, onClose, onProceed }: WarningPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4"
      >
        <div className="flex items-center justify-center text-yellow-500 mb-4">
          <FaExclamationTriangle size={40} />
        </div>
        
        <h3 className="text-xl font-semibold text-white text-center mb-4">
          분석 진행 전 확인해주세요
        </h3>
        
        <p className="text-gray-300 text-center mb-6">
          현재 입력된 정보가 부족하여 분석이 부정확하거나 모호할 수 있습니다. 
          계속 진행하시겠습니까?
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            뒤로가기
          </button>
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            분석 진행하기
          </button>
        </div>
      </motion.div>
    </div>
  );
}