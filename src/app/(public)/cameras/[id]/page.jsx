import { ProductPage } from '@/components/product-page/ProductPage'
import NotFoundPage from '@/app/not-found'
import { prepareCameraInfo } from '@/lib/utils/prepareCameraInfo'
import { camerasService } from '@/services/client/cameras.service'

export default async function Camera(props) {
	const params = await props.params
	const id = params.id.split('-')

	const { data } = await camerasService.getCameraById(id[0])
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData } = prepareCameraInfo(data)

	return (
		<ProductPage
			title={title}
			src={src}
			modelData={modelData}
			ratingData={ratingData}
			filteredData={filteredData}
			id={id[0]}
		/>
	)
}
