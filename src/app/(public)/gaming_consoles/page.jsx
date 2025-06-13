'use client'

import { GamingConsoleCard } from '@/components/GamingConsoleCard'
import InfiniteList from '@/components/InfiniteList'
import { LIMIT } from '@/constants/constants'
import { useInfinitePagination } from '@/hooks/useInfinitePagination'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default function page() {
	const { data, isLoading, isError, isFetchingNextPage, lastElementRef } = useInfinitePagination({
		queryKey: ['get_all_consoles'],
		queryFn: params => gaming_consolesService.getAllGaming_consoles(params),
		type: 'page',
		limit: LIMIT
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
					renderItem={item => <GamingConsoleCard item={item} />}
				/>
			) : (
				<div>
					<p>No product in this category.</p>
				</div>
			)}
		</>
	)
}
