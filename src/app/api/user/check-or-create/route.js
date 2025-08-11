import { currentUser } from '@clerk/nextjs/server'
import { isDev } from '@/lib/utils/isDev'
import { checkOrCreateUser } from '@/services/server/userDataService'

/* ---------------------------- Check Or Create User ---------------------------- */
export async function POST() {
	const user = await currentUser()
	if (!user) {
		console.warn('Attempted access without authorization')
		return new Response('Unauthorized', { status: 401 })
	}
	try {
		const created = await checkOrCreateUser(user)
		return new Response(created ? 'Created' : 'Exists', { status: created ? 201 : 200 })
	} catch (error) {
		if (isDev()) {
			console.error('Error checkOrCreateUser:', error)
		}
		return new Response('Internal server error', { status: 500 })
	}
}
