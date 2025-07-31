import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import { clearFavoritesData } from '@/services/server/favoritesData.service'

export async function DELETE() {
	const { userId } = await auth()

	if (!userId) {
		if (isDev()) console.error('Unauthorized! Missing userId')
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	try {
		const data = await clearFavoritesData(userId)
		return NextResponse.json({ deletedCount: data.deletedCount })
	} catch (error) {
		if (isDev()) {
			console.error('Clear favorites ERROR:', error)
		}
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
