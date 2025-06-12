import { API_URL, LIMIT } from '@/constants/constants'
import { axiosClient } from '@/lib/axios'

class Gaming_consolesService {
	_ITEMS = `${API_URL}/gaming_consoles`

	async getAllGaming_consoles({ limit = LIMIT, offset = 0 } = {}) {
		const { data } = await axiosClient.get(this._ITEMS, {
			params: { limit, offset }
		})
		return data
	}
}
export const gaming_consolesService = new Gaming_consolesService()
