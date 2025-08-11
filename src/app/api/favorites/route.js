import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import {
	addFavoriteData,
	deleteFavoriteData,
	getFavoritesIdsData
} from '@/services/server/favoritesData.service'

/* ----------------------------- Get Favorites Ids ---------------------------- */
export const GET = withAuthHandler(async (userId, req) => {
	const data = await getFavoritesIdsData(userId)
	return NextResponse.json({ data })
})

/* ----------------------------- Add Favorite ---------------------------- */
export const POST = withAuthHandler(async (userId, req) => {
	const { productId, category } = await req.json()

	if (!productId || !category) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}

	const data = await addFavoriteData(userId, productId, category)
	return NextResponse.json({ data })
})

/* ----------------------------- Delete Favorite ---------------------------- */
export const DELETE = withAuthHandler(async (userId, req) => {
	const { searchParams } = new URL(req.url)
	const productId = searchParams.get('productId')

	if (!productId) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}

	const data = await deleteFavoriteData(userId, productId)
	return NextResponse.json({ deletedCount: data.deletedCount })
})
