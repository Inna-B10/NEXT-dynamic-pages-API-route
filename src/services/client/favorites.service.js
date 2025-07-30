import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class FavoritesService {
	_FAVORITES = `${API_URL}/favorites`

	/* ------------------------------ FavoritesIds ------------------------------ */
	async getFavoritesIds(userId) {
		if (!userId) return
		const { data } = await axiosClient.get(this._FAVORITES, {
			params: { userId }
		})

		return data
	}
	/* ------------------------------- AddFavorite ------------------------------ */
	async addFavorite(userId, productId, category) {
		if (!userId || !productId || !category) {
			if (isDev()) console.error('Missing params')
			return
		}
		await axiosClient.post(this._FAVORITES, {
			userId,
			productId,
			category
		})
	}
	/* ----------------------------- DeleteFavorite ----------------------------- */
	async deleteFavorite(userId, productId) {
		if (!userId || !productId) {
			if (isDev()) console.error('Missing params')
			return
		}
		await axiosClient.delete(this._FAVORITES, {
			params: { userId, productId }
		})
	}

	/* ---------------------------- DetailedFavorites --------------------------- */
	async getDetailedFavorites(userId) {
		if (!userId) {
			if (isDev()) console.error('Missing userId')
			return { data: [] }
		}
		const { data } = await axiosClient.get(`${this._FAVORITES}/detailed`, {
			params: { userId }
		})
		return data
	}
}
export const favoritesService = new FavoritesService()
