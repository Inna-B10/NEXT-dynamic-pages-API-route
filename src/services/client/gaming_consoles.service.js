import { API_URL } from '@/constants/constants'
import { axiosClient } from '@/lib/axios'

class Gaming_consolesService {
	_ITEMS = `${API_URL}/gaming_consoles`

	async getAllGaming_consoles({ limit = 30, offset = 0 } = {}) {
		const { data } = await axiosClient.get(`${this._ITEMS}?limit=${limit}&offset=${offset}`)
		return data
	}
}
export const gaming_consolesService = new Gaming_consolesService()
