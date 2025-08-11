import { NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'

export function withAuthHandler(handler) {
	return async function (req) {
		const { userId } = getAuth(req)

		if (!userId) {
			if (isDev()) console.error('Unauthorized! Missing userId')
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		try {
			return await handler(userId, req)
		} catch (error) {
			if (isDev()) console.error('API ERROR:', error)
			return NextResponse.json({ error: error.message }, { status: 500 })
		}
	}
}
