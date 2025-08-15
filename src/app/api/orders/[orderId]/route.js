import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { isDev } from '@/lib/utils/isDev'
import { getOrderByIdData } from '@/services/server/ordersData.service'

export const GET = withAuthHandler(async context => {
	try {
		const { orderId } = await context.params
		const data = await getOrderByIdData(orderId)

		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) console.error('GET order ERROR:', error)

		return NextResponse.json({ error: error.message }, { status: 500 })
	}
})
