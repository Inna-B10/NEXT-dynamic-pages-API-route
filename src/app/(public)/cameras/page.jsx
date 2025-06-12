'use client'

import { CameraCard } from '@/components/CameraCard'
import InfiniteList from '@/components/InfiniteList'
import { LIMIT } from '@/constants/constants'
import { useInfinitePagination } from '@/hooks/useInfinitePagination'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasPage() {
	const { data, isLoading, isError, isFetchingNextPage, lastElementRef } = useInfinitePagination({
		queryKey: ['get_all_cameras'],
		queryFn: ({ pageParam = 0 }) =>
			camerasService.getPreviewItems({ limit: LIMIT, offset: pageParam }),
		type: 'offset',
		limit: LIMIT
	})
	console.log(data)
	const allItems = data?.pages.flatMap(page => page.items) || []
	console.log(allItems)
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
						<CameraCard
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
