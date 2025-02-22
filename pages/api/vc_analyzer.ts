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
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an experienced Venture Capitalist. Analyze the given business idea and provide a detailed evaluation in Korean. Focus on: 1) Market size and potential 2) Business model viability 3) Competition analysis 4) Investment recommendation"
        },
        {
          role: "user",
          content: userIdea
        }
      ],
      max_tokens: 500
    });

    const analysis = completion.choices[0].message.content || '분석을 완료하지 못했습니다.';
    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('VC Analysis error:', error);
    return NextResponse.json(
      { error: '아이디어 VC 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
