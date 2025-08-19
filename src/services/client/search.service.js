import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'

class SearchService {
	_SEARCH = `${API_URL}/search`

	/* ------------------------------ Search ------------------------------ */
	async getDetailedSearch(query) {
		const { data } = await axiosClient.get(`${this._SEARCH}?query=${query}`)
		return data
	}
}
export const searchService = new SearchService()
