'use client'

import { useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { ShoppingCart } from 'react-feather'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/providers/CartProvider'

export function ToggleCartButton({ itemId, category, className, variant, icon }) {
	const { isSignedIn } = useUser()
	const { isInCart, toggleCartItem } = useCart()

	const isAdded = isInCart(itemId)
	return (
		<Button
			title={isAdded ? 'Remove from cart' : 'Add to shopping cart'}
			aria-label={isAdded ? 'Remove from cart' : 'Add to shopping cart'}
			aria-pressed={isAdded}
			className={className}
			variant={variant}
			disabled={!isSignedIn}
			onClick={isSignedIn ? () => toggleCartItem(itemId, category) : undefined}
		>
			{icon ? (
				icon
			) : (
				<ShoppingCart
					fillOpacity='0.7'
					className={clsx('min-w-4 w-5 sm:min-w-6 text-accent hover:opacity-100', {
						'fill-accent': isAdded,
						'opacity-70': !isAdded && variant === 'icon'
					})}
				/>
			)}
			{variant !== 'icon' && (isAdded ? 'Remove' : 'Add to cart')}
		</Button>
	)
}
