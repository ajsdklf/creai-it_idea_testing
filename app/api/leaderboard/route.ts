import { NextResponse } from 'next/server';
import redis from '../../../lib/redis';

export const runtime = 'nodejs';

interface VCAnalysisResult {
  market_opportunity: {
    score: number;
    feedback: string;
  };
  product_solution: {
    score: number;
    feedback: string;
  };
  business_model: {
    score: number;
    feedback: string;
  };
  competition_differentiation: {
    score: number;
    feedback: string;
  };
  investment_potential: {
    score: number;
    feedback: string;
  };
  total_score: number;
  summary: string;
}

interface StoredData {
  messages: Array<{ role: string; content: string }>;
  analysis?: {
    idea?: string;
    target_customer?: string;
    value_proposition?: string;
    etc?: string;
  };
  vcAnalysis?: VCAnalysisResult;
  userData?: {
    email?: string;
    phone?: string;
  };
}

interface LeaderboardEntry {
  userName: string;
  totalScore: number;
  ideaName: string;
  categoryScores: {
    [key: string]: number;
  };
  rank?: number;
}

export async function GET() {
  try {
    // Get all keys in the Redis database (representing users)
    const keys = await redis.keys('*');
    
    if (!keys || keys.length === 0) {
      return NextResponse.json({ 
        entries: [],
        message: 'No entries available' 
      });
    }

    const leaderboardEntries: LeaderboardEntry[] = [];

    // Fetch data for each user
    for (const key of keys) {
      const userData = await redis.get(key);
      if (!userData) continue;
      
      try {
        const parsedData: StoredData = JSON.parse(userData);
        
        // Skip entries without VC analysis
        if (!parsedData.vcAnalysis) continue;
        
        // Extract idea name from analysis
        const ideaName = parsedData.analysis?.idea || 'Unnamed Idea';
        
        // Create leaderboard entry
        const entry: LeaderboardEntry = {
          userName: key,
          totalScore: parsedData.vcAnalysis.total_score,
          ideaName: ideaName,
          categoryScores: {
            market_opportunity: parsedData.vcAnalysis.market_opportunity.score,
            product_solution: parsedData.vcAnalysis.product_solution.score,
            business_model: parsedData.vcAnalysis.business_model.score,
            competition_differentiation: parsedData.vcAnalysis.competition_differentiation.score,
            investment_potential: parsedData.vcAnalysis.investment_potential.score,
          }
        };
        
        leaderboardEntries.push(entry);
      } catch (parseError) {
        console.error(`Error parsing data for user ${key}:`, parseError);
        continue;
      }
    }
    
    // Sort entries by total score (descending)
    const sortedEntries = leaderboardEntries
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
    
    return NextResponse.json({ 
      entries: sortedEntries,
      totalCount: sortedEntries.length 
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    );
  }
} 