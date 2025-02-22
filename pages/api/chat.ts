import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export default async function handler(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "You are a helpful assistant that helps users develop their business ideas. Respond in Korean and be constructive and encouraging."
        },
        ...messages
      ],
      max_tokens: 200
    });

    const aiResponse = completion.choices[0].message;
    return NextResponse.json(aiResponse);

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { role: 'assistant', content: '죄송합니다. 응답 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}