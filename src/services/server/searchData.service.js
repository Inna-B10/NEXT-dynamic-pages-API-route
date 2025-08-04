import { CATEGORIES } from '@/constants/categories'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'

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

		const withCategory = items.map(item => ({ ...item, category: slug }))
		result.push(...withCategory)
		console.log(result)
	}
	return result
}
