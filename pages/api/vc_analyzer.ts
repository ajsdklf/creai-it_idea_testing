import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export default async function handler(request: NextRequest) {
  try {
    const { userIdea } = await request.json();

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
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

    const result = await completion.json();
    const analysis = result.choices[0].message.content || '분석을 완료하지 못했습니다.';
    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('VC Analysis error:', error);
    return NextResponse.json(
      { error: '아이디어 VC 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
