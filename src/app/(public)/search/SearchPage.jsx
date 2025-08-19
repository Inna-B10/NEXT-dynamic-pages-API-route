import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ScrollToTopButton from '@/components/buttons/ScrollToTopButton'
import { ProductCard } from '@/components/product/ProductCard'
import Spinner from '@/components/ui/Spinner'
import { isDev } from '@/lib/utils/isDev'
import { searchService } from '@/services/client/search.service'

export function SearchPage() {
	const params = useSearchParams()
	const query = params.get('query')

	const {
		data: response,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ['search', query],
		queryFn: () => searchService.getDetailedSearch(query),
		enabled: !!query,
		keepPreviousData: true,
		staleTime: 1000 * 60 * 2,
		onError: error => {
			toast.error(`Failed to fetch search results, ${error.message}`)
			if (isDev()) console.error('Failed to fetch search results', error)
		}
	})

	if (isError) {
		if (isDev()) console.error('Failed to fetch search results', error.response.data.error)

		return <p className='text-red-500 text-lg'>Something went wrong</p>
	}

	const results = response?.data || []
	if (isLoading)
		return (
			<Spinner
				size={60}
				message='Loading...'
			/>
		)

	return (
		<>
			<ScrollToTopButton />
			<div className='flex flex-col mb-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2 sm:mt-4 lg:mt-8 sm:mb-8 lg:mb-12'>
				<h1 className='text-left sm:my-0'>
					Search results for: <i>{query}</i>
				</h1>
				<div className='text-nowrap'>Found matches: {results.length}</div>
			</div>
			{results.length === 0 ? (
				<p>No results found</p>
			) : (
				<div className='grid-cols w-full relative'>
					{results.map(item => {
						return (
							<ProductCard
								key={item._id}
								href={`/${item.category}/${item._id}`}
								title={item.productName}
								imageSrc={item.imageUrl || '/images/default-image.png'}
								brand={item.brand}
								price={item.price}
							/>
						)
					})}
				</div>
			)}
		</>
	)
}
