import { LIMIT } from '@/constants/constants'

//simple
//if working with simple .json file
export function createPagination({ type = 'offset', limit = LIMIT, initialPage = 1 }) {
	if (type === 'offset') {
		return {
			initialPageParam: 0,
			getNextPageParam: (lastPage, pages) => {
				const loaded = pages.length * limit
				return loaded < lastPage.total ? loaded : undefined
			},
			getQueryParam: pageParam => ({
				limit,
				offset: pageParam
			})
		}
	}

	//safer
	//if working with BD or API on the server (where data can changes often and quickly)
	if (type === 'page') {
		return {
			initialPageParam: { page: initialPage },
			getNextPageParam: lastPage => {
				const { page, totalPages } = lastPage
				return page < totalPages ? { page: page + 1 } : undefined
			},
			getQueryParam: pageParam => ({
				limit,
				page: pageParam.page
			})
		}
	}
	throw new Error('Unsupported pagination type')
}
