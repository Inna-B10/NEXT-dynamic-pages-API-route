import { connectToDatabase } from '@/lib/mongoDBconnector'

export async function checkOrCreateUser(clerkUser) {
	const db = await connectToDatabase()
	const users = db.collection('users')

	const existing = await users.findOne({ clerkId: clerkUser.id })
	if (existing) {
		return false
	}

	const newUser = {
		clerkId: clerkUser.id,
		email: clerkUser.emailAddresses?.[0]?.emailAddress,
		createdAt: new Date(),
		role: 'user' //add role field with default value
	}

	await users.insertOne(newUser)
	return true
}
