'use client'

import { useUser } from '@clerk/nextjs'
import { Heart } from 'react-feather'
import { Button } from '../ui/Button'

export function AddToFavoritesButton({ variant, itemId }) {
	const { isLoaded, isSignedIn, user } = useUser()
	// console.log(user.id)
	// const userId = user.id
	// const userFavorites = favoritesService.getAllFavorites(userId)

	// const isFavorite = userFavorites.filter(item)

	const toggleFavorite = () => {
		console.log(itemId)
	}
	return (
		<Button
			title='Add to favorites'
			aria-label='Add to favorites'
			className='w-full'
			disabled={!isSignedIn}
			onClick={isSignedIn ? toggleFavorite : undefined}
		>
			<Heart className='w-5 h-5 sm:w-6 sm:h-6' /> {variant === 'bigScreen' ? 'Favorites' : 'Save'}
		</Button>
	)
}
