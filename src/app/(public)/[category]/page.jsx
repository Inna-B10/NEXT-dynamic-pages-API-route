import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { DynamicButton } from '@/components/buttons/DynamicButton'
import { ProductCard } from '@/components/product/ProductCard'
import { CATEGORIES } from '@/constants/categories'
import { LIMIT } from '@/constants/constants'
import NotFoundPage from '@/app/not-found'
import { PUB_PAGES } from '@/lib/routes-helpers/public-pages'
import { getCategoryLabel } from '@/lib/utils/getCategoryLabel'
import { getPreviewProductsData } from '@/services/server/productsData.service'

export const revalidate = 60 //ISR

/* --------------------------------- Metadata -------------------------------- */
export async function generateMetadata(props) {
	const params = await props.params
	const category = params.category

	const categoryTitle = getCategoryLabel(category) || 'Products'
	const title = `${categoryTitle} - Product Catalog`
	const description = `Explore our selection of ${categoryTitle.toLowerCase()}. Find the latest models, reviews, and deals.`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: PUB_PAGES.CATEGORY(category)
			//[TODO] add image
			// images: [
			// 	{
			// 		url: `https://your-site.com/og/${category}.png`,
			// 		width: 1200,
			// 		height: 630,
			// 		alt: `${categoryTitle} image`
			// 	}
			// ]
		}
	}
}

/* ------------------------------ StaticParams ------------------------------ */
export async function generateStaticParams() {
	return CATEGORIES.map(({ slug }) => ({ category: slug }))
}

/* ------------------------------ CategoryPage ------------------------------ */
export default async function CategoryPage(props) {
	const params = await props.params
	const category = params.category

	if (!category || !CATEGORIES.map(({ slug }) => slug).includes(category))
		return NotFoundPage(false)

	const all = await getPreviewProductsData(category)
	const firstItems = all.slice(0, LIMIT)
	const totalPages = Math.ceil(all.length / LIMIT)

	if (!firstItems) return <p className='text-center text-2xl'>No products in this category.</p>

	return (
		<>
			<h1>{getCategoryLabel(category)}</h1>
			<div className='grid-cols w-full relative'>
				{/* ------------------ First LIMIT-number Items Renders On Server ------------------ */}
				{firstItems?.map(item => {
					return (
						<ProductCard
							key={item._id}
							href={`/${category}/${item._id}`}
							title={item.productName}
							imageSrc={item.imageUrl || '/images/default-image.png'}
							brand={item.brand}
							price={item.price}
						/>
					)
				})}

				{/* ---------------- Loads More Items On Scroll On Client Side --------------- */}
				<DynamicWrapperNoChildren
					componentKey='infiniteList'
					exportName='InfiniteList'
					totalPages={totalPages}
					currentPage={1}
					category={category}
				/>
			</div>
			<DynamicButton btnName='ScrollToTopButton' />
		</>
	)
}
