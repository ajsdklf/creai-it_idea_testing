// app/components/WarningPopup.tsx

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

  const handleProceed = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onProceed();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-0"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-yellow-500/10 p-4 rounded-full">
            <FaExclamationTriangle className="text-yellow-500" size={40} />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white text-center mb-4">
          분석 진행 전 확인해주세요
        </h3>
        
        <p className="text-gray-300 text-center mb-8 leading-relaxed">
          현재 입력된 정보가 부족하여 분석이 부정확하거나 모호할 수 있습니다. 
          계속 진행하시겠습니까?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
          >
            뒤로가기
          </button>
          <button
            onClick={handleProceed}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
          >
            분석 진행하기
          </button>
        </div>
      </motion.div>
    </div>
  );
}