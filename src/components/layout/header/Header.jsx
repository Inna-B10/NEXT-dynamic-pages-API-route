import { UserMenu } from './UserMenu'

export function Header() {
	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<input
					type='search'
					placeholder='search'
					className='w-full min-w-40 border border-accentSecondary text-xs italic p-1.5 sm:p-2 rounded md:ml-4'
				/>
			</div>
			<UserMenu />
		</section>
	)
}
