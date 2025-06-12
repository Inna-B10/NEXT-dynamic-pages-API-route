'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { SidebarProvider } from './SidebarProvider'

export function Providers({ children }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					},
					mutations: {
						retry: 1
					}
				}
			})
	)
	return (
		<QueryClientProvider client={queryClient}>
			<LazyMotion features={domAnimation}>
				<SidebarProvider>{children}</SidebarProvider>
			</LazyMotion>
		</QueryClientProvider>
	)
}
