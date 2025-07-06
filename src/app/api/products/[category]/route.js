import { NextResponse } from 'next/server'
import { LIMIT } from '@/constants/constants'
import { getPreviewProductsData } from '@/services/server/productsData.service'

export async function GET(request, { params }) {
	try {
		const { category } = params

		const { searchParams } = new URL(request.url)
		const limit = parseInt(searchParams.get('limit') || `${LIMIT}`)
		const page = parseInt(searchParams.get('page') || '1')

		const start = (page - 1) * limit
		const end = start + limit

		const data = await getPreviewProductsData(category)
		const items = data.slice(start, end)

		return NextResponse.json({ items })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
