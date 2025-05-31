import { NextResponse } from 'next/server'
import { getPreviewData } from '@/services/server/cameraDataService'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const limit = parseInt(searchParams.get('limit') || '30')
		const offset = parseInt(searchParams.get('offset') || '0')

		const data = await getPreviewData()
		const items = data.slice(offset, offset + limit)

		return NextResponse.json({ total: data.length, limit, offset, items })
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 })
	}
}
