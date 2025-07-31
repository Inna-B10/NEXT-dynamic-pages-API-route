import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class CartService {
	_CART = `${API_URL}/cart`

	/* ----------------------------- Cart Items Ids ----------------------------- */
	async getCartItemsIds(userId) {
		if (!userId) return
		const { data } = await axiosClient.get(this._CART, {
			params: { userId }
		})

		return data
	}

	/* --------------------------- Add Product To Cart -------------------------- */
	async addCartItem(userId, productId, category) {
		if (!userId || !productId || !category) {
			if (isDev()) console.error('Missing params')
			return
		}
		await axiosClient.post(this._CART, {
			userId,
			productId,
			category
		})
	}

	/* ------------------------ Delete Product From Cart ------------------------ */
	async deleteCartItem(userId, productId) {
		if (!userId || !productId) {
			if (isDev()) console.error('Missing params')
			return
		}
		await axiosClient.delete(this._CART, {
			params: { userId, productId }
		})
	}

	/* ---------------------------- Cart Items Details --------------------------- */
	async getCartItemsDetails(userId) {
		if (!userId) {
			if (isDev()) console.error('Missing userId')
			return { data: [] }
		}
		const { data } = await axiosClient.get(`${this._CART}/detailed`, {
			params: { userId }
		})
		return data
	}

	/* ---------------------------- Clear Cart --------------------------- */
	async clearCart(userId) {
		if (!userId) {
			if (isDev()) console.error('Missing userId')
			return
		}
		const { data } = await axiosClient.delete(`${this._CART}/clear-cart`, {
			params: { userId }
		})
		return data
	}
}
export const cartService = new CartService()
