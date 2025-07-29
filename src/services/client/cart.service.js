import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class CartService {
	_CART = `${API_URL}/cart`

	async getAllCartItems(userId) {
		const { data } = await axiosClient.get(this._CART, {
			params: { userId }
		})

		return data
	}

	async addCartItem(userId, productId) {
		await axiosClient.post(this._CART, {
			userId,
			productId
		})
	}

	async deleteCartItem(userId, productId) {
		await axiosClient.delete(this._CART, {
			params: { userId, productId }
		})
	}
}
export const cartService = new CartService()
