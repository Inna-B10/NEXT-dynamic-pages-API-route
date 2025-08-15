import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'
import { isDev } from '@/lib/utils/isDev'

const COLLECTION_NAME = 'orders'

/* -------------------------- Get Orders By UserId -------------------------- */
export async function getOrdersByUserIdData(userId) {
	const db = await connectToDatabase()
	const data = await db
		.collection(COLLECTION_NAME)
		.find(
			{ userId },
			{ sort: { createdAt: -1 } },
			{
				projection: {
					_id: 1,
					totalPrice: 1,
					status: 1,
					createdAt: 1
				}
			}
		)
		.toArray()
	return data
}

/* ---------------------------- Create New Order ---------------------------- */
export async function createNewOrderData(userId, items, totalPrice, address) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).insertOne({
		userId,
		items,
		totalPrice,
		status: 'processing',
		createdAt: new Date(),
		deliveryAddress: address
	})
	return data
}

/* ------------------------- Get Last Order Address ------------------------- */
export async function getLastOrderAddressData(userId) {
	const db = await connectToDatabase()
	const data = await db
		.collection(COLLECTION_NAME)
		.findOne({ userId }, { sort: { createdAt: -1 }, projection: { deliveryAddress: 1 } })
	return data?.deliveryAddress || null
}

/* -------------------------- Get Order By Id Data -------------------------- */
export async function getOrderByIdData(orderId) {
	let objectId
	try {
		objectId = ObjectId.createFromHexString(orderId)
	} catch (e) {
		if (isDev()) console.warn('Invalid ObjectId format:', orderId)
		return null
	}

	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).findOne({ _id: objectId })
	return data
}

// /* ---------------------------- Update Order Status ---------------------------- */
// export async function updateOrderStatusData(orderId, status) {
// 	const db = await connectToDatabase()
// 	const data = await db.collection(COLLECTION_NAME).updateOne({ _id: orderId }, { $set: { status } })
// 	return data
// }
