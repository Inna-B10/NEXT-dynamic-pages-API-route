import { LIMIT } from '@/constants/constants'
import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class CamerasService {
	_CAMERAS = `${API_URL}/cameras`

	async getAllItems({ limit = LIMIT, offset = 0 } = {}) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/full`, {
			params: { limit, offset }
		})
		return data
	}

	//NB using = {} , does not throw an error if the function is called without parameters
	async getPreviewCameras({ limit = LIMIT, offset = 0 } = {}) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/preview`, {
			params: { limit, offset }
		})
		return data
	}

	async getCameraById(id) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/by-id/${id}`)
		return data
	}
}
export const camerasService = new CamerasService()
