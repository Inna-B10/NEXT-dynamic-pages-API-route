import { NextResponse } from 'next/server'
import { withAuthHandler } from '@/lib/api/withAuthHandler'
import { sendOrderConfirmEmail } from '@/lib/email/sendOrderConfirmEmail'
import { isDev } from '@/lib/utils/isDev'
import { createNewOrderData } from '@/services/server/ordersData.service'

export const POST = withAuthHandler(async (userId, req) => {
	const { items, totalPrice, address } = await req.json()

	if (!items?.length || !address || !totalPrice) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}

	const order = await createNewOrderData(userId, items, totalPrice, address)

	if (order?.insertedId) {
		try {
			await sendOrderConfirmEmail({
				userId,
				items,
				totalPrice,
				address,
				orderId: order.insertedId
			})
		} catch (err) {
			//not abort order if email is not sent
			if (isDev()) {
				console.error('Failed to send confirmation email:', err)
			}
		}
	}

	return NextResponse.json({ data: order })
})
