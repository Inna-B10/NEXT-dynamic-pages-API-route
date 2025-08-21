import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { SITE_NAME } from '@/constants/seo.constants'
import { PUB_PAGES } from '@/lib/routes-helpers/public-pages'

export function Logo({ isInHeader = true, className }) {
	return (
		<Link
			href={PUB_PAGES.HOME}
			title={`${SITE_NAME} - homepage`}
			aria-label={`Go to ${SITE_NAME} homepage`}
			className={clsx(
				'relative flex items-center justify-center sm:justify-start',
				className,
				!isInHeader && 'mb-6 mt-13 bp480:mb-12 bp480:mt16 sm:mx-16'
			)}
		>
			<Image
				src='/images/nextron-logo.png'
				alt={`${SITE_NAME} logo`}
				width={300}
				height={100}
				style={{
					objectFit: 'contain',
					width: '100%',
					minWidth: '130px',
					maxWidth: '200px',
					height: 'auto'
				}}
				className='content-center'
				sizes='(max-width: 300px) 100vw, 300px'
				priority
			/>
		</Link>
	)
}
