'use client'

import { ShoppingCart } from 'react-feather'
import { useCart } from '@/providers/CartProvider'
import { ToggleItemButton } from './ToggleItemButton'

export function ToggleCartButton(props) {
	return (
		<ToggleItemButton
			{...props}
			useHook={useCart}
			checkFnName='isInCart'
			toggleFnName='toggleCartItem'
			defaultIcon={ShoppingCart}
			text='Cart'
		/>
	)
}
