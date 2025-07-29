'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { favoritesService } from '@/services/client/favorites.service'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
	const { isLoaded, user } = useUser()
	const [favorites, setFavorites] = useState([])
	const [loadingFav, setLoadingFav] = useState(true)

	const userId = user?.id

	useEffect(() => {
		if (!isLoaded) return

		const fetchFavorites = async () => {
			try {
				const { data } = await favoritesService.getAllFavorites(userId)
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

	const toggleFavorite = async productId => {
		if (!isLoaded || !userId) return

		const isInFavorites = favorites.includes(productId)

		try {
			if (isInFavorites) {
				await favoritesService.deleteFavorite(userId, productId)
				setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId))
			} else {
				await favoritesService.addFavorite(userId, productId)
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
		<FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loadingFav }}>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => useContext(FavoritesContext)
