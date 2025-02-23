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
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that analyzes business ideas. For each user message, analyze if it contains these key elements:
          1. Clear idea description
          2. Target customer definition
          3. Value proposition
          
          Respond in Korean and format your response in JSON with the following structure:
          {
            "analysis": {
              "idea": {"content": string(what user provided as idea), "provided": boolean, "feedback": string(if user already provided idea, return null. Else, return constructive feedback to help user come up with better idea) | null},
              "target_customer": {"content": string(what user provided as target_customer), "provided": boolean, "feedback": string(if user didn't provide idea yet or have already provided target_customer, return null. Else, return constructive feedback to help user come up with better target_customer) | null},
              "value_proposition": {"content": string(what user provided as value_proposition), "provided": boolean, "feedback": string(if user didn't provide idea yet or have already provided value_proposition, return null. Else, return constructive feedback to help user come up with better value_proposition) | null}
            },
            "message": string
          }`
        },
        ...messages
      ],
      response_format: { type: "json_object" },
      max_tokens: 500
    });

    return NextResponse.json(completion.choices[0].message.content);

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { 
        analysis: null,
        message: '죄송합니다. 응답 생성 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}