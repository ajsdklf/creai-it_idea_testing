'use client';

import React from 'react';

interface SummarySectionProps {
  totalScore: number;
  summary: string;
}

export default function SummarySection({ totalScore, summary }: SummarySectionProps) {
  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
        <span className="mr-2">종합 평가</span>
        <div className="h-px flex-grow bg-blue-400/30"></div>
      </h2>
      <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <span className="text-2xl font-bold text-white">총점</span>
          <div className="flex items-center">
            <div className={`text-4xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}
            </div>
            <span className="text-xl text-gray-400 ml-1">/100</span>
          </div>
        </div>
        <div className="h-px w-full bg-gray-700/50 mb-6"></div>
        <p className="text-gray-200 whitespace-pre-line text-sm leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}