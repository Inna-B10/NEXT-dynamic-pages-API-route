import { NextResponse } from 'next/server'
import { getAllGaming_consolesData } from '@/services/server/gaming_consolesData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const limit = parseInt(searchParams.get('limit') || '30')
		const offset = parseInt(searchParams.get('offset') || '0')

		const data = await getAllGaming_consolesData()
		const items = data.slice(offset, offset + limit)

		return NextResponse.json({ total: data.length, limit, offset, items })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
