'use client'

import dynamic from 'next/dynamic'
import Spinner from './ui/Spinner'

const DynamicInfiniteList = dynamic(() => import('@/components/InfiniteList'), {
	ssr: false,
	loading: () => (
		<div className='z-10 absolute top-full left-1/2 translate-x-[-50%]'>
			<Spinner
				size={60}
				message='Loading...'
			/>
		</div>
	)
})

export function CategoryClientPage({ totalPages, currentPage, category }) {
	return (
		<DynamicInfiniteList
			totalPages={totalPages}
			currentPage={currentPage}
			category={category}
		/>
	)
}
