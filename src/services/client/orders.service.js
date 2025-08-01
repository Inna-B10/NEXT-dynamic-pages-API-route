import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class OrdersService {
	_ORDERS = `${API_URL}/orders`

	/* -------------------------- Get Orders By UserId -------------------------- */
	// async getOrdersByUserId(userId) {
	// 	if (!userId) {
	// 		if (isDev()) console.error('Missing userId')
	// 		throw new Error('Missing params')
	// 	}
	// 	const { data } = await axiosClient.get(`${this._ORDERS}`)
	// 	return data
	// }

	/* ---------------------------- Create New Order ---------------------------- */
	async createNewOrder(items, totalPrice, address) {
		if (!address || !items?.length || !totalPrice) {
			if (isDev()) console.error('Missing params')
			throw new Error('Missing order data')
		}
		const { data } = await axiosClient.post(`${this._ORDERS}/create`, {
			items,
			totalPrice,
			address
		})
		return data
	}
}
export const ordersService = new OrdersService()
