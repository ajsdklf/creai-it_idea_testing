'use client';

import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface ErrorViewProps {
  errorMessage: string;
}

export default function ErrorView({ errorMessage }: ErrorViewProps) {
  return (
    <div className="bg-red-100 p-6 rounded-lg border border-red-300 shadow-md max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="bg-red-200 p-3 rounded-full">
          <FaExclamationTriangle className="text-2xl text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-red-600 text-center">오류 발생</h1>
      </div>
      
      <div className="bg-white rounded-md p-4 mb-5 border border-red-200">
        <p className="text-gray-700 text-center">{errorMessage}</p>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors duration-200"
        >
          <FaRedo className="text-sm" />
          <span>다시 시도하기</span>
        </button>
      </div>
    </div>
  );
}