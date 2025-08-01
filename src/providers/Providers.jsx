import { useState } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './CartProvider'
import { FavoritesProvider } from './FavoritesProvider'
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
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				variables: {
					colorBackground: '#161A1D',
					colorPrimary: '#00CADB',
					colorTextOnPrimaryBackground: 'black'
				}
			}}
		>
			<QueryClientProvider client={queryClient}>
				<LazyMotion features={domAnimation}>
					<SidebarProvider>
						<CartProvider>
							<FavoritesProvider>{children}</FavoritesProvider>
						</CartProvider>
					</SidebarProvider>
					<Toaster
						toastOptions={{
							style: {
								backgroundColor: '#3f3f46',
								color: 'white'
							},
							className: 'border border-white/20 shadow-lg'
						}}
					/>
				</LazyMotion>
			</QueryClientProvider>
		</ClerkProvider>
	)
}
