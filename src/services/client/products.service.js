import { LIMIT } from '@/constants/constants'
import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class ProductsService {
	_PRODUCTS = `${API_URL}/products`

	//NB using = {} , does not throw an error if the function is called without parameters
	async getAllProducts({ page, limit = LIMIT, category } = {}) {
		if (!category) {
			if (process.env.NODE_ENV === 'development') {
				throw new Error('Category is required')
			}
			return
		}
		const { data } = await axiosClient.get(`${this._PRODUCTS}/${category}`, {
			params: { page, limit }
		})
		return data
	}

	async getProductById(id, category) {
		if (!category) {
			if (process.env.NODE_ENV === 'development') {
				throw new Error('Category is required')
			}
			return
		}
		const { data } = await axiosClient.get(`${this._PRODUCTS}/${category}/by-id/${id}`)
		return data
	}
}
export const productsService = new ProductsService()
