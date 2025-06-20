import { LIMIT } from '@/constants/constants'
import CamerasCategoryClient from './CamerasClientPage'
import { camerasService } from '@/services/client/cameras.service'

export default async function CamerasCategoryPage() {
	const firstPage = await camerasService.getPreviewCameras({ limit: LIMIT, offset: 0 })
	return <CamerasCategoryClient initialData={firstPage} />
}
