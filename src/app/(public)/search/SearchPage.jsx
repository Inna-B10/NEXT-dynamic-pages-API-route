import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { searchService } from '@/services/client/search.service'

export function SearchPage() {
	const params = useSearchParams()
	const query = params.get('query')
	const [results, setResults] = useState([])

	useEffect(() => {
		if (!query) return
		const fetchResults = async () => {
			const { data } = await searchService.getDetailedSearch(query)
			setResults(data)
		}
		fetchResults()
	}, [query])

	return (
		<>
			<h1>
				Search results for: <i>{query}</i>
			</h1>
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
