'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { favoritesService } from '@/services/client/favorites.service'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
	const { isLoaded, user } = useUser()
	const userId = user?.id

	const [favorites, setFavorites] = useState([]) // only productId[]
	const [loadingFav, setLoadingFav] = useState(true)

	const [detailedFavorites, setDetailedFavorites] = useState([]) // favorites with details
	const [detailedLoading, setDetailedLoading] = useState(false)

	/* -------------------------- Light Mode (only Ids) ------------------------- */
	useEffect(() => {
		if (!isLoaded) return

		const fetchFavorites = async () => {
			try {
				const { data } = await favoritesService.getFavoritesIds(userId)
				if (!data) return
				const productIds = data.map(fav => fav.productId)
				setFavorites(productIds)
			} catch (error) {
				if (isDev()) {
					console.error('Error fetching favorites:', error)
				}
			} finally {
				setLoadingFav(false)
			}
		}
		fetchFavorites()
	}, [isLoaded, userId])

	/* --------------------------- Full Mode (details) -------------------------- */
	const loadDetailedFavorites = async () => {
		if (!isLoaded || !userId) return
		setDetailedLoading(true)

		try {
			const { data } = await favoritesService.getDetailedFavorites(userId)
			setDetailedFavorites(
				data.map(item => ({
					...item.product,
					addedAt: item.addedAt,
					categorySlug: item.product.categorySlug
				})) || []
			)
		} catch (error) {
			toast.error('Error loading favorites')
			if (isDev()) console.error('Error fetching detailed favorites:', error)
		} finally {
			setDetailedLoading(false)
		}
	}

	/* ---------------------------- Toggle Favorites ---------------------------- */
	const toggleFavorite = async (productId, category) => {
		if (!isLoaded || !userId) return

		const isInFavorites = favorites.includes(productId)

		try {
			if (isInFavorites) {
				await favoritesService.deleteFavorite(userId, productId)
				setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId))
				setDetailedFavorites(prev => prev.filter(item => item._id !== productId))
			} else {
				await favoritesService.addFavorite(userId, productId, category)
				setFavorites(prevFavorites => [...prevFavorites, productId])
			}
		} catch (error) {
			// Rollback the UI if the request fails
			setFavorites(prev => {
				if (isInFavorites) return [...prev, productId]
				else return prev.filter(id => id !== productId)
			})
			toast.error('Failed to update favorites')

			if (isDev()) {
				console.error('Error toggling favorite:', error)
			}
		}
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
