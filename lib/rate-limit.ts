import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store för att hålla koll på requests
const store: RateLimitStore = {};

// Konstanter för rate limiting
const WINDOW_MS = 60 * 1000; // 1 minut
const MAX_REQUESTS = 5; // Max 5 requests per minut

export async function rateLimit(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';
  const now = Date.now();

  // Återställ räknaren om tidsfönstret har gått ut
  if (store[ip] && now > store[ip].resetTime) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
  }

  // Initiera eller uppdatera räknaren
  if (!store[ip]) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
  }

  // Öka räknaren
  store[ip].count++;

  // Kontrollera om gränsen har överskridits
  if (store[ip].count > MAX_REQUESTS) {
    return NextResponse.json(
      { message: 'För många förfrågningar. Försök igen senare.' },
      { status: 429 }
    );
  }

  return null;
} 