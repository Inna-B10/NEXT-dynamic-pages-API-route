import { connectToDatabase } from './mongoDBconnector'

export async function ensureCollectionWithIndexes(collectionName, indexes = []) {
	const db = await connectToDatabase()

	// Check if a collection exists
	const collections = await db.listCollections({}, { nameOnly: true }).toArray()
	const exists = collections.some(col => col.name === collectionName)

	if (!exists) {
		await db.createCollection(collectionName)
		console.log(`Collection "${collectionName}" created`)
	}

	const collection = db.collection(collectionName)

	// Check for existing indexes
	const existingIndexes = await collection.indexes()

	for (const { key, options } of indexes) {
		const name =
			options?.name ??
			Object.entries(key)
				.map(([k, v]) => `${k}_${v}`)
				.join('_')
		const alreadyExists = existingIndexes.some(i => i.name === name)

		//If index doesn't exist
		if (!alreadyExists) {
			await collection.createIndex(key, { ...options, name })
			console.log(`Index "${name}" created on "${collectionName}"`)
		}
	}
}
