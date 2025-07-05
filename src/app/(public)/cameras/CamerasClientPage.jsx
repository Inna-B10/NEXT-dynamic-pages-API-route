'use client'

import CategoryClient from '@/components/CategoryClient'
import { productsService } from '@/services/client/products.service'

export default function CamerasCategoryClient({ initialData }) {
	return (
		<CategoryClient
			initialData={initialData}
			queryKey={['get_all_cameras']}
			queryFn={params => productsService.getAllProducts({ ...params, category: 'cameras' })}
			category='cameras'
		/>
	)
}
