import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY
})
export async function getUserEmail(userId) {
	try {
		const user = await clerkClient.users.getUser(userId)

		if (!user) {
			if (isDev()) {
				console.error('User not found')
			}
			return null
		}

		// return the primary email if exists
		return user.emailAddresses?.[0]?.emailAddress ?? null
	} catch (error) {
		if (isDev()) {
			console.error('Failed to fetch user email:', error)
		}
		return null
	}
}
