import { UserMenu } from './UserMenu'
import DynamicSearchInput from './search-input/DynamicSearchInput'

export function Header() {
	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<DynamicSearchInput />
			</div>
			<UserMenu />
		</section>
	)
}
