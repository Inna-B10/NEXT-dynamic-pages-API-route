'use client'

import CategoryClient from '@/components/CategoryClient'
import { camerasService } from '@/services/client/cameras.service'

export default function CamerasCategoryClient({ initialData }) {
	return (
		<CategoryClient
			initialData={initialData}
			queryKey={['get_all_cameras']}
			queryFn={params => camerasService.getAllCameras(params)}
			category='cameras'
		/>
	)
}
