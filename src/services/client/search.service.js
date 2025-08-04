import toast from 'react-hot-toast'
import { API_URL } from '@/config/config'
import { axiosClient } from '@/lib/utils/axios'
import { isDev } from '@/lib/utils/isDev'

class SearchService {
	_SEARCH = `${API_URL}/search`

	/* ------------------------------ Search ------------------------------ */

	async getDetailedSearch(query) {
		if (!query || query.trim().length < 2) {
			toast.error('Missing or too short query')
			if (isDev()) console.error('Missing or too short query')
			throw new Error('Missing or too short query')
		}

		const { data } = await axiosClient.get(`${this._SEARCH}?query=${query}`)
		return data
	}
}
export const searchService = new SearchService()
