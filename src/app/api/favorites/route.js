import { NextResponse } from 'next/server'
import { isDev } from '@/lib/utils/isDev'
import {
	addFavoriteData,
	deleteFavoriteData,
	getFavoritesIdsData
} from '@/services/server/favoritesData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		const data = await getFavoritesIdsData(userId)

		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('GET all favorites ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		const { userId, productId, category } = await request.json()

		const data = await addFavoriteData(userId, productId, category)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('ADD favorite ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function DELETE(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')
		const productId = searchParams.get('productId')

		if (!userId || !productId) {
			return NextResponse.json({ error: 'Missing params' }, { status: 400 })
		}
		const data = await deleteFavoriteData(userId, productId)
		return NextResponse.json({ deletedCount: data.deletedCount })
	} catch (error) {
		if (isDev()) {
			console.error('DELETE favorite ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
