import { NextResponse } from 'next/server'
import { getCameraDataById } from '@/services/server/camerasData.service'

export async function GET(req, { params }) {
	const param = await params
	const id = param.id

	try {
		const data = await getCameraDataById(id)
		return NextResponse.json({ data })
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 })
	}
}
