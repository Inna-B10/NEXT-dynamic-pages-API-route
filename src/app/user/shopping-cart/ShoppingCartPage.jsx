import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'react-feather'
import { DynamicToggleCartButton } from '@/components/buttons/DynamicToggleCartButton'
import { DynamicToggleFavoriteButton } from '@/components/buttons/DynamicToggleFavoriteButton'
import PlaceOrderButton from '@/components/buttons/PlaceOrderButton'
import { OrderSuccessMessage } from '@/components/orderForm/OrderSuccessMessage'
import { ProductCardWide } from '@/components/product/ProductCardWide'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import Spinner from '@/components/ui/Spinner'
import { useCart } from '@/providers/CartProvider'

export function ShoppingCartPage() {
	const { isLoaded, user } = useUser()
	const { detailedCart, detailedCartLoading, loadDetailedCart, clearCart } = useCart()
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedCart()
		}
	}, [isLoaded, user?.id, loadDetailedCart])

	const handleClearCart = () => {
		setShowConfirmDelete(true)
	}

	const hasItems = detailedCart && detailedCart.length > 0

	if (detailedCartLoading)
		return (
			<div className='z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
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

				{/* confirm dialog - delete all products from cart */}
				<ConfirmDialog
					open={showConfirmDelete}
					onClose={() => setShowConfirmDelete(false)}
					onConfirm={clearCart}
					message='Remove all products from cart?'
				/>
			</div>

			{!hasItems && <p>Your cart is empty.</p>}

			{detailedCart.map(product => {
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
							<DynamicToggleFavoriteButton
								itemId={product._id}
								category={product.categorySlug}
								variant='icon'
							/>
							<DynamicToggleCartButton
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

			{/* show order success message */}
			<OrderSuccessMessage
				isMessageOpen={showSuccessMessage}
				onClose={() => setShowSuccessMessage(false)}
			/>

			{hasItems && (
				<PlaceOrderButton
					detailedCart={detailedCart}
					loadDetailedCart={loadDetailedCart}
					clearCart={clearCart}
					onOrderSuccess={() => setShowSuccessMessage(true)}
				/>
			)}
		</section>
	)
}
