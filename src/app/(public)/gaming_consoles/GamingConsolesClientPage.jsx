'use client'

import CategoryClient from '@/components/CategoryClient'
import { productsService } from '@/services/client/products.service'

export default function GamingConsolesCategoryClient({ initialData }) {
	return (
		<CategoryClient
			initialData={initialData}
			queryKey={['get_all_consoles']}
			queryFn={params => productsService.getAllProducts({ ...params, category: 'gaming_consoles' })}
			category='gaming_consoles'
		/>
	)
}
