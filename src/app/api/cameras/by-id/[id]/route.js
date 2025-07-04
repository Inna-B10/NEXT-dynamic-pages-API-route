import { getCameraDataById } from '@/services/server/camerasData.service'

export async function GET(req, { params }) {
	const param = await params
	const id = param.id

	const data = await getCameraDataById(id)

	if (!data) {
		return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 })
	}
	return new Response(JSON.stringify(data), { status: 200 })
}
