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
		item['Product Name']
			? item['Product Name']
			: item['Alternate names']
				? item['Alternate names']
				: item['Brand'] && item['Model']
					? item['Brand'] + ' ' + item['Model']
					: 'Unknown product name'
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
					const title = getTitle()
					return (
						<ProductCard
							key={index}
							href={`/${category}/${item._id}`}
							title={title}
							//[TODO] change default image
							imageSrc={item['Picture URL'] || '/images/default-no-product.webp'}
							brand={item['Brand']}
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
