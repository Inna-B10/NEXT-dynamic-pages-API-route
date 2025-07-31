import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import {
	addCartItemData,
	deleteCartItemData,
	getCartItemsIdsData
} from '@/services/server/cartData.service'

export async function GET() {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.error('Unauthorized! Missing userId')
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	try {
		const data = await getCartItemsIdsData(userId)

		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('GET cart items ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.error('Unauthorized! Missing userId')
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	try {
		const { productId, category } = await request.json()
		if (!productId || !category) {
			if (isDev()) console.error('Missing params')
			return NextResponse.json({ error: 'Missing params' }, { status: 400 })
		}

		const data = await addCartItemData(userId, productId, category)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('ADD cart item ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function DELETE() {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.error('Unauthorized! Missing userId')
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	try {
		const { searchParams } = new URL(request.url)
		const productId = searchParams.get('productId')

		if (!productId) {
			if (isDev()) console.error('Missing productId')
			return NextResponse.json({ error: 'Missing params' }, { status: 400 })
		}
		const data = await deleteCartItemData(userId, productId)
		return NextResponse.json({ deletedCount: data.deletedCount })
	} catch (error) {
		if (isDev()) {
			console.error('DELETE cart item ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
