import Link from 'next/link'
import clsx from 'clsx'
import { SITE_NAME } from '@/constants/constants'
import { PUB_PAGES } from '@/lib/routes/public-pages'

export function Logo({ isSidebar = true }) {
	return (
		<div
			className={clsx(
				!isSidebar && 'mb-6 mt-13 bp480:mb-12 bp480:mt16 text-center sm:text-left sm:mx-5'
			)}
		>
			<Link
				href={PUB_PAGES.HOME}
				title={`${SITE_NAME} - homepage`}
				aria-label={`${SITE_NAME} - homepage`}
				className='inline-block'
			>
				<h2 className='text-2xl'>SiteLogo</h2>
			</Link>
		</div>
	)
}
