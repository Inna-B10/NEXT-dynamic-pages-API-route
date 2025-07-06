'use client'

import dynamic from 'next/dynamic'

const DynamicProviders = dynamic(() => import('./Providers').then(mod => mod.Providers), {
	ssr: false
})

export default function ProvidersDynWrapper({ children }) {
	return <DynamicProviders>{children}</DynamicProviders>
}
