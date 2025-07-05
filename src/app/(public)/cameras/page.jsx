import { LIMIT } from '@/constants/constants'
import CamerasCategoryClient from './CamerasClientPage'
import { productsService } from '@/services/client/products.service'

export default async function CamerasCategoryPage() {
	const firstPage = await productsService.getAllProducts({
		page: 1,
		limit: LIMIT,
		category: 'cameras'
	})

	return <CamerasCategoryClient initialData={firstPage} />
}
