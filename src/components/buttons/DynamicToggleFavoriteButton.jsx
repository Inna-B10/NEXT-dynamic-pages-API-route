'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '../ui/SkeletonLoader'

const DynamicToggleFavoriteBtn = dynamic(
	() => import('./ToggleFavoriteButton').then(mod => mod.ToggleFavoriteButton),
	{ ssr: false, loading: () => <SkeletonLoader /> }
)

export function DynamicToggleFavoriteButton({ itemId, category, className, variant, icon }) {
	return (
		<DynamicToggleFavoriteBtn
			itemId={itemId}
			category={category}
			className={className}
			variant={variant}
			icon={icon}
		/>
	)
}
