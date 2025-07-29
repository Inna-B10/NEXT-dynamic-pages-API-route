'use client'

import dynamic from 'next/dynamic'

const DynamicFavoritesPage = dynamic(
	() => import('./FavoritesPage').then(mod => mod.FavoritesPage),
	{
		ssr: false
	}
)
export function FavoritesDynPage() {
	return <DynamicFavoritesPage />
}
