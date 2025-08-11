import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { getDetailedFavoritesData } from '@/services/server/favoritesData.service'

/* ------------- Get Details (light mode) Of Products In Favorites ------------ */
export const GET = withAuthHandler(async (userId, req) => {
	const data = await getDetailedFavoritesData(userId)
	return NextResponse.json({ data })
})
