'use client'

import { CameraCard } from '@/components/CameraCard'
import InfiniteList from '@/components/InfiniteList'
import { LIMIT } from '@/constants/constants'
import { useInfinitePagination } from '@/hooks/useInfinitePagination'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasClientPage({ initialData }) {
	const { data, isLoading, isError, isFetchingNextPage, lastElementRef } = useInfinitePagination({
		queryKey: ['get_all_cameras'],
		queryFn: params => camerasService.getPreviewCameras(params),
		type: 'offset',
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
