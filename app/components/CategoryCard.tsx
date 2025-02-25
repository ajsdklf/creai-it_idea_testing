'use client';

import React from 'react';
import { FaStar } from 'react-icons/fa';

interface CategoryCardProps {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
  index: number;
}

export default function CategoryCard({ name, score, maxScore, feedback, index }: CategoryCardProps) {
  console.log(name, score, maxScore, feedback, index);
  // Calculate percentage for progress bar
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-blue-400";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  // Ensure percentage is a valid number between 0 and 100
  const safePercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage));

  return (
    <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaStar className="text-yellow-500 text-sm" />
          {name}
        </h3>
        <div className="flex flex-col items-end">
          <span className={`text-xl font-bold ${getScoreColor()}`}>
            {score}/{maxScore}
          </span>
          <span className="text-xs text-gray-400 mt-1">
            {Math.round(safePercentage)}% 달성
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
        <div 
          style={{ width: `${safePercentage}%` }}
          className={`h-full rounded-full ${
            safePercentage >= 80 ? "bg-green-500" :
            safePercentage >= 60 ? "bg-blue-500" :
            safePercentage >= 40 ? "bg-yellow-500" :
            "bg-red-500"
          }`}
        />
      </div>
      
      <div className="bg-gray-700 p-3 rounded-lg">
        <p className="text-gray-300 text-sm leading-relaxed">{feedback}</p>
      </div>
    </div>
  );
}