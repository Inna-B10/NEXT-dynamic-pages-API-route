import { API_URL, LIMIT } from '@/constants/constants'
import { axiosClient } from '@/lib/axios'

class CamerasService {
	_CAMERAS = `${API_URL}/cameras`

	async getAllItems({ limit = LIMIT, offset = 0 } = {}) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/full`, {
			params: { limit, offset }
		})
		return data
	}

	//NB using = {} , does not throw an error if the function is called without parameters
	async getPreviewItems({ limit = LIMIT, offset = 0 } = {}) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/preview`, {
			params: { limit, offset }
		})
		return data
	}
}
export const camerasService = new CamerasService()
