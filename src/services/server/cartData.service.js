import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'shoppingCart'

/* ---------------------------- Get Cart ItemsIds --------------------------- */
export async function getCartItemsIdsData(userId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({ userId }).toArray()
	return data
}

/* --------------------------- Add Product To Cart -------------------------- */
export async function addCartItemData(userId, productId, categorySlug) {
	const db = await connectToDatabase()
	const data = await db
		.collection(COLLECTION_NAME)
		.insertOne({ userId, productId, categorySlug, addedAt: new Date() })
	return data
}

/* ------------------------ Delete Product From Cart ------------------------ */
export async function deleteCartItemData(userId, productId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).deleteOne({ userId, productId })
	return data
}

/* ------------------------- Get Cart Items Details ------------------------- */
export async function getCartItemsDetailsData(userId) {
	const db = await connectToDatabase()
	const items = await db
		.collection(COLLECTION_NAME)
		.find({ userId })
		.sort({ addedAt: -1 })
		.toArray()

	// group items by category
	const grouped = items.reduce((acc, item) => {
		const { categorySlug, productId, addedAt } = item
		if (!acc[categorySlug]) acc[categorySlug] = []
		acc[categorySlug].push({ productId, addedAt })
		return acc
	}, {})

	// fetch products
	const result = []

	for (const categorySlug of Object.keys(grouped)) {
		const productIds = grouped[categorySlug].map(i => new ObjectId(i.productId))

		const products = await db
			.collection(categorySlug)
			.find({ _id: { $in: productIds } })
			.project({
				'Product Name': 1,
				Model: 1,
				Brand: 1,
				'Model Name': 1,
				Price: 1,
				'Picture URL': 1
			})
			.toArray()

		// add products to result
		for (const { productId, addedAt } of grouped[categorySlug]) {
			const product = products.find(p => p._id.equals(new ObjectId(productId)))
			if (product) {
				result.push({
					addedAt,
					product: {
						...product,
						categorySlug
					}
				})
			}
		}
	}

	// sort by addedAt
	result.sort((a, b) => b.addedAt - a.addedAt)

	return result
}

/* ------------------------------- Clear Cart ------------------------------- */
export async function clearCartData(userId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).deleteMany({ userId })
	return data
}
