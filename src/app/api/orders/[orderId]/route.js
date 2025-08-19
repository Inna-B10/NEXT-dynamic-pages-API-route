import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { isDev } from '@/lib/utils/isDev'
import { getOrderByIdData } from '@/services/server/ordersData.service'

export const GET = withAuthHandler(async (userId, req, context) => {
	try {
		const { orderId } = await context.params
		const data = await getOrderByIdData(orderId)

		if (!data) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) console.error('API DB or server error:', error)

		return NextResponse.json({ error: error.message }, { status: 500 })
	}
})
