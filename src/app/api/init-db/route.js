import { NextResponse } from 'next/server'
import { initDatabase } from '@/lib/db/init-db'

export async function GET() {
	await initDatabase()
	return NextResponse.json({ status: 'ok' })
}
