import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class CartService {
	_CART = `${API_URL}/cart`

	/* ----------------------------- Cart Items Ids ----------------------------- */
	async getCartItemsIds() {
		const { data } = await axiosClient.get(this._CART)
		return data
	}

	/* --------------------------- Add Product To Cart -------------------------- */
	async addCartItem(productId, category) {
		if (!productId || !category) {
			if (isDev()) console.error('Missing params')
			throw new Error('Missing params')
		}
		await axiosClient.post(this._CART, {
			productId,
			category
		})
	}

	/* ------------------------ Delete Product From Cart ------------------------ */
	async deleteCartItem(productId) {
		if (!productId) {
			if (isDev()) console.error('Missing params')
			throw new Error('Missing params')
		}
		await axiosClient.delete(this._CART, {
			params: { productId }
		})
	}

	/* ---------------------------- Cart Items Details --------------------------- */
	async getCartItemsDetails() {
		const { data } = await axiosClient.get(`${this._CART}/detailed`)
		return data
	}

	/* ---------------------------- Clear Cart --------------------------- */
	async clearCart() {
		const { data } = await axiosClient.delete(`${this._CART}/clear-cart`)
		return data
	}
}
export const cartService = new CartService()
