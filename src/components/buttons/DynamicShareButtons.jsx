'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '../ui/SkeletonLoader'

const DynamicShareBtn = dynamic(() => import('./ShareButtons').then(mod => mod.ShareButtons), {
	ssr: false,
	loading: () => <SkeletonLoader />
})
export function DynamicShareButtons({ title }) {
	return <DynamicShareBtn title={title} />
}
