export function Header() {
	return (
		<div className='flex justify-between items-center h-30 border-b border-border mx-4'>
			<h1 className='text-4xl inline text-blue'>Products Catalog</h1>
			<div>
				<input
					type='search'
					placeholder='search'
					className='w-100 outline-0 border border-blue text-xs italic p-2 rounded'
				/>
			</div>
		</div>
	)
}
