import { NextResponse } from 'next/server'

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const userId = searchParams.get('userId')

		const data = await getAllFavoritesData(userId)

		return NextResponse.json({ items })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
