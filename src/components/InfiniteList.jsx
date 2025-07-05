import { ProductCard } from './product-cards/ProductCard'
import Spinner from './ui/Spinner'

export default function InfiniteList({
	data,
	isLoading,
	isError,
	isFetchingNextPage,
	lastElementRef,
	category
}) {
	const getTitle = item => {
		if (item['Product Name']) return item['Product Name']
		if (item['Model']) return item['Model']
		if (item['Brand'] && item['Model Name']) return `${item['Brand']} ${item['Model Name']}`
		return 'Unknown product name'
	}

	if (isLoading)
		return (
			<Spinner
				size={60}
				message='Loading...'
			/>
		)
	if (isError) return <p className='text-center text-2xl'>Error loading data.</p>

	return (
		<>
			<div className='grid-cols w-full'>
				{data?.map((item, index) => {
					const title = getTitle(item)
					return (
						<ProductCard
							key={index}
							href={`/${category}/${item._id}`}
							title={title}
							//[TODO] change default image
							imageSrc={item['Picture URL'] || '/images/default-no-product.webp'}
							brand={item['Brand']}
							price={item['Price']}
						/>
					)
				})}
			</div>
			{isFetchingNextPage && (
				<Spinner
					size={60}
					message='Loading more items...'
				/>
			)}
			<div
				ref={lastElementRef}
				style={{ height: 1 }}
			/>
		</>
	)
}
