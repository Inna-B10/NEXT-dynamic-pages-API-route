import { Fragment } from 'react'
import Spinner from './ui/Spinner'

export default function InfiniteList({
	data,
	isLoading,
	isError,
	isFetchingNextPage,
	lastElementRef,
	renderItem
}) {
	if (isLoading)
		return (
			<Spinner
				size={60}
				message='Loading...'
			/>
		)
	if (isError) return <p className='text-center text-2xl'>Error loading data.</p>

	return (
		<>
			<div className='grid-cols w-full'>
				{data?.map((item, index) => (
					<Fragment key={index}>{renderItem(item, index)}</Fragment>
				))}
			</div>
			{isFetchingNextPage && (
				<Spinner
					size={60}
					message='Loading more items...'
				/>
			)}
			<div
				ref={lastElementRef}
				style={{ height: 1 }}
			/>
		</>
	)
}
