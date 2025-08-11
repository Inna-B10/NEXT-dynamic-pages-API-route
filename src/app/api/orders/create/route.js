import { NextResponse } from 'next/server'
import { getUserEmail } from '@/lib/api-helpers/clerk/getUserEmail'
import { withAuthHandler } from '@/lib/api-helpers/withAuthHandler'
import { sendOrderConfirmEmail } from '@/lib/email/sendOrderConfirmEmail'
import { isDev } from '@/lib/utils/isDev'
import { createNewOrderData } from '@/services/server/ordersData.service'

/* ---------------------------- Create New Order ---------------------------- */
export const POST = withAuthHandler(async (userId, req) => {
	const { items, totalPrice, address } = await req.json()

	if (!items?.length || !address || !totalPrice) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 })
	}
	const order = await createNewOrderData(userId, items, totalPrice, address)

	//send confirmation email
	if (order?.insertedId) {
		const toEmail = await getUserEmail(userId)

		if (!toEmail) {
			if (isDev()) console.error('Email not found. Skipping confirmation email.')
		} else {
			sendOrderConfirmEmail({
				toEmail,
				items,
				totalPrice,
				address,
				orderId: order.insertedId
			}).catch(err => {
				//not abort order if email is not sent
				if (isDev()) console.error('Failed to send confirmation email:', err)
			})
		}
	}

	return NextResponse.json({ data: order })
})
