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
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body) {
      return new Response(JSON.stringify({ error: 'Request body is missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!body.userName || (!body.messages && !body.analysis && !body.vcAnalysis)) {
      return new Response(JSON.stringify({ error: 'userName and at least one of messages, analysis, or vcAnalysis are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { userName, messages, analysis, vcAnalysis } = body;
    const existingData = await redis.get(userName);
    let storedData: StoredData = existingData ? JSON.parse(existingData) : { messages: [] };

    if (messages) {
      storedData.messages = [...storedData.messages, ...messages];
    }
    if (analysis) {
      storedData.analysis = {
        ...storedData.analysis,
        ...analysis
      };
    }
    if (vcAnalysis) {
      storedData.vcAnalysis = vcAnalysis;
    }

    await redis.set(userName, JSON.stringify(storedData));

    return new Response(JSON.stringify({ success: true, data: storedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('[POST /api/result_update] Handler error:', error);
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