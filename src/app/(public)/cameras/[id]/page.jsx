import { ProductPage } from '@/components/product-page/ProductPage'
import NotFoundPage from '@/app/not-found'
import { prepareProductInfo } from '@/lib/utils/prepareProductInfo'
import { productsService } from '@/services/client/products.service'

export default async function Camera(props) {
	const params = await props.params
	const id = params.id

	const data = await productsService.getProductById(id, 'cameras')
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData } = prepareProductInfo(data)

	return (
		<ProductPage
			title={title}
			src={src}
			modelData={modelData}
			ratingData={ratingData}
			filteredData={filteredData}
			id={id}
		/>
	)
}
