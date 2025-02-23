// app/components/LoadingSpinner.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

export default function LoadingSpinner() {
  return (
    <div className="relative flex items-center justify-center min-h-[160px] md:min-h-[200px] p-4">
      {/* Outer spinning ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute w-14 h-14 md:w-24 md:h-24 rounded-full border-[3px] md:border-4 border-blue-500/20"
      />
      
      {/* Inner spinning ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute w-10 h-10 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent"
      />

      {/* Pulsing brain icon */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="z-10"
      >
        <FaBrain className="text-xl md:text-4xl text-blue-400" />
      </motion.div>

      {/* Glowing background effect */}
      <div className="absolute w-16 h-16 md:w-32 md:h-32 bg-blue-500/10 rounded-full blur-lg md:blur-xl animate-pulse" />
      
      {/* Loading text */}
      <div className="absolute -bottom-2 md:bottom-0 text-sm md:text-base text-gray-400 animate-pulse">
        Loading...
      </div>
    </div>
  );
}
