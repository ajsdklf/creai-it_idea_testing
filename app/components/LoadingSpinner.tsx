// app/components/LoadingSpinner.tsx
import React from 'react';
import { FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] p-4">
      {/* Outer ring */}
      <motion.div 
        className="absolute w-16 h-16 md:w-28 md:h-28 rounded-full border-[3px] md:border-4 border-blue-500/30 shadow-lg shadow-blue-500/10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Middle ring */}
      <motion.div 
        className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full border-[3px] md:border-4 border-purple-500/40 shadow-lg shadow-purple-500/10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Inner ring */}
      <motion.div 
        className="absolute w-10 h-10 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Brain icon */}
      <motion.div 
        className="z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaBrain className="text-2xl md:text-4xl bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md" />
      </motion.div>

      {/* Glowing background effect */}
      <motion.div 
        className="absolute w-20 h-20 md:w-36 md:h-36 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl md:blur-2xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Loading text */}
      <div className="absolute -bottom-1 md:bottom-2 text-sm md:text-base font-medium">
        <motion.span 
          className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading...
        </motion.span>
      </div>
    </div>
  );
}
