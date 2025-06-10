import { connectToDatabase } from '@/lib/mongoDBconnector'

const COLLECTION_NAME = 'testing-items'

export async function getAllItemsData() {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({}).toArray()
	console.log(data)
	return data
}
