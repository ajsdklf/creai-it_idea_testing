import { NextRequest, NextResponse } from 'next/server';
import redis from "../../../lib/redis";

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    try {
      const { userName } = await request.json();
      const messages = await redis.get(userName);
      return NextResponse.json({ messages });
    } catch (error) {
      console.error('Redis get error:', error);
      return NextResponse.json(
        { error: 'Failed to get messages' },
        { status: 500 }
      );
    }
  }
} 