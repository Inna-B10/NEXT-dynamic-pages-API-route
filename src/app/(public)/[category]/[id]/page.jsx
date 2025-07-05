import { ProductPage } from '@/components/product-page/ProductPage'
import { CATEGORIES } from '@/constants/categories'
import NotFoundPage from '@/app/not-found'
import { prepareProductInfo } from '@/lib/utils/prepareProductInfo'
import { getPreviewProductsData, getProductDataById } from '@/services/server/productsData.service'

export const revalidate = 60 //ISR

export async function generateStaticParams() {
	const allParams = await Promise.all(
		CATEGORIES.map(async category => {
			const products = await getPreviewProductsData(category)

			return products.map(product => ({
				category,
				id: product._id.toString()
			}))
		})
	)
	if (!allParams || allParams.length === 0) return []
	return allParams.flat()
}

export default async function Camera(props) {
	const params = await props.params
	const { category, id } = params

	const data = await getProductDataById(id, category)
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
