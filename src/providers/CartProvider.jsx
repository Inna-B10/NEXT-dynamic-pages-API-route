'use client'

import { createContext, useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { cartService } from '@/services/client/cart.service'

const CartContext = createContext()

export function CartProvider({ children }) {
	const { isLoaded, user } = useUser()
	const userId = user?.id

	const queryClient = useQueryClient()

	/* -------------------------- Light Mode (only Ids) ------------------------- */
	const { data: cartItems = [], isLoading: loadingCart } = useQuery({
		queryKey: ['shoppingCart', userId],
		queryFn: () => cartService.getCartItemsIds(userId).then(res => res.data.map(i => i.productId)),
		enabled: isLoaded && !!userId,
		onError: error => {
			toast.error('Error loading shopping cart')
			if (isDev()) console.error('Error fetching shopping cart:', error)
		}
	})

	/* --------------------------- Full Mode (details) -------------------------- */
	const {
		data: detailedCart = [],
		isLoading: detailedCartLoading,
		refetch: loadDetailedCart
	} = useQuery({
		queryKey: ['detailedCart', userId],
		queryFn: () => {
			if (!userId) return []
			return cartService.getCartItemsDetails(userId).then(res =>
				res.data.map(item => ({
					...item.product,
					addedAt: item.addedAt,
					categorySlug: item.product.categorySlug
				}))
			)
		},
		enabled: isLoaded && !!userId,
		onError: error => {
			toast.error('Error loading shopping cart')
			if (isDev()) console.error('Error fetching detailed shopping cart:', error)
		}
	})

	/* ---------------------------- Toggle Cart Item ---------------------------- */
	const toggleCartItemMutation = useMutation({
		mutationKey: ['toggleCartItem'],
		mutationFn: async ({ productId, category }) => {
			const isAdded = cartItems.includes(productId)

			if (isAdded) {
				await cartService.deleteCartItem(userId, productId)
			} else {
				await cartService.addCartItem(userId, productId, category)
			}
		},
		onMutate: async ({ productId }) => {
			await queryClient.cancelQueries(['shoppingCart', userId])

			const previousCart = queryClient.getQueryData(['shoppingCart', userId])

			queryClient.setQueryData(['shoppingCart', userId], oldCart => {
				if (!oldCart) return []
				if (oldCart.includes(productId)) return oldCart.filter(id => id !== productId)
				else return [...oldCart, productId]
			})

			return { previousCart }
		},

		onError: (error, context) => {
			toast.error('Failed to update shopping cart')
			if (isDev()) console.error('Error toggling cart item:', error)

			if (context?.previousCart) {
				queryClient.setQueryData(['shoppingCart', userId], context.previousCart)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries(['shoppingCart', userId])
			queryClient.invalidateQueries(['detailedCart', userId])
		}
	})
	const toggleCartItem = (productId, category) => {
		if (!isLoaded || !userId) return

		toggleCartItemMutation.mutate({ productId, category })
	}
	/* -------------------------------- IsInCart -------------------------------- */
	const isInCart = productId => {
		return cartItems.includes(productId)
	}

	return (
		<CartContext.Provider
			value={{
				cartItems,
				toggleCartItem,
				isInCart,
				loadingCart,
				detailedCart,
				loadDetailedCart,
				detailedCartLoading
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
