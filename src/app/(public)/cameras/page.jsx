'use client'

import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { CameraCard } from '@/components/CameraCard'
import { LIMIT } from '@/constants/constants'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasPage() {
	const observerRef = useRef()
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

	useEffect(() => {
		if (!observerRef.current || !hasNextPage) return

		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				fetchNextPage()
			}
		})
		observer.observe(observerRef.current)
		return () => observer.disconnect()
	}, [observerRef.current, hasNextPage])

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
						ref={observerRef}
						style={{ height: 1, marginTop: 180 }}
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
