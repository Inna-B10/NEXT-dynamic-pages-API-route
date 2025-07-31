import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'orders'

// export async function getOrdersByUserIdData(userId) {
//   const db = await connectToDatabase()
//   const data = await db.collection(COLLECTION_NAME).find({ userId }).toArray()
//   return data
// }

export async function createNewOrderData(userId, items, totalPrice, address) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).insertOne({
		userId,
		items,
		totalPrice,
		status: 'pending',
		createdAt: new Date(),
		deliveryAddress: address
	})
	return data
}
