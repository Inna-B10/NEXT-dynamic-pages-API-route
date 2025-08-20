import Image from 'next/image'
import Link from 'next/link'
import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { Logo } from '@/components/ui/Logo'
import { SITE_NAME } from '@/constants/seo.constants'
import { UserMenu } from './UserMenu'
import { PUB_PAGES } from '@/lib/routes-helpers/public-pages'

export function Header() {
	return (
		<section className='flex items-center justify-between h-20 mx-4 border-b bp896:h-24 border-border'>
			<Logo className='max-w-[200px] hidden bp896:block bp896:ml-4' />
			<Link href={PUB_PAGES.HOME}>
				<Image
					src='/images/nextron-fav.png'
					alt={`${SITE_NAME} logo`}
					title={`${SITE_NAME} homepage`}
					width={32}
					height={45}
					className='min-w-7 bp520:ml-4 bp896:hidden h-auto'
				/>
			</Link>
			<div className='w-full max-w-[600px] mx-4 sm:px-6'>
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
