import { Fragment } from 'react'
import { Loader } from 'react-feather'

export default function InfiniteList({
	data,
	isLoading,
	isError,
	isFetchingNextPage,
	lastElementRef,
	renderItem
}) {
	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error loading data.</p>

	return (
		<>
			<div className='grid grid-cols-4 gap-y-14 gap-x-8'>
				{data?.map((item, index) => (
					<Fragment key={index}>{renderItem(item, index)}</Fragment>
				))}
			</div>
			{isFetchingNextPage && (
				<Loader
					size={60}
					className='mx-auto mt-10 animate-spin'
				/>
			)}
			<div
				ref={lastElementRef}
				style={{ height: 1 }}
			/>
		</>
	)
}
