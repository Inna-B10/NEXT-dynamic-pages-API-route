import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
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
	}, [isLoaded, user?.id])

	if (detailedLoading) return <p>Загрузка...</p>

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
