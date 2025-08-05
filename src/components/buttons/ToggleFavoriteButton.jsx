'use client'

import { useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { Heart } from 'react-feather'
import { useFavorites } from '@/providers/FavoritesProvider'
import { Button } from '../ui/Button'

export function ToggleFavoriteButton({ itemId, category, className, variant, icon }) {
	const { isSignedIn } = useUser()
	const { isFavorite, toggleFavorite } = useFavorites()

	const isInFav = isFavorite(itemId)

	return (
		<Button
			title={
				isSignedIn
					? isInFav
						? 'Remove from favorites'
						: 'Add to favorites'
					: 'Sign in to add to favorites'
			}
			aria-label={
				isSignedIn
					? isInFav
						? 'Remove from favorites'
						: 'Add to favorites'
					: 'Sign in to add to favorites'
			}
			aria-pressed={isInFav}
			className={className}
			variant={variant}
			disabled={!isSignedIn}
			onClick={isSignedIn ? () => toggleFavorite(itemId, category) : undefined}
		>
			{icon ? (
				icon
			) : (
				<Heart
					fillOpacity='0.7'
					className={clsx('min-w-4 w-5 sm:min-w-6 text-accent hover:opacity-100', {
						'fill-accent': isInFav,
						'opacity-70': !isInFav && variant === 'icon'
					})}
				/>
			)}
			{variant !== 'icon' && (isInFav ? ' Remove' : ' Add to Favorites')}
		</Button>
	)
}
