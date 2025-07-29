import { NextResponse } from 'next/server'
import { isDev } from '@/lib/utils/isDev'
import { getDetailedFavoritesData } from '@/services/server/favoritesData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
		}

		const data = await getDetailedFavoritesData(userId)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('Error fetching detailed favorites:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
