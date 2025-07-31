import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'react-feather'
import { ProductCardWide } from '@/components/ProductCardWide'
import { ToggleCartButton } from '@/components/buttons/ToggleCartButton'
import { ToggleFavoriteButton } from '@/components/buttons/ToggleFavoriteButton'
import Spinner from '@/components/ui/Spinner'
import { useFavorites } from '@/providers/FavoritesProvider'
import { formatProductTitle } from '@/lib/utils/formatProductTitle'

export function FavoritesPage() {
	const { isLoaded, user } = useUser()
	const { detailedFavorites, detailedFavLoading, loadDetailedFavorites } = useFavorites()

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedFavorites()
		}
	}, [isLoaded, user?.id, loadDetailedFavorites])

	if (detailedFavLoading)
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

			{detailedFavorites.map(product => {
				const title = formatProductTitle(product)
				return (
					<div
						key={product._id}
						className='relative w-full lg:w-4/5 2xl:w-3/4 mb-8'
					>
						<ProductCardWide
							href={`/${product.categorySlug}/${product._id}`}
							title={title}
							imageSrc={product['Picture URL'] || '/images/default-image.png'}
							brand={product['Brand']}
							price={product['Price']}
						/>
						<div className='absolute bottom-2 right-2 flex gap-2'>
							<ToggleCartButton
								itemId={product._id}
								category={product.categorySlug}
								variant='icon'
							/>
							<ToggleFavoriteButton
								itemId={product._id}
								category={product.categorySlug}
								variant='icon'
								icon={
									<Trash2
										size={20}
										fillOpacity={0.5}
										className='hover:fill-red-500 stroke-red-500 lg:size-6 opacity-70 hover:opacity-100'
									/>
								}
							/>
						</div>
					</div>
				)
			})}
		</section>
	)
}
