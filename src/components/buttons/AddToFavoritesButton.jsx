'use client'

import { useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { Heart } from 'react-feather'
import { useFavorites } from '@/providers/FavoritesProvider'
import { Button } from '../ui/Button'

export function AddToFavoritesButton({ variant, itemId }) {
	const { isSignedIn } = useUser()
	const { isFavorite, toggleFavorite } = useFavorites()

	const isInFav = isFavorite(itemId)

	return (
		<Button
			title='Add to favorites'
			aria-label='Add to favorites'
			className='w-full'
			disabled={!isSignedIn}
			onClick={isSignedIn ? () => toggleFavorite(itemId) : undefined}
		>
			<Heart className={clsx('min-w-5 min-h-5 sm:min-w-6 sm:min-h-6', isInFav && 'fill-accent')} />{' '}
			{isInFav ? 'Remove' : variant === 'bigScreen' ? 'Add Favorite' : 'Save'}
		</Button>
	)
}
