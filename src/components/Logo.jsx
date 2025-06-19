import { SITE_NAME } from '@/constants/constants'
import { PUB_PAGES } from '@/lib/routes/public-pages'
import clsx from 'clsx'
import Link from 'next/link'

export function Logo({ isSidebar = true }) {
	return (
		<div className={clsx(!isSidebar && 'mb-6 mt-13 xs:mb-12 xs:mt16 text-center sm:text-left sm:mx-5')}>
			<Link
				href={PUB_PAGES.HOME}
				title={`${SITE_NAME} - homepage`}
				aria-label={`${SITE_NAME} - homepage`}
			>
				<h2 className='text-2xl'>SiteLogo</h2>
			</Link>
		</div>
	)
}
