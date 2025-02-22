// app/components/LoadingSpinner.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

export default function LoadingSpinner() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer spinning ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute w-24 h-24 rounded-full border-4 border-blue-500/20"
      />
      
      {/* Inner spinning ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute w-16 h-16 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent"
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
        <FaBrain className="text-4xl text-blue-400" />
      </motion.div>

      {/* Glowing background effect */}
      <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
    </div>
  );
}
