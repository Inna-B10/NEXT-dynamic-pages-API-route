import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { clearFavoritesData } from '@/services/server/favoritesData.service'

export const DELETE = withAuthHandler(async (userId, req) => {
	const data = await clearFavoritesData(userId)
	return NextResponse.json({ deletedCount: data.deletedCount })
})
