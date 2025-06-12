'use client'

import { useEffect, useState } from 'react'
import { CameraCard } from '@/components/CameraCard'
import { LIMIT } from '@/constants/constants'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasPage() {
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)

	useEffect(() => {
		async function fetchData() {
			const limit = LIMIT
			const offset = page * limit

			const response = await camerasService.getPreviewItems({ limit, offset }).catch(console.error)
			if (response) setData(response.items)
		}
		fetchData()
	}, [page])

	return (
		<>
			{data && (
				<div className='grid grid-cols-4 gap-y-14 gap-x-8'>
					{data.map((item, index) => (
						<CameraCard
							key={index}
							item={item}
							index={index}
						/>
					))}
				</div>
			)}
		</>
	)
}
