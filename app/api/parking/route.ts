import { createParking } from '@/lib/services/parking.service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);

    if (!body.title || !body.spots || !body.status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parking = await createParking(body);
    return NextResponse.json(parking);
  } catch (error) {
    console.error('Error in POST /api/parking:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
