import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import { clearCartData } from '@/services/server/cartData.service'

export async function DELETE() {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.error('Unauthorized! Missing userId')
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	try {
		const data = await clearCartData(userId)
		return NextResponse.json({ deletedCount: data.deletedCount })
	} catch (error) {
		if (isDev()) {
			console.error('Clear cart ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
