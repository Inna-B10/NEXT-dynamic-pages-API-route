const { API_URL } = require('@/config/config')
const { axiosClient } = require('@/lib/utils/axios')

class FavoritesService {
	_FAVORITES = `${API_URL}/favorites`

	async getAllFavorites(userId) {
		const { data } = await axiosClient.get(this._FAVORITES, {
			params: { userId }
		})

		return data
	}

	async addFavorite(userId, productId) {
		await axiosClient.post(this._FAVORITES, {
			userId,
			productId
		})
	}

	async deleteFavorite(userId, productId) {
		await axiosClient.delete(this._FAVORITES, {
			params: { userId, productId }
		})
	}
}
export const favoritesService = new FavoritesService()
