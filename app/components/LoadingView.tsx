'use client';

import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingView() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md max-w-md w-full mx-4">
        <div className="mb-4">
          <LoadingSpinner />
        </div>
        
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 w-full">
          <h2 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400">
            <Typewriter
              words={['VC 관점에서 아이디어를 분석중입니다...']}
              loop={1}
              cursor
              cursorStyle="_"
              cursorBlinking
            />
          </h2>
        </div>
      </div>
    </div>
  );
}