import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api/withAuthHandler'
import { createNewOrderData } from '@/services/server/ordersData.service'

export const POST = withAuthHandler(async (userId, req) => {
	const { items, totalPrice, address } = await req.json()

	if (!items?.length || !address || !totalPrice) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}

	const data = await createNewOrderData(userId, items, totalPrice, address)
	return NextResponse.json({ data })
})
