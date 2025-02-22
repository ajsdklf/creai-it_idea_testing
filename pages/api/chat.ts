import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export default async function handler(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const completion = await openai.createChatCompletion({
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

    const result = await completion.json();
    const aiResponse = result.choices[0].message;
    return NextResponse.json(aiResponse);

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { role: 'assistant', content: '죄송합니다. 응답 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}