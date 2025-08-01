import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api/withAuthHandler'
import { getCartItemsDetailsData } from '@/services/server/cartData.service'

export const GET = withAuthHandler(async (userId, req) => {
	const data = await getCartItemsDetailsData(userId)
	return NextResponse.json({ data })
})
