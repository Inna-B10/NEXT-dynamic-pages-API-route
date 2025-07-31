import { getProductDataById } from '@/services/server/productsData.service'

export async function GET({ params }) {
	const param = await params
	const id = param.id

	const data = await getProductDataById(id, 'cameras')

	if (!data) {
		return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 })
	}
	return new Response(JSON.stringify(data), { status: 200 })
}
