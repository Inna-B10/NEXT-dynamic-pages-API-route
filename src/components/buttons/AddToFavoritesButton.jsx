'use client'

import { useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { Heart } from 'react-feather'
import { useFavorites } from '@/providers/FavoritesProvider'
import { Button } from '../ui/Button'

export function AddToFavoritesButton({ itemId }) {
	const { isSignedIn } = useUser()
	const { isFavorite, toggleFavorite } = useFavorites()

	const isInFav = isFavorite(itemId)

	return (
		<Button
			title={isInFav ? 'Remove from favorites' : 'Add to favorites'}
			aria-label={isInFav ? 'Remove from favorites' : 'Add to favorites'}
			className='w-full'
			disabled={!isSignedIn}
			onClick={isSignedIn ? () => toggleFavorite(itemId) : undefined}
		>
			<Heart
				fillOpacity='0.7'
				className={clsx('min-w-5 min-h-5 sm:min-w-6 sm:min-h-6', isInFav && 'fill-accent')}
			/>{' '}
			{isInFav ? 'Remove' : 'Add to Favorites'}
		</Button>
	)
}
