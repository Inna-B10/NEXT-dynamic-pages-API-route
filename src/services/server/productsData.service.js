import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

export async function getAllProductsData(category) {
	if (!category) {
		if (process.env.NODE_ENV === 'development') {
			throw new Error('Category is required')
		}
		return
	}
	const db = await connectToDatabase()
	const data = await db.collection(category).find({}).toArray()
	return data
}
export async function getPreviewProductsData(category) {
	if (!category) {
		if (process.env.NODE_ENV === 'development') {
			throw new Error('Category is required')
		}
		return
	}
	const db = await connectToDatabase()
	const data = await db
		.collection(category)
		.find(
			{},
			{
				projection: {
					'Product Name': 1,
					Model: 1,
					Brand: 1,
					'Model Name': 1,
					Price: 1,
					'Picture URL': 1
				}
			}
		)
		.toArray()
	return data
}

export async function getProductDataById(id, category) {
	if (!category) {
		if (process.env.NODE_ENV === 'development') {
			throw new Error('Category is required')
		}
		return
	}
	let objectId
	try {
		objectId = ObjectId.createFromHexString(id)
	} catch (e) {
		return null
	}
	const db = await connectToDatabase()
	const data = await db.collection(category).findOne({ _id: objectId })

	return data
}
