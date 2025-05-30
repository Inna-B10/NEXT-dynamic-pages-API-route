export function Header() {
	return (
		<div className='flex justify-between items-center h-30 border-b border-border mx-4'>
			<h1 className='text-4xl inline text-header'>Products Catalog</h1>
			<div>
				<input
					type='search'
					placeholder='search'
					className='w-100 outline-0 border border-header text-xs italic p-2 rounded'
				/>
			</div>
		</div>
	)
}
