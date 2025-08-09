import { createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { favoritesService } from '@/services/client/favorites.service'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
	const pathname = usePathname()

	const { isLoaded, user } = useUser()
	const userId = user?.id

	const queryClient = useQueryClient()

	/* -------------------------- Light Mode (only Ids) ------------------------- */
	const { data: favorites = [], isLoading: loadingFav } = useQuery({
		queryKey: ['favorites', userId],
		queryFn: () => favoritesService.getFavoritesIds().then(res => res.data.map(f => f.productId)),
		enabled: isLoaded && !!userId,
		onError: error => {
			toast.error('Error loading favorites')
			if (isDev()) console.error('Error fetching favorites:', error)
		}
	})

	/* --------------------------- Full Mode (details) -------------------------- */
	const {
		data: detailedFavorites = [],
		isLoading: detailedFavLoading,
		refetch: loadDetailedFavorites
	} = useQuery({
		queryKey: ['detailedFavorites', userId],
		queryFn: () => {
			if (!userId) return []
			return favoritesService.getDetailedFavorites().then(res =>
				res.data.map(item => ({
					...item.product,
					addedAt: item.addedAt,
					categorySlug: item.product.categorySlug
				}))
			)
		},
		enabled: isLoaded && !!userId && pathname === '/user/favorites',
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
				await favoritesService.deleteFavorite(productId)
			} else {
				await favoritesService.addFavorite(productId, category)
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

		onError: (error, context) => {
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

	/* -------------------------- Delete All Favorites -------------------------- */
	const clearFavoritesMutation = useMutation({
		mutationKey: ['clearFavorites'],
		mutationFn: async () => await favoritesService.clearFavorites(),
		onError: error => {
			toast.error('Failed to clear favorites')
			if (isDev()) console.error('Error clearing favorites:', error)
		},
		onSettled: () => {
			queryClient.invalidateQueries(['favorites', userId])
			queryClient.invalidateQueries(['detailedFavorites', userId])
		}
	})

	const clearFavorites = () => {
		if (!isLoaded || !userId) return
		clearFavoritesMutation.mutate()
	}
	/* ------------------------------- IsFavorite ------------------------------- */
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
				detailedFavLoading,
				clearFavorites
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => useContext(FavoritesContext)
