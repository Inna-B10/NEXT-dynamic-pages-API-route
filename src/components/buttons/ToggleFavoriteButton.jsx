'use client'

import { Heart } from 'react-feather'
import { useFavorites } from '@/providers/FavoritesProvider'
import { ToggleItemButton } from './ToggleItemButton'

export function ToggleFavoriteButton(props) {
	return (
		<ToggleItemButton
			{...props}
			useHook={useFavorites}
			checkFnName='isFavorite'
			toggleFnName='toggleFavorite'
			defaultIcon={Heart}
			text='Favorites'
		/>
	)
}
