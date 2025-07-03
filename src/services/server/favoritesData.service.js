import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/mongoDBconnector'

const COLLECTION_NAME = 'favorites'

export async function getAllFavoritesData(userId) {
	let objectId
	try {
		objectId = ObjectId.createFromHexString(userId)
	} catch (e) {
		return null
	}
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({ userId: objectId }).toArray()

	return data
}
