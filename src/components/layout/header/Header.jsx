import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { UserMenu } from './UserMenu'

export function Header() {
	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<DynamicWrapperNoChildren
					componentKey='search-input'
					exportName='SearchInput'
					page='false'
				/>
			</div>
			<UserMenu />
		</section>
	)
}
