import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'cameras'

export async function getAllCamerasData() {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({}).toArray()
	return data
}

export async function getCameraDataById(id) {
	let objectId
	try {
		objectId = ObjectId.createFromHexString(id)
	} catch (e) {
		return null
	}
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).findOne({ _id: objectId })

	return data
}
