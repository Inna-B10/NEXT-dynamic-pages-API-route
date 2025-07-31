import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class FavoritesService {
	_FAVORITES = `${API_URL}/favorites`

	/* ------------------------------ FavoritesIds ------------------------------ */
	async getFavoritesIds(userId) {
		if (!userId) {
			if (isDev()) console.error('Missing userId')
			throw new Error('Missing params')
		}
		const { data } = await axiosClient.get(this._FAVORITES)
		return data
	}
	/* ------------------------------- AddFavorite ------------------------------ */
	async addFavorite(userId, productId, category) {
		if (!userId || !productId || !category) {
			if (isDev()) console.error('Missing params')
			throw new Error('Missing params')
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
			throw new Error('Missing params')
		}
		await axiosClient.delete(this._FAVORITES, {
			params: { productId }
		})
	}

	/* ---------------------------- DetailedFavorites --------------------------- */
	async getDetailedFavorites(userId) {
		if (!userId) {
			if (isDev()) console.error('Missing userId')
			throw new Error('Missing params')
		}
		const { data } = await axiosClient.get(`${this._FAVORITES}/detailed`)
		return data
	}

	/* ----------------------------- Clear Favorites ---------------------------- */
	async clearFavorites(userId) {
		if (!userId) {
			if (isDev()) console.error('Missing userId')
			throw new Error('Missing params')
		}
		const { data } = await axiosClient.delete(`${this._FAVORITES}/clear-favorites`)
		return data
	}
}
export const favoritesService = new FavoritesService()
