import { connectToDatabase } from '@/lib/mongoDBconnector'

export async function checkOrCreateUser(clerkUser) {
	const db = await connectToDatabase()
	const users = db.collection('users')

	console.log('Verifying a User in MongoDB:', clerkUser.id)

	const existing = await users.findOne({ clerkId: clerkUser.id })
	if (existing) {
		console.log('The user already exists in MongoDB:', clerkUser.emailAddresses?.[0]?.emailAddress)
		return false
	}

	const newUser = {
		clerkId: clerkUser.id,
		email: clerkUser.emailAddresses?.[0]?.emailAddress,
		createdAt: new Date(),
		role: 'user' //add role field with default value
	}

	await users.insertOne(newUser)
	console.log('User created in MongoDB:', newUser.email)
	return true
}
