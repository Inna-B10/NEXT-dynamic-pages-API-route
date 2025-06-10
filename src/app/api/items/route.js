import { NextResponse } from 'next/server'
import { getAllItemsData } from '@/services/server/itemDataService'

export async function GET() {
	try {
		const data = await getAllItemsData()
		return NextResponse.json({ data })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
