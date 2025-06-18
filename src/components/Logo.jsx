import Link from 'next/link'
import clsx from 'clsx'
import { SITE_NAME } from '@/constants/constants'
import { PUB_PAGES } from '@/lib/routes/public-pages'

export function Logo({ isSidebar = true }) {
	return (
		<div className={clsx(!isSidebar && 'my-13 mx-5')}>
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
