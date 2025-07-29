import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class FavoritesService {
	_FAVORITES = `${API_URL}/favorites`

	/* ------------------------------ FavoritesIds ------------------------------ */
	async getFavoritesIds(userId) {
		const { data } = await axiosClient.get(this._FAVORITES, {
			params: { userId }
		})

		return data
	}
	/* ------------------------------- AddFavorite ------------------------------ */
	async addFavorite(userId, productId, category) {
		await axiosClient.post(this._FAVORITES, {
			userId,
			productId,
			category
		})
	}
	/* ----------------------------- DeleteFavorite ----------------------------- */
	async deleteFavorite(userId, productId) {
		await axiosClient.delete(this._FAVORITES, {
			params: { userId, productId }
		})
	}

	/* ---------------------------- DetailedFavorites --------------------------- */
	async getDetailedFavorites(userId) {
		const { data } = await axiosClient.get(`${this._FAVORITES}/detailed`, {
			params: { userId }
		})
		return data
	}
}
export const favoritesService = new FavoritesService()
