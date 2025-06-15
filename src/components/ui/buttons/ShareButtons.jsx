'use client'

import Link from 'next/link'
import { Share2 } from 'react-feather'
import { SOCIAL_MEDIA } from '@/constants/social-media'
import { SITE_URL } from '@/config/config'

export function ShareButtons({ pathname, title }) {
	const href = `${SITE_URL}${pathname}`
	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					url: href
				})
				console.log('Successfully shared')
			} catch (error) {
				console.error('Error sharing', error)
			}
		} else {
			alert('Native share is not supported on this device')
		}
	}

	return (
		<>
			{SOCIAL_MEDIA.map(({ icon: Icon, label, link }) => (
				<Link
					key={label}
					href={link(href, title)}
					target='_blank'
					rel='noopener noreferrer'
					title={`Share on ${label}`}
					aria-label={`Share on ${label}`}
					className='hover:text-blue-500 hover:scale-110 transition'
				>
					<Icon size={24} />
				</Link>
			))}
			{navigator.share && (
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
