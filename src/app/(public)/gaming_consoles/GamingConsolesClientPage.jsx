'use client'

import CategoryClient from '@/components/CategoryClient'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default function GamingConsolesCategoryClient({ initialData }) {
	return (
		<CategoryClient
			initialData={initialData}
			queryKey={['get_all_consoles']}
			queryFn={params => gaming_consolesService.getAllGaming_consoles(params)}
			category='gaming_consoles'
		/>
	)
}
