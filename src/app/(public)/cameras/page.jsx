'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { CameraCard } from '@/components/CameraCard'
import { LIMIT } from '@/constants/constants'
import { useEffectScroll } from '@/hooks/useEffectScroll'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasPage() {
	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['get_all_cameras'],
			queryFn: ({ pageParam = 0 }) =>
				camerasService.getPreviewItems({ limit: LIMIT, offset: pageParam }),
			getNextPageParam: (lastPage, pages) => {
				const loaded = pages.length * LIMIT
				return loaded < lastPage.total ? loaded : undefined
			}
		})

	const lastElementRef = useEffectScroll(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	})

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error loading data</p>

	const allItems = data?.pages.flatMap(page => page.items) || []

	return (
		<>
			{allItems?.length ? (
				<>
					<div className='grid grid-cols-4 gap-y-14 gap-x-8'>
						{allItems?.map((item, index) => (
							<CameraCard
								key={index}
								item={item}
								index={index}
							/>
						))}
					</div>
					{isFetchingNextPage && <p>Loading next page...</p>}
					<div
						ref={lastElementRef}
						style={{ height: 1 }}
					/>
				</>
			) : (
				<div>
					<p>No product in this category.</p>
				</div>
			)}
		</>
	)
}
