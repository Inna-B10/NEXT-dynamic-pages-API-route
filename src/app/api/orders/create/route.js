import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import { createNewOrderData } from '@/services/server/ordersData.service'

export async function POST(req) {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.error('Unauthorized! Missing userId')
		return new Response('Unauthorized', { status: 401 })
	}

	try {
		const { items, totalPrice, address } = await req.json()

		if (!items?.length || !address || !totalPrice) {
			return NextResponse.json({ error: 'Missing params' }, { status: 400 })
		}

		const data = await createNewOrderData(userId, items, totalPrice, address)
		return NextResponse.json({ data })
	} catch (error) {
		if (isDev()) {
			console.error('Create new order ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
