'use client'

import { createContext, useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { favoritesService } from '@/services/client/favorites.service'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
	const { isLoaded, user } = useUser()
	const userId = user?.id

	const queryClient = useQueryClient()

	/* -------------------------- Light Mode (only Ids) ------------------------- */
	const { data: favorites = [], isLoading: loadingFav } = useQuery({
		queryKey: ['favorites', userId],
		queryFn: () =>
			favoritesService.getFavoritesIds(userId).then(res => res.data.map(f => f.productId)),
		enabled: isLoaded && !!userId,
		onError: error => {
			toast.error('Error loading favorites')
			if (isDev()) console.error('Error fetching favorites:', error)
		}
	})

	/* --------------------------- Full Mode (details) -------------------------- */
	const {
		data: detailedFavorites = [],
		isLoading: detailedLoading,
		refetch: loadDetailedFavorites
	} = useQuery({
		queryKey: ['detailedFavorites', userId],
		queryFn: () => {
			if (!userId) return []
			return favoritesService.getDetailedFavorites(userId).then(res =>
				res.data.map(item => ({
					...item.product,
					addedAt: item.addedAt,
					categorySlug: item.product.categorySlug
				}))
			)
		},
		enabled: isLoaded && !!userId,
		onError: error => {
			toast.error('Error loading favorites')
			if (isDev()) console.error('Error fetching detailed favorites:', error)
		}
	})

	/* ---------------------------- Toggle Favorites ---------------------------- */
	const toggleFavoriteMutation = useMutation({
		mutationKey: ['toggleFavorite'],
		mutationFn: async ({ productId, category }) => {
			const isInFavorites = favorites.includes(productId)

			if (isInFavorites) {
				await favoritesService.deleteFavorite(userId, productId)
			} else {
				await favoritesService.addFavorite(userId, productId, category)
			}
		},
		onMutate: async ({ productId }) => {
			await queryClient.cancelQueries(['favorites', userId])

			const previousFavorites = queryClient.getQueryData(['favorites', userId])

			queryClient.setQueryData(['favorites', userId], oldFavorites => {
				if (!oldFavorites) return []
				if (oldFavorites.includes(productId)) return oldFavorites.filter(id => id !== productId)
				else return [...oldFavorites, productId]
			})

			return { previousFavorites }
		},

		onError: (error, variables, context) => {
			toast.error('Failed to update favorites')
			if (isDev()) console.error('Error toggling favorite:', error)

			if (context?.previousFavorites) {
				queryClient.setQueryData(['favorites', userId], context.previousFavorites)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries(['favorites', userId])
			queryClient.invalidateQueries(['detailedFavorites', userId])
		}
	})
	const toggleFavorite = (productId, category) => {
		if (!isLoaded || !userId) return

		toggleFavoriteMutation.mutate({ productId, category })
	}

	const isFavorite = productId => {
		return favorites.includes(productId)
	}

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				toggleFavorite,
				isFavorite,
				loadingFav,
				detailedFavorites,
				loadDetailedFavorites,
				detailedLoading
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => useContext(FavoritesContext)
