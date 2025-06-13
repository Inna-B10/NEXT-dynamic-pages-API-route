import { getConsoleDataById } from '@/services/server/gaming_consolesData.service'

export async function GET(req, { params }) {
	const param = await params
	const id = param.id

	const data = await getConsoleDataById(id)

	if (!data) {
		return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 })
	}
	return new Response(JSON.stringify(data), { status: 200 })
}
