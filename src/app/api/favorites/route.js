import { NextResponse } from 'next/server'
import {
	addFavoriteData,
	deleteFavoriteData,
	getAllFavoritesData
} from '@/services/server/favoritesData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		const data = await getAllFavoritesData(userId)

		return NextResponse.json({ data })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		const { userId, productId } = await request.json()

		const data = await addFavoriteData(userId, productId)
		return NextResponse.json({ data })
	} catch (error) {
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
		if (env.NODE_ENV === 'development') {
			console.error('DELETE FAVORITE ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
