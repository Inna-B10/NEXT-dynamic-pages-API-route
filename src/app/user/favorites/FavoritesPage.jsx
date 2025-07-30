import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Spinner from '@/components/ui/Spinner'
import { useFavorites } from '@/providers/FavoritesProvider'
import { formatProductTitle } from '@/lib/utils/formatProductTitle'

export function FavoritesPage() {
	const { isLoaded, user } = useUser()
	const { detailedFavorites, detailedLoading, loadDetailedFavorites, toggleFavorite } =
		useFavorites()

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedFavorites()
		}
	}, [isLoaded, user?.id, loadDetailedFavorites])

	if (detailedLoading)
		return (
			<div className='z-10 absolute top-full left-1/2 translate-x-[-50%]'>
				<Spinner
					size={60}
					message='Loading...'
				/>
			</div>
		)

	return (
		<section>
			<h1>Favorites</h1>

			<ul>
				{detailedFavorites.map(product => {
					const title = formatProductTitle(product)
					console.log(product)
					return (
						<li key={product._id}>
							<h3>{title}</h3>
							<button onClick={() => toggleFavorite(product._id, product.categorySlug)}>
								Delete
							</button>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
