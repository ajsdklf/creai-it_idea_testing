// app/api/result_update/route.ts

import { NextRequest } from 'next/server';
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
  team_execution: {
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

export async function POST(req: NextRequest) {
  try {
    console.log('Starting request handling...');
    const body = await req.json();
    console.log('Received body:', body);

    if (!body) {
      return new Response(JSON.stringify({ error: 'Request body is missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.userName) {
      return new Response(JSON.stringify({ error: 'userName is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { userName, messages, analysis, vcAnalysis, userData } = body;
    console.log('Processing data for user:', userName);

    try {
      const existingData = await redis.get(userName);
      console.log('Existing Redis data:', existingData);

      const storedData: StoredData = existingData 
        ? JSON.parse(existingData)
        : { messages: [] };

      if (messages?.length) {
        storedData.messages = storedData.messages?.length 
          ? [...storedData.messages, ...messages]
          : messages;
      }

      if (analysis) {
        storedData.analysis = {
          ...storedData.analysis,
          ...analysis
        };
      }

      if (vcAnalysis) {
        storedData.vcAnalysis = {
          ...storedData.vcAnalysis,
          ...vcAnalysis
        };
      }

      if (userData?.email || userData?.phone) {
        storedData.userData = {
          ...storedData.userData,
          email: userData.email,
          phone: userData.phone,
        };
      }

      console.log('Saving data to Redis:', storedData);
      await redis.set(userName, JSON.stringify(storedData));
      console.log('Successfully saved to Redis');

      return new Response(JSON.stringify({ success: true, data: storedData }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (redisError) {
      console.error('Redis operation failed:', redisError);
      throw redisError;
    }
  } catch (error) {
    console.error('Handler error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to update result',
      details: (error as Error).message,
      name: (error as Error).name
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}