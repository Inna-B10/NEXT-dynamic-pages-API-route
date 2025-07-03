import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'gaming_consoles'

export async function getAllGaming_consolesData() {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({}).toArray()
	return data
}

export async function getConsoleDataById(id) {
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
