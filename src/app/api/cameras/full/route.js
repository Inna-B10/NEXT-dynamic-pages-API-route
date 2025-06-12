import { NextResponse } from 'next/server'
import { LIMIT } from '@/constants/constants'
import { getFullData } from '@/services/server/camerasData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const limit = parseInt(searchParams.get('limit') || LIMIT)
		const offset = parseInt(searchParams.get('offset') || '0')

		const data = await getFullData()
		const items = data.slice(offset, offset + limit)

		return NextResponse.json({ total: data.length, limit, offset, items })
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 })
	}
}
