import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api/withAuthHandler'
import { getLastOrderAddressData } from '@/services/server/ordersData.service'

export const GET = withAuthHandler(async (userId, req) => {
	const data = await getLastOrderAddressData(userId)
	return NextResponse.json({ data })
})
