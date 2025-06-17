import { useInfiniteQuery } from '@tanstack/react-query'
import { LIMIT } from '@/constants/constants'
import { useInfiniteScroll } from './useInfiniteScroll'
import { createPagination } from '@/lib/utils/paginationHelper'

export function useInfinitePagination({
	queryKey,
	queryFn,
	type = 'offset',
	limit = LIMIT,
	initialPage = 1,
	enabled = true,
	rootMargin = '0px',
	initialData = null
}) {
	const pagination = createPagination({ type, limit, initialPage })

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey,
			queryFn: ({ pageParam }) => {
				const params = pagination.getQueryParam(pageParam)
				return queryFn(params)
			},
			initialPageParam: pagination.initialPageParam,
			getNextPageParam: pagination.getNextPageParam,
			enabled,

			initialData: {
				pages: [initialData],
				pageParams: [pagination.initialPageParam]
			}
		})

	const lastElementRef = useInfiniteScroll(
		() => {
			if (hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		},
		{ rootMargin }
	)
	return {
		data,
		isLoading,
		isError,
		isFetchingNextPage,
		hasNextPage,
		lastElementRef
	}
}
