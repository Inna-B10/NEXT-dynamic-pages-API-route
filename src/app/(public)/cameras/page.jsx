import { LIMIT } from '@/constants/constants'
import CamerasClientPage from './CamerasClientPage'
import { camerasService } from '@/services/client/cameras.service'

export default async function CamerasPage() {
	const firstPage = await camerasService.getPreviewItems({ limit: LIMIT, offset: 0 })
	return <CamerasClientPage initialData={firstPage} />
}
