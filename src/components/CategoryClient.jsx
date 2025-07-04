import { LIMIT } from '@/constants/constants'
import { useInfinitePagination } from '@/hooks/useInfinitePagination'
import InfiniteList from './InfiniteList'

export default function CategoryClient({ initialData, queryKey, queryFn, category }) {
	const { data, isLoading, isError, isFetchingNextPage, lastElementRef } = useInfinitePagination({
		queryKey,
		queryFn,
		limit: LIMIT,
		initialData
	})

	const allItems = data?.pages.flatMap(page => page.items) || []

	return (
		<>
			{allItems?.length ? (
				<InfiniteList
					data={allItems}
					isLoading={isLoading}
					isError={isError}
					isFetchingNextPage={isFetchingNextPage}
					lastElementRef={lastElementRef}
					category={category}
				/>
			) : (
				<div>
					<p>No product in this category.</p>
				</div>
			)}
		</>
	)
}
