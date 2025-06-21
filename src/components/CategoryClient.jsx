import { LIMIT } from '@/constants/constants'
import { useInfinitePagination } from '@/hooks/useInfinitePagination'
import InfiniteList from './InfiniteList'

export default function CategoryClient({
	initialData,
	queryKey,
	queryFn,
	paginationType,
	CardComponent
}) {
	const { data, isLoading, isError, isFetchingNextPage, lastElementRef } = useInfinitePagination({
		queryKey,
		queryFn,
		type: paginationType,
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
					renderItem={(item, index) => (
						<CardComponent
							item={item}
							index={index}
						/>
					)}
				/>
			) : (
				<div>
					<p>No product in this category.</p>
				</div>
			)}
		</>
	)
}
