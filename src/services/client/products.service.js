import { CATEGORIES } from '@/constants/categories'
import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class ProductsService {
	_PRODUCTS = `${API_URL}/products`

	/* ------------------ Get Category's Products - Light Mode ------------------ */
	async getPreviewProducts(category, page, limit) {
		if (!category || !CATEGORIES.map(({ slug }) => slug).includes(category) || !page || !limit) {
			if (isDev()) {
				console.error(
					'Missing or invalid params\n',
					'category:',
					category,
					'page',
					page,
					'limit',
					limit
				)
			}
			return []
		}

		const { data } = await axiosClient.get(
			`${this._PRODUCTS}/${category}?page=${page}&limit=${limit}`
		)
		return data
	}
}

export const productsService = new ProductsService()
