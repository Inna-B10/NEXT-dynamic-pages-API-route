import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import { getCartItemsDetailsData } from '@/services/server/cartData.service'

export async function GET() {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.warn('Cart API: Missing userId — probably early call')
		return NextResponse.json({ data: [] })
	}

	try {
		const data = await getCartItemsDetailsData(userId)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('Error fetching detailed shopping cart:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
