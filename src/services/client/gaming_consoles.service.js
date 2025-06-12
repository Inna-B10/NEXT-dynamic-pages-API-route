import { API_URL, LIMIT } from '@/constants/constants'
import { axiosClient } from '@/lib/utils/axios'

class Gaming_consolesService {
	_ITEMS = `${API_URL}/gaming_consoles`

	async getAllGaming_consoles({ page, limit = LIMIT } = {}) {
		const { data } = await axiosClient.get(this._ITEMS, {
			params: { page, limit }
		})
		return data
	}
}
export const gaming_consolesService = new Gaming_consolesService()
