import { createEvent } from '@/lib/services/events.service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Валидация
    if (!body.title || !body.description || !body.date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const event = await createEvent(body);
    return NextResponse.json(event);
  } catch (error) {
    console.error('Error in POST /api/events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
