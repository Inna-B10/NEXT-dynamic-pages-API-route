'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'react-feather'

export function AuthButton() {
	const pathname = usePathname()

	return (
		<Link
			href={`/auth?mode=sign-in&redirect_url=${encodeURIComponent(pathname)}`}
			title='Go to Authorization page'
			aria-label='Go to Authorization page'
			className='content-center rounded-full border border-accentSecondary hover:border-accent text-accentSecondary hover:text-accent transition-all'
			style={{
				width: 'clamp(28px, 6vw, 40px)',
				height: 'clamp(28px, 6vw, 40px)',
				borderWidth: 'clamp(1px, 0.3vw, 2px)'
			}}
		>
			<User className='m-auto w-2/3 h-2/3' />
		</Link>
	)
}
