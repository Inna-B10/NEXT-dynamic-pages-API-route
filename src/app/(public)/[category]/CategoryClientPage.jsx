'use client'

import dynamic from 'next/dynamic'
import Spinner from '../../../components/ui/Spinner'

const DynamicInfiniteList = dynamic(() => import('@/app/(public)/[category]/InfiniteList'), {
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

export function CategoryClientPage({ totalPages, currentPage, category }) {
	return (
		<DynamicInfiniteList
			totalPages={totalPages}
			currentPage={currentPage}
			category={category}
		/>
	)
}
