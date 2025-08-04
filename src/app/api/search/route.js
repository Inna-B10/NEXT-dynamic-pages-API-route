import { NextResponse } from 'next/server'
import { isDev } from '@/lib/utils/isDev'
import { getDetailedSearchData } from '@/services/server/searchData.service'

export async function GET(req) {
	const { searchParams } = new URL(req.url)
	const query = searchParams.get('query')

	if (!query || query.trim().length < 2) {
		return NextResponse.json({ error: 'Missing or too short query' }, { status: 400 })
	}

	try {
		const data = await getDetailedSearchData(query)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('GET search result ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
