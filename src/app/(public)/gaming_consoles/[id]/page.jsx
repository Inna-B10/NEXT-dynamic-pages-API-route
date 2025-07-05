import { ProductPage } from '@/components/product-page/ProductPage'
import NotFoundPage from '@/app/not-found'
import { prepareProductInfo } from '@/lib/utils/prepareProductInfo'
import { productsService } from '@/services/client/products.service'

export default async function GamingConsole(props) {
	const params = await props.params
	const id = params.id

	const data = await productsService.getProductById(id, 'gaming_consoles')
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData, price } = prepareProductInfo(data)

	return (
		<ProductPage
			title={title}
			src={src}
			modelData={modelData}
			ratingData={ratingData}
			filteredData={filteredData}
			price={price}
			id={id}
		/>
	)
}
