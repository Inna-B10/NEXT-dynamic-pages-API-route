import { NextResponse } from 'next/server'
import { LIMIT } from '@/constants/constants'
import { getAllGaming_consolesData } from '@/services/server/gaming_consolesData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const limit = parseInt(searchParams.get('limit') || LIMIT)
		const page = parseInt(searchParams.get('page') || '1')

		const start = (page - 1) * limit
		const end = start + limit

		const data = await getAllGaming_consolesData()

		const items = data.slice(start, end)

		return NextResponse.json({ items, page, totalPages: Math.ceil(data.length / limit) })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
