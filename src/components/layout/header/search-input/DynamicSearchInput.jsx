'use client'

import dynamic from 'next/dynamic'

const DynamicSearchInput = dynamic(() => import('./SearchInput').then(mod => mod.SearchInput), {
	ssr: false
})

export default DynamicSearchInput
