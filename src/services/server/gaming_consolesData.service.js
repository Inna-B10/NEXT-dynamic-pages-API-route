import { connectToDatabase } from '@/lib/mongoDBconnector'

const COLLECTION_NAME = 'gaming_consoles'

export async function getAllGaming_consolesData() {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({}).toArray()
	return data
}
