import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

const COLLECTION_NAME = 'favorites'

/* ----------------------------- GetFavoritesIds ---------------------------- */
export async function getFavoritesIdsData(userId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).find({ userId }).toArray()
	return data
}

/* ------------------------------- AddFavorite ------------------------------ */
export async function addFavoriteData(userId, productId, categorySlug) {
	const db = await connectToDatabase()
	const data = await db
		.collection(COLLECTION_NAME)
		.insertOne({ userId, productId, categorySlug, addedAt: new Date() })
	return data
}

/* ----------------------------- DeleteFavorite ----------------------------- */
export async function deleteFavoriteData(userId, productId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).deleteOne({ userId, productId })
	return data
}

/* -------------------------- GetDetailedFavorites -------------------------- */
export async function getDetailedFavoritesData(userId) {
	const db = await connectToDatabase()

	const favorites = await db
		.collection(COLLECTION_NAME)
		.find({ userId })
		.sort({ addedAt: -1 })
		.toArray()

	// group favorites by category
	const grouped = favorites.reduce((acc, fav) => {
		const { categorySlug, productId, addedAt } = fav
		if (!acc[categorySlug]) acc[categorySlug] = []
		acc[categorySlug].push({ productId, addedAt })
		return acc
	}, {})

	// fetch products
	const result = []

	for (const categorySlug of Object.keys(grouped)) {
		const productIds = grouped[categorySlug].map(f => new ObjectId(f.productId))

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

/* ----------------------------- Clear Favorites ---------------------------- */
export async function clearFavoritesData(userId) {
	const db = await connectToDatabase()
	const data = await db.collection(COLLECTION_NAME).deleteMany({ userId })
	return data
}
