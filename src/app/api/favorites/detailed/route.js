import { NextResponse } from 'next/server'
import { isDev } from '@/lib/utils/isDev'
import { getDetailedFavoritesData } from '@/services/server/favoritesData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			if (isDev()) console.warn('Favorites API: Missing userId — probably early call')
			return NextResponse.json({ data: [] })
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
