const { API_URL } = require('@/config/config')
const { axiosClient } = require('@/lib/utils/axios')

class FavoritesService {
	_FAVORITES = `${API_URL}/favorites`

	async getAllFavorites({ userId }) {
		const { data } = await axiosClient.get(this._FAVORITES, { params: { userId } })

		return data
	}
}
export const favoritesService = new FavoritesService()
