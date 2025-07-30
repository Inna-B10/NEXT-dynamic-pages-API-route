'use client'

import dynamic from 'next/dynamic'
import Spinner from '@/components/ui/Spinner'

const DynamicShoppingCartPage = dynamic(
	() => import('./ShoppingCartPage').then(mod => mod.ShoppingCartPage),
	{
		ssr: false,
		loading: () => (
			<div className='z-10 absolute top-full left-1/2 translate-x-[-50%]'>
				<Spinner
					size={60}
					message='Loading...'
				/>
			</div>
		)
	}
)
export function ShoppingCartDynPage() {
	return <DynamicShoppingCartPage />
}
