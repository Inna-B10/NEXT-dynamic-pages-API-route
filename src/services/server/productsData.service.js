import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongoDBconnector'
import { isDev } from '@/lib/utils/isDev'
import { formatProductTitle } from '@/lib/utils/product/formatProductTitle'

/* -------------------------- Get Products Data - Full mode ------------------------- */
// export async function getAllProductsData(category) {
// 	if (!category) {
// 		if (isDev()) throw new Error('Category is required')
// 		return
// 	}
// 	try {
// 		const db = await connectToDatabase()
// 		const data = await db.collection(category).find({}).toArray()
// 		return data
// 	} catch (e) {
// 		if (isDev()) console.error(`getAllProductsData error: ${e.message}`)
// 		return []
// 	}
// }

/* ------------------------ Get Products Data - Light mode ------------------------- */
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
		if (!data) return []

		// formatted product data
		const formatted = data.map(product => ({
			_id: product._id,
			brand: product.Brand,
			//NB: validate price
			/**
			 * test DB does not contain 'Price' field
			 * change it if uses another DB
			 */
			price: Number.isFinite(product.Price) && product.Price > 0 ? product.Price : 4995,
			imageUrl: product['Picture URL'],
			productName: formatProductTitle(product) //prepares product title
		}))

		return formatted
	} catch (e) {
		if (isDev()) console.error(`getPreviewProductsData error: ${e.message}`)
		return []
	}
}

/* ------------------------- Get Product Data By Id ------------------------- */
export async function getProductDataById(id, category) {
	if (!category || !id) {
		if (isDev()) throw new Error('Missing params')
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
		//NB: validate price
		/**
		 * test DB does not contain 'Price' field
		 * change it if uses another DB
		 */
		const priceNum = Number(data?.Price)
		const validPrice = Number.isFinite(priceNum) && priceNum > 0 ? priceNum : 4995

		return {
			...data,
			Price: validPrice
		}
	} catch (e) {
		if (isDev()) console.error(`getProductDataById error: ${e.message}`)
		return null
	}
}
