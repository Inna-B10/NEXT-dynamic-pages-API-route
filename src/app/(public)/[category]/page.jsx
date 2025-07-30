import { ProductCard } from '@/components/ProductCard'
import ScrollToTopButton from '@/components/buttons/ScrollToTopButton'
import { CATEGORIES } from '@/constants/categories'
import { LIMIT } from '@/constants/constants'
import { CategoryClientPage } from '@/app/(public)/[category]/CategoryClientPage'
import NotFoundPage from '@/app/not-found'
import { PUB_PAGES } from '@/lib/routes/public-pages'
import { formatProductTitle } from '@/lib/utils/formatProductTitle'
import { getCategoryLabel } from '@/lib/utils/getCategoryLabel'
import { getPreviewProductsData } from '@/services/server/productsData.service'

export const revalidate = 60 //ISR

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

export async function generateStaticParams() {
	return CATEGORIES.map(({ slug }) => ({ category: slug }))
}

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
				{firstItems?.map(item => {
					const title = formatProductTitle(item)
					return (
						<ProductCard
							key={item._id}
							href={`/${category}/${item._id}`}
							title={title}
							imageSrc={item['Picture URL'] || '/images/default-image.png'}
							brand={item['Brand']}
							price={item['Price']}
						/>
					)
				})}

				{/* The client interactive component is loaded here */}
				<CategoryClientPage
					totalPages={totalPages}
					currentPage={1}
					category={category}
				/>
			</div>
			<ScrollToTopButton />
		</>
	)
}
