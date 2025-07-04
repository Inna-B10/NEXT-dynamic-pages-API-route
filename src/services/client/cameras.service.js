import { LIMIT } from '@/constants/constants'
import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class CamerasService {
	_CAMERAS = `${API_URL}/cameras`

	//NB using = {} , does not throw an error if the function is called without parameters
	async getAllCameras({ page, limit = LIMIT } = {}) {
		const { data } = await axiosClient.get(this._CAMERAS, {
			params: { page, limit }
		})
		return data
	}

	async getCameraById(id) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/by-id/${id}`)
		return data
	}
}
export const camerasService = new CamerasService()
