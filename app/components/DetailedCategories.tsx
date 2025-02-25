'use client';

import React from 'react';
import CategoryCard from './CategoryCard';
import { VCAnalysisResult } from '@/app/types/analysis';

interface DetailedCategoriesProps {
  result: VCAnalysisResult;
}

export default function DetailedCategories({ result }: DetailedCategoriesProps) {
  const categoryInfoMap = {
    market_opportunity: { 
      name: '시장 기회', 
      maxScore: 25,
      icon: '📈'
    },
    product_solution: { 
      name: '제품/솔루션', 
      maxScore: 20,
      icon: '🛠️'
    },
    business_model: { 
      name: '비즈니스 모델', 
      maxScore: 20,
      icon: '💼'
    },
    competition_differentiation: { 
      name: '경쟁력/차별화', 
      maxScore: 15,
      icon: '🏆'
    },
    team_execution: { 
      name: '팀/실행력', 
      maxScore: 10,
      icon: '👥'
    },
    investment_potential: { 
      name: '투자 잠재력', 
      maxScore: 10,
      icon: '💰'
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 md:p-4">
      {Object.entries(result).map(([key, value], index) => {
        if (key === 'total_score' || key === 'summary') return null;
        
        const categoryInfo = categoryInfoMap[key as keyof typeof categoryInfoMap];
        if (!categoryInfo) return null;

        return (
          <div key={key} className="h-full">
            <CategoryCard
              name={categoryInfo.name}
              score={value.score}
              maxScore={categoryInfo.maxScore}
              feedback={value.feedback}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}