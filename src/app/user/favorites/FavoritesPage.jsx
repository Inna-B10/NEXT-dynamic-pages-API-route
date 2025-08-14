import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ProductActionButtons } from '@/components/buttons/ProductActionButtons'
import { ProductCardWide } from '@/components/product/ProductCardWide'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useFavorites } from '@/providers/FavoritesProvider'

export function FavoritesPage() {
	const { isLoaded, user } = useUser()
	const { detailedFavorites, detailedFavLoading, loadDetailedFavorites, clearFavorites } =
		useFavorites()
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedFavorites()
		}
	}, [isLoaded, user?.id, loadDetailedFavorites])

	const handleClearFavorites = () => {
		setShowConfirmDelete(true)
	}

	const hasItems = detailedFavorites && detailedFavorites.length > 0

	return (
		!detailedFavLoading && (
			<div className='w-full max-w-[980px]'>
				<div className='flex flex-col sm:flex-row sm:items-center mb-4'>
					<h1>Favorites</h1>

					{/* --------------------------- Button - Remove All -------------------------- */}
					{hasItems && (
						<Button
							className='place-self-end sm:place-self-center'
							onClick={isLoaded && user?.id ? handleClearFavorites : undefined}
							variant='warn'
						>
							Remove all
						</Button>
					)}

					{/* ----------------------- Confirm Dialog - Remove All ---------------------- */}
					<ConfirmDialog
						open={showConfirmDelete}
						onClose={() => setShowConfirmDelete(false)}
						onConfirm={clearFavorites}
						message='Remove all favorites?'
					/>
				</div>
				{!hasItems && <p>You have no favorites</p>}

				{/* ------------------------------- Product Cards ---------------------------------- */}
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

							{/* ---------------------- Toggle Favorites/Cart Buttons --------------------- */}
							<ProductActionButtons
								itemId={product._id}
								category={product.categorySlug}
								trashFor='favorites'
							/>
						</div>
					)
				})}
			</div>
		)
	)
}
