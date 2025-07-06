import { useEffect, useRef, useState } from 'react'
import { LIMIT } from '@/constants/constants'
import { ProductCard } from './ProductCard'
import Spinner from './ui/Spinner'
import { formatProductTitle } from '@/lib/utils/formatProductTitle'

export default function InfiniteList({ totalPages, currentPage, category }) {
	const [page, setPage] = useState(currentPage + 1)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const loaderRef = useRef(null)

	const loadMore = async () => {
		if (page > totalPages || isLoading) return
		setIsLoading(true)
		const res = await fetch(`/api/products/${category}?page=${page}&limit=${LIMIT}`)
		const data = await res.json()
		setItems(prev => [...prev, ...data.items])
		setPage(p => p + 1)
		setIsLoading(false)
	}

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) loadMore()
		})
		if (loaderRef.current) observer.observe(loaderRef.current)
		return () => observer.disconnect()
	}, [loaderRef.current])

	if (isLoading)
		return (
			<div className='z-10 absolute top-full left-1/2 translate-x-[-50%]'>
				<Spinner
					size={60}
					message='Loading more...'
				/>
			</div>
		)
	if (!items) return

	return (
		<>
			{items?.map(item => {
				const title = formatProductTitle(item)
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

			<div
				ref={loaderRef}
				style={{ height: 1 }}
			/>
		</>
	)
}
