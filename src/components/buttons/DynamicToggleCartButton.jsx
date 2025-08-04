'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '../ui/SkeletonLoader'

const DynamicToggleCartBtn = dynamic(
	() => import('./ToggleCartButton').then(mod => mod.ToggleCartButton),
	{ ssr: false, loading: () => <SkeletonLoader /> }
)

export function DynamicToggleCartButton({ itemId, category, className, variant, icon }) {
	return (
		<DynamicToggleCartBtn
			itemId={itemId}
			category={category}
			className={className}
			variant={variant}
			icon={icon}
		/>
	)
}
