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
          content: `You are an expert business consultant analyzing startup ideas. For each user message, carefully analyze if it contains these key elements:

          1. Clear idea description - The core business concept and what problem it solves
          2. Target customer definition - Specific customer segments and their characteristics
          3. Value proposition - Clear benefits and unique value offered to customers

          Guidelines for analysis:
          - Extract relevant information even if not explicitly stated
          - Look for implicit mentions of each element
          - Consider the business context and market implications
          - Be encouraging but thorough in feedback
          - If user wants to chitchat, kindly guide them back to the main topic. be careful not to be too verbose.
          
          Respond in Korean and format your response in JSON with the following structure:
          {
            "analysis": {
              "idea": {
                "content": string(extracted idea description, even if partial),
                "provided": boolean(true if clear idea description found),
                "feedback": string(if idea missing/unclear, provide specific questions and guidance to develop it. Return null if already clear) | null
              },
              "target_customer": {
                "content": string(extracted target customer info),
                "provided": boolean(true if clear target definition found),
                "feedback": string(if idea provided but target unclear, guide user to define specific customer segments. Return null if already clear or no idea yet) | null
              },
              "value_proposition": {
                "content": string(extracted value proposition),
                "provided": boolean(true if clear value prop found),
                "feedback": string(if idea provided but value prop unclear, help user articulate unique benefits. Return null if already clear or no idea yet) | null
              }
            },
            "message": string(encouraging response focused on most important next step. if user wants to chitchat, kindly guide them back to the main topic. be careful not to be too verbose.)
          }`
        },
        ...messages
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
      temperature: 0
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