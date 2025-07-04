import { LIMIT } from '@/constants/constants'
import CamerasCategoryClient from './CamerasClientPage'
import { camerasService } from '@/services/client/cameras.service'

export default async function CamerasCategoryPage() {
	const firstPage = await camerasService.getAllCameras({
		page: 1,
		limit: LIMIT
	})

	return <CamerasCategoryClient initialData={firstPage} />
}
