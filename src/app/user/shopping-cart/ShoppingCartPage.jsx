import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import PlaceOrderButton from '@/components/buttons/PlaceOrderButton'
import { ProductActionButtons } from '@/components/buttons/ProductActionButtons'
import { OrderSuccessMessage } from '@/components/orderForm/OrderSuccessMessage'
import { ProductCardWide } from '@/components/product/ProductCardWide'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
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

	return (
		!detailedCartLoading && (
			<section className='w-full max-w-[980px] mb-20'>
				<div className='flex flex-col sm:flex-row sm:items-center mb-4'>
					<h1>Shopping Cart</h1>

					{/* --------------------------- Button - Remove All -------------------------- */}
					{hasItems && (
						<Button
							className='place-self-end sm:place-self-center'
							onClick={isLoaded && user?.id ? handleClearCart : undefined}
							variant='warn'
						>
							Remove all
						</Button>
					)}

					{/* ----------------------- Confirm Dialog - Remove All ---------------------- */}
					<ConfirmDialog
						open={showConfirmDelete}
						onClose={() => setShowConfirmDelete(false)}
						onConfirm={clearCart}
						message='Remove all products from cart?'
					/>
				</div>

				{!hasItems && <p>Your cart is empty.</p>}

				{/* ------------------------------- Product Cards ---------------------------------- */}
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

							{/* ---------------------- Toggle Favorites/Cart Buttons --------------------- */}
							<ProductActionButtons
								itemId={product._id}
								category={product.categorySlug}
								trashFor='cart'
							/>
						</div>
					)
				})}

				{/* -------------------------- Order Success Message ------------------------- */}
				<OrderSuccessMessage
					isMessageOpen={showSuccessMessage}
					onClose={() => setShowSuccessMessage(false)}
				/>

				{/* ----------------------- Price + Place Order Button ----------------------- */}
				{hasItems && (
					<div className='flex flex-col items-end bp480:flex-row bp480:justify-between bp480:items-center gap-8'>
						<div className='text-xl font-bold text-accent'>
							Total: {detailedCart.reduce((acc, curr) => acc + curr.price, 0)} kr
						</div>
						<PlaceOrderButton
							detailedCart={detailedCart}
							loadDetailedCart={loadDetailedCart}
							clearCart={clearCart}
							onOrderSuccess={() => setShowSuccessMessage(true)}
						/>
					</div>
				)}
			</section>
		)
	)
}
