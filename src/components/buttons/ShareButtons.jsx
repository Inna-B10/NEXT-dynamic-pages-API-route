'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Share2 } from 'react-feather'
import { SOCIAL_MEDIA } from '@/constants/social-media'
import { SITE_URL } from '@/config/config'

export function ShareButtons({ title }) {
	const [canShare, setCanShare] = useState(false)
	const pathname = usePathname()
	const url = `${SITE_URL}${pathname}`

	useEffect(() => {
		if (typeof navigator !== 'undefined' && navigator.share) {
			setCanShare(true)
		}
	}, [])

	const handleNativeShare = async () => {
		try {
			await navigator.share({
				title: title,
				url: url
			})
			console.log('Successfully shared')
		} catch (error) {
			console.error('Error sharing', error)
		}
	}

	return (
		<div className='flex justify-between w-full'>
			{SOCIAL_MEDIA.map(({ icon: Icon, label, link }) => (
				<Link
					key={label}
					href={link(url, title)}
					target='_blank'
					rel='noopener noreferrer'
					title={`Share on ${label}`}
					aria-label={`Share on ${label}`}
					className='hover:text-blue hover:scale-110 transition'
				>
					<Icon className='w-6 h-6 bp520:w-5 bp520:h-5 md:w-6 md:h-6' />
				</Link>
			))}
			{canShare && (
				<button
					onClick={handleNativeShare}
					title='Native Share'
					aria-label='Open Native Share Menu'
					className='hover:text-blue hover:scale-110 transition'
				>
					<Share2 className='w-6 h-6 bp520:w-5 bp520:h-5 md:w-6 md:h-6' />
				</button>
			)}
		</div>
	)
}
