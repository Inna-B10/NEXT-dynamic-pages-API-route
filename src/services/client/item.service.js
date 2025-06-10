import { API_URL } from '@/constants/constants'
import { axiosClient } from '@/lib/axios'

class ItemService {
	_ITEMS = `${API_URL}/items`

	async getAllItems() {
		const { data } = await axiosClient.get(`${this._ITEMS}`)
		return data
	}
}
export const itemService = new ItemService()
