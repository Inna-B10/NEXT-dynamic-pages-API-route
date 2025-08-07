import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'react-feather'
import { ProductCardWide } from '@/components/ProductCardWide'
import { DynamicToggleCartButton } from '@/components/buttons/DynamicToggleCartButton'
import { DynamicToggleFavoriteButton } from '@/components/buttons/DynamicToggleFavoriteButton'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import Spinner from '@/components/ui/Spinner'
import { useFavorites } from '@/providers/FavoritesProvider'

export function FavoritesPage() {
	const { isLoaded, user } = useUser()
	const { detailedFavorites, detailedFavLoading, loadDetailedFavorites, clearFavorites } =
		useFavorites()
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedFavorites()
		}
	}, [isLoaded, user?.id, loadDetailedFavorites])

	const handleClearFavorites = () => {
		setIsConfirmOpen(true)
	}

	const hasItems = detailedFavorites && detailedFavorites.length > 0

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
		<section className='w-full max-w-[980px]'>
			<div className='flex flex-col sm:flex-row sm:items-center mb-4'>
				<h1>Favorites</h1>
				{hasItems && (
					<Button
						className='place-self-end sm:place-self-center'
						onClick={isLoaded && user?.id ? handleClearFavorites : undefined}
						variant='warn'
					>
						Remove all
					</Button>
				)}
				<ConfirmDialog
					open={isConfirmOpen}
					onClose={() => setIsConfirmOpen(false)}
					onConfirm={clearFavorites}
					message='Remove all favorites?'
				/>
			</div>
			{!hasItems && <p>You have no favorites</p>}

			{detailedFavorites.map(product => {
				return (
					<div
						key={product._id}
						className='relative mb-8'
					>
						<ProductCardWide
							href={`/${product.categorySlug}/${product._id}`}
							title={product.productName}
							imageSrc={product.imageUrl || '/images/default-image.png'}
							brand={product.brand}
							price={product.price}
						/>
						<div className='absolute bottom-4 right-2 flex gap-2'>
							<DynamicToggleCartButton
								itemId={product._id}
								category={product.categorySlug}
								variant='icon'
							/>
							<DynamicToggleFavoriteButton
								itemId={product._id}
								category={product.categorySlug}
								variant='icon'
								icon={
									<Trash2
										fillOpacity={0.5}
										className='min-w-4 w-5 sm:min-w-6 hover:fill-red-500 stroke-red-500 opacity-70 hover:opacity-100'
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
