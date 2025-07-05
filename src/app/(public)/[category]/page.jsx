import { CategoryClientPage } from '@/components/CategoryClientPage'
import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES } from '@/constants/categories'
import { LIMIT } from '@/constants/constants'
import { getPreviewProductsData } from '@/services/server/productsData.service'

export const revalidate = 60 //ISR

export async function generateStaticParams() {
	return CATEGORIES.map(category => ({ category }))
}

export default async function CategoryPage(props) {
	const params = await props.params
	const category = params.category

	const all = await getPreviewProductsData(category)
	const firstItems = all.slice(0, LIMIT)
	const totalPages = Math.ceil(all.length / LIMIT)

	const getTitle = item => {
		if (item['Product Name']) return item['Product Name']
		if (item['Model']) return item['Model']
		if (item['Brand'] && item['Model Name']) return `${item['Brand']} ${item['Model Name']}`
		return 'Unknown product name'
	}

	if (!firstItems) return <p className='text-center text-2xl'>No products in this category.</p>

	return (
		<>
			<div className='grid-cols w-full relative'>
				{firstItems?.map(item => {
					const title = getTitle(item)
					return (
						<ProductCard
							key={item._id}
							href={`/${category}/${item._id}`}
							title={title}
							//[TODO] change default image
							imageSrc={item['Picture URL'] || '/images/default-no-product.webp'}
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
		</>
	)
}
