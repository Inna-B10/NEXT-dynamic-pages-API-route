import { API_URL, LIMIT } from '@/constants/constants'
import { axiosClient } from '@/lib/utils/axios'

class Gaming_consolesService {
	_CONSOLES = `${API_URL}/gaming_consoles`

	async getAllGaming_consoles({ page, limit = LIMIT } = {}) {
		const { data } = await axiosClient.get(this._CONSOLES, {
			params: { page, limit }
		})
		return data
	}

	async getConsoleById(id) {
		const { data } = await axiosClient.get(`${this._CONSOLES}/by-id/${id}`)
		return data
	}
}
export const gaming_consolesService = new Gaming_consolesService()
