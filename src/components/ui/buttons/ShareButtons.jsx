'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Share2 } from 'react-feather'
import { SOCIAL_MEDIA } from '@/constants/social-media'
import { SITE_URL } from '@/config/config'

export function ShareButtons({ pathname, title }) {
	const url = `${SITE_URL}${pathname}`
	const [canShare, setCanShare] = useState(false)

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
		<>
			{SOCIAL_MEDIA.map(({ icon: Icon, label, link }) => (
				<Link
					key={label}
					href={link(url, title)}
					target='_blank'
					rel='noopener noreferrer'
					title={`Share on ${label}`}
					aria-label={`Share on ${label}`}
					className='hover:text-blue-500 hover:scale-110 transition'
				>
					<Icon size={24} />
				</Link>
			))}
			{canShare && (
				<button
					onClick={handleNativeShare}
					title='Native Share'
					aria-label='Open Native Share Menu'
					className='hover:text-blue-500 hover:scale-110 transition'
				>
					<Share2 size={24} />
				</button>
			)}
		</>
	)
}
