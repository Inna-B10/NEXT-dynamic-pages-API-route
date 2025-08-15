import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { UserMenu } from './UserMenu'

export function Header() {
	return (
		<section className='flex items-center justify-between h-20 mx-4 border-b lg:h-30 border-border'>
			<div className='w-1/2 sm:1/3 2xl:w-[980px]'>
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
