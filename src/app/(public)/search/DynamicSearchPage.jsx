'use client'

import dynamic from 'next/dynamic'
import Spinner from '@/components/ui/Spinner'

export const DynamicSearchPage = dynamic(() => import('./SearchPage').then(mod => mod.SearchPage), {
	ssr: false,
	loading: () => (
		<div className='z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
			<Spinner
				size={60}
				message='Loading...'
			/>
		</div>
	)
})
