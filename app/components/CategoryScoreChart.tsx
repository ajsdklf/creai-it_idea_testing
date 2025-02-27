import React from 'react';
import { motion } from 'framer-motion';

interface CategoryScore {
  [key: string]: number;
}

interface CategoryScoreChartProps {
  scores: CategoryScore;
  labels: Record<string, string>;
  maxScores?: Record<string, number>;
  totalMaxScore?: number;
}

/**
 * CategoryScoreChart - A component to display category scores in a visual bar chart
 */
const CategoryScoreChart: React.FC<CategoryScoreChartProps> = ({ 
  scores,
  labels,
  maxScores = {
    market_opportunity: 35,
    product_solution: 30,
    business_model: 15,
    competition_differentiation: 10,
    investment_potential: 10
  },
  totalMaxScore = 100
}) => {
  // Get score color based on value percentage
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 10; // Normalize to 0-10 scale
    if (percentage >= 9) return 'bg-emerald-500';
    if (percentage >= 7) return 'bg-green-500';
    if (percentage >= 5) return 'bg-yellow-500';
    if (percentage >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getBgColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 10; // Normalize to 0-10 scale
    if (percentage >= 9) return 'bg-emerald-500/20';
    if (percentage >= 7) return 'bg-green-500/20';
    if (percentage >= 5) return 'bg-yellow-500/20';
    if (percentage >= 3) return 'bg-orange-500/20';
    return 'bg-red-500/20';
  };

  const getTextColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 10; // Normalize to 0-10 scale
    if (percentage >= 9) return 'text-emerald-400';
    if (percentage >= 7) return 'text-green-400';
    if (percentage >= 5) return 'text-yellow-400';
    if (percentage >= 3) return 'text-orange-400';
    return 'text-red-400';
  };

  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Sort categories by score (descending)
  const sortedCategories = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

  return (
    <div className="space-y-4">
      {/* Total score progress bar */}
      <div className="space-y-1 mb-4 border-b border-gray-700 pb-4">
        <div className="flex justify-between text-sm">
          <div className="text-gray-300 font-medium">총점</div>
          <div className="font-bold text-white">{totalScore.toFixed(1)} / {totalMaxScore.toFixed(1)}</div>
        </div>
        <div className="relative h-3 w-full rounded-full bg-gray-700/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalScore / totalMaxScore) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full rounded-full bg-blue-500"
          />
        </div>
      </div>

      {sortedCategories.map(([category, score]) => {
        const categoryMaxScore = maxScores[category as keyof typeof maxScores] || 10;
        // Ensure score is within the valid range
        const clampedScore = Math.min(Math.max(score, 0), categoryMaxScore);
        const percentage = (clampedScore / categoryMaxScore) * 100;
        const label = labels[category] || category;
        
        return (
          <div key={category} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="text-gray-300">{label}</div>
              <div className={`font-bold ${getTextColor(clampedScore, categoryMaxScore)}`}>
                {clampedScore.toFixed(1)} / {categoryMaxScore.toFixed(1)}
              </div>
            </div>
            <div className={`relative h-2 w-full rounded-full ${getBgColor(clampedScore, categoryMaxScore)}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-full rounded-full ${getScoreColor(clampedScore, categoryMaxScore)}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryScoreChart; 