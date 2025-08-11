import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { getCartItemsDetailsData } from '@/services/server/cartData.service'

/* ------------- Get Details (light mode) Of Products In Cart ------------ */
export const GET = withAuthHandler(async (userId, req) => {
	const data = await getCartItemsDetailsData(userId)
	return NextResponse.json({ data })
})
