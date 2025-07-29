'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { cartService } from '@/services/client/cart.service'

const CartContext = createContext()

export function CartProvider({ children }) {
	const { isLoaded, user } = useUser()
	const [cartItems, setCartItems] = useState([])

	const [loadingCart, setLoadingCart] = useState(true)

	const userId = user?.id

	useEffect(() => {
		if (!isLoaded) return

		const fetchCart = async () => {
			try {
				const { data } = await cartService.getAllCartItems(userId)
				if (!data) return
				const productIds = data.map(item => item.productId)
				setCartItems(productIds)
			} catch (error) {
				if (isDev()) {
					console.error('Error fetching cart items:', error)
				}
			} finally {
				setLoadingCart(false)
			}
		}
		fetchCart()
	}, [isLoaded, userId])

	const toggleCartItem = async productId => {
		if (!isLoaded || !userId) return

		const isExist = cartItems.includes(productId)
		try {
			if (isExist) {
				await cartService.deleteCartItem(userId, productId)
				setCartItems(prev => prev.filter(id => id !== productId))
			} else {
				await cartService.addCartItem(userId, productId)
				setCartItems(prev => [...prev, productId])
			}
		} catch (error) {
			// Rollback the UI if the request fails
			setCartItems(prev => {
				if (isExist) return [...prev, productId]
				else return prev.filter(id => id !== productId)
			})
			toast.error('Failed to update cart items')

			if (isDev()) {
				console.error('Error toggling cart item:', error)
			}
		}
	}

	const isInCart = productId => {
		return cartItems.includes(productId)
	}

	return (
		<CartContext.Provider value={{ cartItems, toggleCartItem, isInCart, loadingCart }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
