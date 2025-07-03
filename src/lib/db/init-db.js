import { dbCollections } from './db-schema'
import { connectToDatabase } from './mongoDBconnector'

export async function initDatabase() {
	//   const db =await connectToDatabase()
	//
	//   const collections = await db.listCollections({}, {nameOnly: true}).toArray()
	// const collectionsNames = collections.map((collection) => collection.name)
	//
	//   if (!collectionsNames.includes('users')) {
	//     await db.createCollection('users')
	//   }
	//
	//   const userCollection = db.collection('users')
	// 	const indexes = await userCollection.indexes()
	// 	const hasIndex = indexes.some(i => i.name === 'user_email_unique')
	//   if (!hasIndex) {
	//     await userCollection.createIndex(
	// 			{ userId: 1, email: 1 },
	// 			{ unique: true, name: 'user_email_unique' }
	// 		)
	//   }

	/* ---------------- Initialization Of Collections And Indexes --------------- */
	const db = await connectToDatabase()
	const existingCollections = await db.listCollections({}, { nameOnly: true }).toArray()
	const existingNames = existingCollections.map(col => col.name)

	// Check if a collection exists, if not, create it
	for (const { name, indexes } of dbCollections) {
		if (!existingNames.includes(name)) {
			await db.createCollection(name)
			console.log(`Collection "${name}" created`)
		} else {
			console.log(`Collection "${name}" already exists`)
		}
		const collection = db.collection(name)

		// Check for existing indexes
		if (indexes && indexes.length > 0) {
			const existingIndexes = await collection.indexes()

			for (const { key, options } of indexes) {
				const indexName =
					options?.name ??
					Object.entries(key)
						.map(([k, v]) => `${k}_${v}`)
						.join('_')

				const alreadyExists = existingIndexes.some(i => i.name === indexName)
				if (!alreadyExists) {
					await collection.createIndex(key, { ...options, name: indexName })
					console.log(`Index "${indexName}" created on "${name}"`)
				}
			}
		}
		//If current collection is "users" - check / add superuser
		if (name === 'users') {
			const superuser = await collection.findOne({ clerkUserId: process.env.SUPERUSER_CLERK_ID })

			if (!superuser) {
				await collection.insertOne({
					clerkUserId: process.env.SUPERUSER_CLERK_ID,
					email: process.env.SUPERUSER_EMAIL,
					createdAt: new Date(),
					role: 'admin'
				})
				console.log('Superuser added to users collection')
			} else {
				console.log('Superuser already exists in users collection')
			}
		}
	}
}
