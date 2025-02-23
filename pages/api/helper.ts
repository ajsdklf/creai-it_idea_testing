import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export default async function handler(request: NextRequest) {
  try {
    const { currentStatus, userPrompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant that provides guidance for developing business ideas.
          
        Your role is to:
        - Give moderate, constructive feedback based on the current status
        - Focus on one key area for improvement at a time
        - Keep responses concise and actionable
        - Be encouraging while pointing out areas that need work
        - Provide specific examples or questions to help users think deeper
        - Always communicate in Korean with a professional but friendly tone`
        },
        {
          role: "user", 
          content: `Current development status:
          ${currentStatus.idea ? '✓' : '•'} 아이디어 설명: ${currentStatus.idea || '미입력'}
          ${currentStatus.target_customer ? '✓' : '•'} 타겟 고객: ${currentStatus.target_customer || '미입력'} 
          ${currentStatus.value_proposition ? '✓' : '•'} 가치 제안: ${currentStatus.value_proposition || '미입력'}

        사용자 질문: ${userPrompt}

        현재 상태를 고려하여 다음 단계를 위한 구체적인 제안을 해주세요. 한 번에 하나의 핵심 영역에 집중하여 실행 가능한 피드백을 제공해주세요.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return NextResponse.json({ 
      suggestion: completion.choices[0].message.content 
    });

  } catch (error) {
    console.error('Helper error:', error);
    return NextResponse.json(
      { error: '도움말을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}