import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'shoppingCart'

export async function getAllCartItemsData(userId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({ userId }).toArray()
	return data
}

export async function addCartItemData(userId, productId) {
	const db = await connectToDatabase()
	const data = await db
		.collection(COLLECTION_NAME)
		.insertOne({ userId, productId, addedAt: new Date() })
	return data
}

export async function deleteCartItemData(userId, productId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).deleteOne({ userId, productId })
	return data
}
