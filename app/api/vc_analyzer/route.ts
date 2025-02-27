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

export async function POST(request: NextRequest) {
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
          - Market Opportunity (35 points): Market size, growth potential, timing
          - Product/Solution (30 points): Innovation, technical feasibility, competitive advantage
          - Business Model (15 points): Revenue model, scalability, unit economics
          - Competition & Differentiation (10 points): Competitive landscape, barriers to entry, unique value prop
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
                "feedback": "시장 규모, 성장 잠재력, 시장 진입 타이밍, TAM/SAM/SOM 분석에 대한 전문적 평가"
              },
              "product_solution": {
                "score": 0-25,
                "feedback": "제품 혁신성, 기술적 실현 가능성, 경쟁 우위, 독창성(originality)에 대한 심층 분석"
              },
              "business_model": {
                "score": 0-20,
                "feedback": "수익 모델의 지속가능성, 확장성, 단위 경제성, 수익화 전략에 대한 평가"
              },
              "originality": {
                "score": 0-15,
                "feedback": "독창성(originality)에 대한 심층 분석"
              },
              "investment_potential": {
                "score": 0-15,
                "feedback": "투자 리스크 요소, 예상 수익률, 자금 조달 요건, 출구 전략에 대한 VC 관점의 평가"
              },
              "total_score": 0-100,
              "summary": "종합 평가 및 스타트업을 위한 전략적 제언"
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
