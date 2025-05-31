import { axiosClient } from '@/utils/axios'

class CameraService {
	_CAMERAS = '/api/cameras'

	async getAllItems({ limit = 30, offset = 0 }) {
		const { data } = await axiosClient.get(`${this._CAMERAS}/full?limit=${limit}&offset=${offset}`)
		return data
	}

	async getPreviewItems({ limit = 30, offset = 0 }) {
		const { data } = await axiosClient.get(
			`${this._CAMERAS}/preview?limit=${limit}&offset=${offset}`
		)
		return data
	}
}
export const cameraService = new CameraService()
