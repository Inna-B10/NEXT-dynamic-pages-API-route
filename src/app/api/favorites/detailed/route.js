import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import { getDetailedFavoritesData } from '@/services/server/favoritesData.service'

export async function GET() {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.warn('Favorites API: Missing userId — probably early call')
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const data = await getDetailedFavoritesData(userId)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('Error fetching detailed favorites:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
