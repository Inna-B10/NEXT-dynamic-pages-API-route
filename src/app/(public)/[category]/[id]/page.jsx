import { DynamicButton } from '@/components/buttons/DynamicButton'
import { CATEGORIES } from '@/constants/categories'
import { SITE_NAME } from '@/constants/seo.constants'
import { ProductDetails } from '@/app/(public)/[category]/[id]/product-page/ProductDetails'
import NotFoundPage from '@/app/not-found'
import { formatProductTitle } from '@/lib/utils/product/formatProductTitle'
import { prepareProductInfo } from '@/lib/utils/product/prepareProductInfo'
import { getPreviewProductsData, getProductDataById } from '@/services/server/productsData.service'

export const revalidate = 60 //ISR

/* -------------------------------- Metadata -------------------------------- */
export async function generateMetadata(props) {
	const params = await props.params
	const { category, id } = params

	const product = await getProductDataById(id, category)
	if (!product) return {}

	const title = formatProductTitle(product)

	return {
		title: `${title} | ${SITE_NAME}`,
		description: `Buy ${title} at the best price.`,
		openGraph: {
			title,
			description: `Check out the ${title} available now.`,
			images: [
				{
					url: product['Picture URL'] || '/images/default-no-product.webp',
					width: 800,
					height: 600,
					alt: title
				}
			]
		}
	}
}

/* ------------------------------ StaticParams ------------------------------ */
export async function generateStaticParams() {
	const allParams = []
	for (const { slug } of CATEGORIES) {
		const products = await getPreviewProductsData(slug)

		if (!products || products.length === 0) continue

		const categoryParams = products.map(product => ({
			category: slug,
			id: product._id.toString()
		}))

		allParams.push(...categoryParams)
	}
	return allParams.flat()
}

/* ------------------------------- ProductPage ------------------------------ */
export default async function ProductPage(props) {
	const params = await props.params
	const { category, id } = params

	const data = await getProductDataById(id, category)
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData, price } = prepareProductInfo(data)

	return (
		<>
			<ProductDetails
				title={title}
				src={src}
				modelData={modelData}
				ratingData={ratingData}
				filteredData={filteredData}
				price={price}
				id={id}
				category={category}
			/>
			<DynamicButton btnName='ScrollToTopButton' />
		</>
	)
}
