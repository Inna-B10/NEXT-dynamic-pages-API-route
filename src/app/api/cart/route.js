import { NextResponse } from 'next/server'
import {
	addCartItemData,
	deleteCartItemData,
	getAllCartItemsData
} from '@/services/server/cartData.service'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		const data = await getAllCartItemsData(userId)

		return NextResponse.json({ data })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		const { userId, productId } = await request.json()

		const data = await addCartItemData(userId, productId)
		return NextResponse.json({ data })
	} catch (error) {
		if (env.NODE_ENV === 'development') {
			console.error('Toggle cart item ERROR:', error)
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
		const data = await deleteCartItemData(userId, productId)
		return NextResponse.json({ deletedCount: data.deletedCount })
	} catch (error) {
		if (env.NODE_ENV === 'development') {
			console.error('DELETE CART ITEM ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
