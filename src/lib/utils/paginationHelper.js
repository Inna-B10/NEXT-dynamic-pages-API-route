import { LIMIT } from '@/constants/constants'

export function createPagination({ limit = LIMIT, initialPage = 1 }) {
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
