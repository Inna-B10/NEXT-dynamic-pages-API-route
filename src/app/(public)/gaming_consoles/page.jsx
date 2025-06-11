'use client'

import { useEffect, useState } from 'react'
import { GamingConsoleCard } from '@/components/GamingConsoleCard'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default function page() {
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)

	useEffect(() => {
		async function fetchData() {
			const limit = 30
			const offset = page * limit

			const response = await gaming_consolesService
				.getAllGaming_consoles({ limit, offset })
				.catch(console.error)
			if (response) setData(response.items)
		}
		fetchData()
	}, [page])

	return (
		<>
			{data && (
				<div className='grid grid-cols-4 gap-y-14 gap-x-8'>
					{data.map((item, index) => (
						<GamingConsoleCard
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
