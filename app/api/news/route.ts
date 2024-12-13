import { createNews } from '@/lib/services/news.service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const news = await createNews(body.title, body.description, body.date, body.photoImg)
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error in POST /api/news:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

