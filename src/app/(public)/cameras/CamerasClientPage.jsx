'use client'

import CategoryClient from '@/components/CategoryClient'
import { CameraCard } from '@/components/product-cards/CameraCard'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasCategoryClient({ initialData }) {
	return (
		<CategoryClient
			initialData={initialData}
			queryKey={['get_all_cameras']}
			queryFn={params => camerasService.getPreviewCameras(params)}
			paginationType='offset'
			CardComponent={CameraCard}
		/>
	)
}
