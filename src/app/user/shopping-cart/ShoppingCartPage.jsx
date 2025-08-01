import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'react-feather'
import { ProductCardWide } from '@/components/ProductCardWide'
import PlaceOrderButton from '@/components/buttons/PlaceOrderButton'
import { ToggleCartButton } from '@/components/buttons/ToggleCartButton'
import { ToggleFavoriteButton } from '@/components/buttons/ToggleFavoriteButton'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import Spinner from '@/components/ui/Spinner'
import { useCart } from '@/providers/CartProvider'
import { formatProductTitle } from '@/lib/utils/formatProductTitle'

export function ShoppingCartPage() {
	const { isLoaded, user } = useUser()
	const { detailedCart, detailedCartLoading, loadDetailedCart, clearCart } = useCart()
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedCart()
		}
	}, [isLoaded, user?.id, loadDetailedCart])

	const handleClearCart = () => {
		setIsConfirmOpen(true)
	}

	const hasItems = detailedCart && detailedCart.length > 0

	if (detailedCartLoading)
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
				<h1>Shopping Cart</h1>
				{hasItems && (
					<Button
						className='place-self-end sm:place-self-center'
						onClick={isLoaded && user?.id ? handleClearCart : undefined}
						variant='warn'
					>
						Remove all
					</Button>
				)}
				<ConfirmDialog
					open={isConfirmOpen}
					onClose={() => setIsConfirmOpen(false)}
					onConfirm={clearCart}
					message='Remove all products from cart?'
				/>
			</div>

			{!hasItems && <p>Your cart is empty.</p>}

			{detailedCart.map(product => {
				const title = formatProductTitle(product)
				return (
					<div
						key={product._id}
						className='relative mb-8'
					>
						<ProductCardWide
							href={`/${product.categorySlug}/${product._id}`}
							title={title}
							imageSrc={product['Picture URL'] || '/images/default-image.png'}
							brand={product['Brand']}
							price={product['Price']}
						/>
						<div className='absolute bottom-4 right-2 flex gap-2'>
							<ToggleFavoriteButton
								itemId={product._id}
								category={product.categorySlug}
								variant='icon'
							/>
							<ToggleCartButton
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
			{hasItems && (
				<PlaceOrderButton
					detailedCart={detailedCart}
					loadDetailedCart={loadDetailedCart}
					clearCart={clearCart}
				/>
			)}
		</section>
	)
}
