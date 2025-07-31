import { NextResponse } from 'next/server'
import { isDev } from '@/lib/utils/isDev'
import { clearCartData } from '@/services/server/cartData.service'

export async function DELETE(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		if (!userId) {
			return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
		}
		const data = await clearCartData(userId)
		return NextResponse.json({ deletedCount: data.deletedCount })
	} catch (error) {
		if (isDev()) {
			console.error('Clear cart ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
