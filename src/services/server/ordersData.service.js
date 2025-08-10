import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'orders'

/* -------------------------- Get Orders By UserId -------------------------- */
// export async function getOrdersByUserIdData(userId) {
//   const db = await connectToDatabase()
//   const data = await db.collection(COLLECTION_NAME).find({ userId }).toArray()
//   return data
// }

/* ---------------------------- Create New Order ---------------------------- */
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

// /* ---------------------------- Update Order Status ---------------------------- */
// export async function updateOrderStatusData(orderId, status) {
// 	const db = await connectToDatabase()
// 	const data = await db.collection(COLLECTION_NAME).updateOne({ _id: orderId }, { $set: { status } })
// 	return data
// }

/* ------------------------- Get Last Order Address ------------------------- */
export async function getLastOrderAddressData(userId) {
	const db = await connectToDatabase()
	const data = await db
		.collection(COLLECTION_NAME)
		.findOne({ userId }, { sort: { createdAt: -1 }, projection: { deliveryAddress: 1 } })
	return data?.deliveryAddress || null
}
