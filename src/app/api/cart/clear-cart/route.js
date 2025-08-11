import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { clearCartData } from '@/services/server/cartData.service'

export const DELETE = withAuthHandler(async (userId, req) => {
	const data = await clearCartData(userId)
	return NextResponse.json({ deletedCount: data.deletedCount })
})
