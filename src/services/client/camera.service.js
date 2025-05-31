import { axiosClient } from '@/utils/axios'

class CameraService {
	_CAMERAS = '/api/cameras'

	async getAllItems({ limit = 30, offset = 0 }) {
		const { data } = await axiosClient.get(`${this._CAMERAS}?limit=${limit}&offset=${offset}`)
		return data
	}
}
export const cameraService = new CameraService()
