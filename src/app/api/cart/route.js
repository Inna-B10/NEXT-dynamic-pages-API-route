import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import {
	addCartItemData,
	deleteCartItemData,
	getCartItemsIdsData
} from '@/services/server/cartData.service'

export const GET = withAuthHandler(async (userId, req) => {
	const data = await getCartItemsIdsData(userId)
	return NextResponse.json({ data })
})

export const POST = withAuthHandler(async (userId, req) => {
	const { productId, category } = await req.json()

	if (!productId || !category) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}

	const data = await addCartItemData(userId, productId, category)
	return NextResponse.json({ data })
})

export const DELETE = withAuthHandler(async (userId, req) => {
	const { searchParams } = new URL(req.url)
	const productId = searchParams.get('productId')

	if (!productId) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}

	const data = await deleteCartItemData(userId, productId)
	return NextResponse.json({ deletedCount: data.deletedCount })
})
