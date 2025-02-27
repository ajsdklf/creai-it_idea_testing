import React from 'react';
import { FaStar, FaTrophy, FaMedal, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ScoreDisplayProps {
  score: number;
  type?: 'default' | 'rank' | 'category';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  label?: string;
  animate?: boolean;
}

/**
 * ScoreDisplay - A reusable component for displaying scores in various formats
 * @param score - The score value to display
 * @param type - The type of score (default, rank, or category)
 * @param size - Size of the display (sm, md, lg)
 * @param showIcon - Whether to show an icon
 * @param label - Optional label to display alongside the score
 * @param animate - Whether to animate the score display
 */
const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  type = 'default', 
  size = 'md',
  showIcon = true,
  label,
  animate = false
}) => {
  // Score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-emerald-400';
    if (score >= 7) return 'text-green-400';
    if (score >= 5) return 'text-yellow-400';
    if (score >= 3) return 'text-orange-400';
    return 'text-red-400';
  };

  // Get background color for score pill
  const getScoreBgColor = (score: number) => {
    if (score >= 9) return 'bg-emerald-400/10';
    if (score >= 7) return 'bg-green-400/10';
    if (score >= 5) return 'bg-yellow-400/10';
    if (score >= 3) return 'bg-orange-400/10';
    return 'bg-red-400/10';
  };

  // Get rank icon based on rank
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-yellow-400" />;
      case 2:
        return <FaMedal className="text-gray-400" />;
      case 3:
        return <FaMedal className="text-amber-800" />;
      default:
        return null;
    }
  };

  // Get rank background color
  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400/20 border-yellow-400/50';
      case 2:
        return 'bg-gray-400/20 border-gray-400/50';
      case 3:
        return 'bg-amber-800/20 border-amber-800/50';
      default:
        return 'bg-gray-800/50 border-gray-700/50';
    }
  };

  // Get rank text color
  const getRankTextColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-300';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-amber-700';
      default:
        return 'text-white';
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  // Container classes
  const containerClasses = {
    default: 'inline-flex items-center space-x-1.5',
    rank: 'inline-flex items-center space-x-2',
    category: 'flex items-center justify-between w-full gap-2'
  };

  // Score display component
  const ScoreContent = () => {
    if (type === 'rank') {
      const isTopRank = score <= 3;
      return (
        <div className={`${containerClasses[type]} ${sizeClasses[size]} rounded-full px-3 py-1 ${isTopRank ? getRankBgColor(score) : 'bg-gray-800/50 border border-gray-700/50'} shadow-sm ${isTopRank ? 'border' : ''}`}>
          {showIcon && isTopRank && (
            <span className={`${iconSizeClasses[size]} ${isTopRank ? 'animate-pulse' : ''}`}>
              {getRankIcon(score)}
            </span>
          )}
          <span className={`font-bold ${isTopRank ? getRankTextColor(score) : ''}`}>
            {score}
          </span>
          {label && <span className="text-gray-400 ml-1">({label})</span>}
        </div>
      );
    }

    if (type === 'category') {
      return (
        <div className={`${containerClasses[type]} ${sizeClasses[size]} p-2 rounded-lg bg-gray-800/30 border border-gray-700/50`}>
          <div className="flex items-center gap-2">
            {showIcon && <FaChartLine className="text-gray-400" />}
            {label && <span className="text-gray-300">{label}</span>}
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${getScoreBgColor(score)}`}>
            <span className={`font-bold ${getScoreColor(score)}`}>
              {score.toFixed(1)}
            </span>
            {showIcon && (
              <FaStar className={`text-yellow-400 ${iconSizeClasses[size]}`} />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`${containerClasses[type]} ${sizeClasses[size]} px-2.5 py-1 rounded-full ${getScoreBgColor(score)}`}>
        {label && <span className="text-gray-300 mr-1">{label}:</span>}
        <span className={`font-bold ${getScoreColor(score)}`}>
          {score.toFixed(1)}
        </span>
        {showIcon && (
          <FaStar className={`text-yellow-400 ${iconSizeClasses[size]}`} />
        )}
      </div>
    );
  };

  // Return animated or static version based on animate prop
  return animate ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ScoreContent />
    </motion.div>
  ) : (
    <ScoreContent />
  );
};

export default ScoreDisplay;