import { CATEGORIES } from '@/constants/categories'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'
import { formatProductTitle } from '@/lib/utils/product/formatProductTitle'

export async function getDetailedSearchData(query) {
	const collections = CATEGORIES.map(({ slug }) => slug)
	if (!collections) {
		return
	}

	const result = []
	const db = await connectToDatabase()
	for (const slug of collections) {
		const collection = await db.collection(slug)

		const items = await collection
			.find({
				$or: [
					{ 'Product Name': { $regex: query, $options: 'i' } },
					{ Brand: { $regex: query, $options: 'i' } },
					{ Model: { $regex: query, $options: 'i' } },
					{ 'Model Name': { $regex: query, $options: 'i' } },
					{ 'Alternate names': { $regex: query, $options: 'i' } }
				]
			})
			.project({
				_id: 1,
				'Product Name': 1,
				Model: 1,
				Brand: 1,
				'Model Name': 1,
				Price: 1,
				'Picture URL': 1
			})
			.toArray()

		if (!items) return []
		// formatted product data
		const formatted = items.map(product => ({
			_id: product._id,
			brand: product.Brand,
			//NB: validate price
			/**
			 * test DB does not contain 'Price' field
			 * change it if uses another DB
			 */
			price: Number.isFinite(product.Price) && product.Price > 0 ? product.Price : 4995,
			imageUrl: product['Picture URL'],
			productName: formatProductTitle(product) //prepears product title
		}))

		const withCategory = formatted.map(item => ({ ...item, category: slug }))
		result.push(...withCategory)
	}
	return result
}
