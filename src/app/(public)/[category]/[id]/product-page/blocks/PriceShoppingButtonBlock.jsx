'use client'

import { useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { ShoppingCart } from 'react-feather'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/providers/CartProvider'

export function PriceShoppingButtonBlock({ price = '5995,-', itemId }) {
	const { isSignedIn } = useUser()
	const { isInCart, toggleCartItem } = useCart()

	const isAdded = isInCart(itemId)

	return (
		<div className='w-full flex flex-col gap-4 items-center pb-2 lg:w-1/2 lg:h-full lg:gap-6 lg:pb-0 lg:border-r lg:pr-4 border-dashed border-border'>
			<h3 className='text-3xl lg:text-4xl font-bold text-accent font-nanum'>{price}</h3>
			<Button
				title={isAdded ? 'Remove from cart' : 'Add to shopping cart'}
				aria-label={isAdded ? 'Remove from cart' : 'Add to shopping cart'}
				className='w-full sm:w-1/2 md:w-full'
				disabled={!isSignedIn}
				onClick={isSignedIn ? () => toggleCartItem(itemId) : undefined}
			>
				<ShoppingCart
					fillOpacity='0.7'
					className={clsx(isAdded && 'fill-accent', 'min-w-5 min-h-5 sm:min-w-6 sm:min-h-6')}
				/>
				{isAdded ? 'Remove' : 'Add to cart'}
			</Button>
		</div>
	)
}
