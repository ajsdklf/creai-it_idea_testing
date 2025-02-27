'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaChartLine, FaArrowUp, FaArrowDown, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import ScoreDisplay from '../components/ScoreDisplay';
import CategoryScoreChart from '../components/CategoryScoreChart';

interface CategoryScore {
  [key: string]: number;
}

interface LeaderboardEntry {
  userName: string;
  totalScore: number;
  ideaName: string;
  categoryScores: CategoryScore;
  rank: number;
}

const categoryLabels: Record<string, string> = {
  market_opportunity: '시장 기회',
  product_solution: '제품 솔루션',
  business_model: '비즈니스 모델',
  originality: '독창성',
  investment_potential: '투자 잠재력',
};

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('totalScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null);
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/leaderboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        
        const data = await response.json();
        setEntries(data.entries || []);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching leaderboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, []);

  const handleSort = (category: string) => {
    if (sortBy === category) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(category);
      setSortDirection('desc');
    }
  };

  const sortedEntries = [...entries].sort((a, b) => {
    let valueA, valueB;
    
    if (sortBy === 'totalScore') {
      valueA = a.totalScore;
      valueB = b.totalScore;
    } else if (sortBy === 'rank') {
      valueA = a.rank;
      valueB = b.rank;
    } else if (sortBy === 'ideaName') {
      valueA = a.ideaName.toLowerCase();
      valueB = b.ideaName.toLowerCase();
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      valueA = a.categoryScores[sortBy] || 0;
      valueB = b.categoryScores[sortBy] || 0;
    }
    
    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  });

  const getSortIcon = (category: string) => {
    if (sortBy !== category) return null;
    return sortDirection === 'asc' ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />;
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-blue-500/30 rounded-full blur-3xl -top-[25vw] -left-[25vw] animate-pulse-slow"></div>
        <div className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-purple-500/30 rounded-full blur-3xl -bottom-[25vw] -right-[25vw] animate-pulse-slow-delayed"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Title */}
        <motion.div
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-12 lg:mb-16 relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <FaAward className="text-5xl lg:text-7xl text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-150 blur-xl animate-pulse-slow"></div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500">
            아이디어 리더보드
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto"
          >
            최고의 아이디어들이 평가받은 순위를 확인하세요
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="w-full max-w-5xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300 text-lg">데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="text-center py-32">
              <div className="text-red-400 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl text-red-400 mb-4">오류가 발생했습니다</h3>
              <p className="text-gray-300">{error}</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-gray-400 text-5xl mb-4">📊</div>
              <h3 className="text-xl text-gray-300 mb-4">아직 데이터가 없습니다</h3>
              <p className="text-gray-400">리더보드에 표시할 항목이 없습니다.</p>
              <Link href="/" className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-full font-medium">
                아이디어 제출하기
              </Link>
            </div>
          ) : (
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.3)] overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center flex-wrap gap-3">
                <h2 className="text-xl font-bold text-white">
                  총 {entries.length}개의 아이디어
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSort('totalScore')}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      sortBy === 'totalScore' ? 'bg-blue-500/30 text-blue-300' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FaChartLine className="mr-1.5" />
                    총점 {getSortIcon('totalScore')}
                  </button>
                  <button
                    onClick={() => handleSort('rank')}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      sortBy === 'rank' ? 'bg-blue-500/30 text-blue-300' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <FaAward className="mr-1.5" />
                    랭킹 {getSortIcon('rank')}
                  </button>
                </div>
              </div>
              
              {/* Table Header */}
              <div className="grid grid-cols-12 bg-white/5 border-b border-white/10 text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <div className="col-span-1 py-3 px-4">#</div>
                <div className="col-span-3 py-3 px-4 cursor-pointer flex items-center" onClick={() => handleSort('ideaName')}>
                  아이디어 {getSortIcon('ideaName')}
                </div>
                <div className="col-span-6 py-3 px-4 grid grid-cols-6 gap-1">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <div 
                      key={key} 
                      className="text-center cursor-pointer flex flex-col items-center justify-center"
                      onClick={() => handleSort(key)}
                      onMouseEnter={() => setHighlightCategory(key)}
                      onMouseLeave={() => setHighlightCategory(null)}
                    >
                      <div className="truncate max-w-[80px]">{label}</div>
                      {getSortIcon(key)}
                    </div>
                  ))}
                </div>
                <div 
                  className="col-span-2 py-3 px-4 text-center cursor-pointer flex items-center justify-center"
                  onClick={() => handleSort('totalScore')}
                >
                  총점 {getSortIcon('totalScore')}
                </div>
              </div>
              
              {/* Table Body */}
              <div className="max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                  {sortedEntries.map((entry, index) => (
                    <motion.div
                      key={entry.userName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`grid grid-cols-12 border-b border-white/5 text-gray-200 cursor-pointer hover:bg-white/10 transition-colors ${
                        selectedEntry?.userName === entry.userName ? 'bg-blue-500/10' : 'bg-transparent'
                      }`}
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <div className="col-span-1 py-4 px-4 flex items-center justify-center">
                        <ScoreDisplay score={entry.rank} type="rank" size="lg" />
                      </div>
                      <div className="col-span-3 py-4 px-4 font-medium">
                        <div className="truncate">{entry.ideaName}</div>
                        <div className="text-xs text-gray-400 mt-1 truncate">{entry.userName}</div>
                      </div>
                      <div className="col-span-6 py-4 px-4 grid grid-cols-6 gap-1">
                        {Object.entries(categoryLabels).map(([key]) => (
                          <div 
                            key={key} 
                            className={`text-center ${
                              highlightCategory === key ? 'scale-110 transition-transform' : ''
                            }`}
                          >
                            <ScoreDisplay score={entry.categoryScores[key] || 0} type="default" size="sm" showIcon={false} />
                          </div>
                        ))}
                      </div>
                      <div className="col-span-2 py-4 px-4 flex justify-center items-center">
                        <ScoreDisplay score={entry.totalScore} type="default" size="lg" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
          
          {/* Detail Panel */}
          <AnimatePresence>
            {selectedEntry && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.3)] p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                        <ScoreDisplay score={selectedEntry.rank} type="rank" size="lg" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{selectedEntry.ideaName}</h3>
                    </div>
                    <p className="text-gray-400">사용자: {selectedEntry.userName}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedEntry(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-gray-400 text-sm">총점</div>
                      <ScoreDisplay score={selectedEntry.totalScore} size="lg" />
                    </div>
                    <FaStar className="text-yellow-400 text-4xl" />
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-gray-400 text-sm">랭킹</div>
                      <ScoreDisplay score={selectedEntry.rank} type="rank" size="lg" />
                    </div>
                    <FaAward className="text-yellow-400 text-4xl" />
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-2">최고 점수 카테고리</div>
                    {Object.entries(selectedEntry.categoryScores)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 1)
                      .map(([key, score]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="text-white">{categoryLabels[key]}</div>
                          <ScoreDisplay score={score} showIcon={false} />
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-white font-bold mb-4">카테고리별 점수</h4>
                  <CategoryScoreChart 
                    scores={selectedEntry.categoryScores} 
                    labels={categoryLabels}
                    maxScores={{ 
                      market_opportunity: 25, 
                      product_solution: 25, 
                      business_model: 20, 
                      originality: 15, 
                      investment_potential: 15 
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Footer */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}