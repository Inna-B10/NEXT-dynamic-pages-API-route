import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class FavoritesService {
	_FAVORITES = `${API_URL}/favorites`

	async getAllFavorites(userId) {
		const { data } = await axiosClient.get(this._FAVORITES, {
			params: { userId }
		})

		return data
	}

	async addFavorite(userId, productId, category) {
		await axiosClient.post(this._FAVORITES, {
			userId,
			productId,
			category
		})
	}

	async deleteFavorite(userId, productId) {
		await axiosClient.delete(this._FAVORITES, {
			params: { userId, productId }
		})
	}
}
export const favoritesService = new FavoritesService()
