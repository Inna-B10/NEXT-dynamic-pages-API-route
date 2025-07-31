import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class OrdersService {
	_ORDERS = `${API_URL}/orders`

	async getOrdersByUser(userId) {
		return axiosClient.get(`${this._ORDERS}`)
	}

	/* ---------------------------- Create New Order ---------------------------- */
	async createNewOrder(userId, items, totalPrice, address) {
		if (!userId || !address || !items?.length || !totalPrice) {
			if (isDev()) console.error('Missing params')
			throw new Error('Missing order data')
		}
		const { data } = await axiosClient.post(`${this._ORDERS}/create`, {
			userId,
			items,
			totalPrice,
			address
		})
		return data
	}
}
export const ordersService = new OrdersService()
