'use client'

import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./Header').then(mod => mod.Header), {
	ssr: false
})

export function HeaderDynWrapper() {
	return <DynamicHeader />
}
