import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export default async function handler(request: NextRequest) {
  try {
    const { userIdea } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {
          role: "system",
          content: "You are an expert business analyst. Analyze the given idea and provide a brief evaluation in Korean. Focus on market potential and feasibility."
        },
        {
          role: "user",
          content: userIdea
        }
      ],
      max_tokens: 150
    });

    const verdict = completion.choices[0].message.content || '분석을 완료하지 못했습니다.';
    return NextResponse.json({ verdict });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: '아이디어 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}