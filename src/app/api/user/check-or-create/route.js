import { currentUser } from '@clerk/nextjs/server'
import { checkOrCreateUser } from '@/services/server/userDataService'

export async function POST() {
	const user = await currentUser()
	if (!user) {
		console.warn('Attempted access without authorization')
		return new Response('Unauthorized', { status: 401 })
	}
	try {
		const created = await checkOrCreateUser(user)
		return new Response(created ? 'Created' : 'Exists', { status: created ? 201 : 200 })
	} catch (err) {
		console.error('Error MongoDB:', err)
		return new Response('Internal server error', { status: 500 })
	}
}
