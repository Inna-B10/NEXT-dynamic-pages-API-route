import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

function isDev() {
	return process.env.NODE_ENV === 'development'
}

export async function getAllProductsData(category) {
	if (!category) {
		if (isDev()) throw new Error('Category is required')
		return
	}
	try {
		const db = await connectToDatabase()
		const data = await db.collection(category).find({}).toArray()
		return data
	} catch (e) {
		if (isDev()) console.error(`getAllProductsData error: ${e.message}`)
		return []
	}
}
export async function getPreviewProductsData(category) {
	if (!category) {
		if (isDev()) throw new Error('Category is required')
		return []
	}

	try {
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
	} catch (e) {
		if (isDev()) console.error(`getPreviewProductsData error: ${e.message}`)
		return []
	}
}

export async function getProductDataById(id, category) {
	if (!category) {
		if (isDev()) throw new Error('Category is required')
		return null
	}

	let objectId
	try {
		objectId = ObjectId.createFromHexString(id)
	} catch (e) {
		if (isDev()) console.warn('Invalid ObjectId format:', id)
		return null
	}

	try {
		const db = await connectToDatabase()
		const data = await db.collection(category).findOne({ _id: objectId })

		return data
	} catch (e) {
		if (isDev()) console.error(`getProductDataById error: ${e.message}`)
		return null
	}
}
