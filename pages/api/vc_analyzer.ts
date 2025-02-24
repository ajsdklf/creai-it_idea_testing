import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';  

interface AnalysisInput {
  idea: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  target_customer: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  value_proposition: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  etc: {
    content: string;
    provided: "true" | "false" | "partial";
  };
}

export default async function handler(request: NextRequest) {
  try {
    const { analysisInput }: { analysisInput: AnalysisInput } = await request.json();
    
    // Ensure etc field exists with default values
    const normalizedInput = {
      ...analysisInput,
      etc: analysisInput.etc || {
        content: '',
        provided: "false"
      }
    };

    console.log(normalizedInput);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an experienced Venture Capitalist analyzing startup ideas. 
          Consider the completeness of each input (true/partial/false) when analyzing.
          Adjust scoring based on information completeness.
          
          Categories and max scores (total 100):
          - Market Opportunity (25 points): Market size, growth potential, timing
          - Product/Solution (20 points): Innovation, technical feasibility, competitive advantage
          - Business Model (20 points): Revenue model, scalability, unit economics
          - Competition & Differentiation (15 points): Competitive landscape, barriers to entry, unique value prop
          - Team & Execution (10 points): Required capabilities, resource planning
          - Investment Potential (10 points): Risk factors, potential returns, funding requirements

          Analyze based on these provided inputs:
          - Idea: The core business idea or concept
          - Target Customer: The specific customer segment being targeted
          - Value Proposition: The unique value being offered to customers
          - Additional Information: Any other relevant details provided
          
          Your response should be in Korean and be formatted in following JSON format:
          {
            "analysis": {
              "market_opportunity": {
                "score": 0-25,
                "feedback": "Detailed feedback on market size, growth potential, timing"
              },
              "product_solution": {
                "score": 0-20,
                "feedback": "Detailed feedback on innovation, technical feasibility, competitive advantage"
              },
              "business_model": {
                "score": 0-20,
                "feedback": "Detailed feedback on revenue model, scalability, unit economics"
              },
              "competition_differentiation": {
                "score": 0-15,
                "feedback": "Detailed feedback on competitive landscape, barriers to entry, unique value prop"
              },
              "team_execution": {
                "score": 0-10,
                "feedback": "Detailed feedback on required capabilities, resource planning"
              },
              "investment_potential": {
                "score": 0-10,
                "feedback": "Detailed feedback on risk factors, potential returns, funding requirements"
              },
              "total_score": 0-100,
              "summary": "Overall evaluation and recommendations for the startup"
            }
          }`
        },
        {
          role: "user",
          content: `아이디어 (${normalizedInput.idea.provided}): ${normalizedInput.idea.content}
타겟 고객 (${normalizedInput.target_customer.provided}): ${normalizedInput.target_customer.content}
가치 제안 (${normalizedInput.value_proposition.provided}): ${normalizedInput.value_proposition.content}
기타 정보 (${normalizedInput.etc.provided}): ${normalizedInput.etc.content || '없음'}`
        }
      ],
      max_tokens: 3000,
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    const analysis = result.analysis || '분석을 완료하지 못했습니다.';
    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('VC Analysis error:', error);
    return NextResponse.json(
      { error: '아이디어 VC 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
