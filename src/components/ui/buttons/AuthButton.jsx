'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './Button'

export function AuthButton() {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = () => {
		router.push(`/auth?mode=sign-in&redirect_url=${encodeURIComponent(pathname)}`)
	}

	return (
		<Button
			aria-label='Authorization'
			onClick={handleClick}
		>
			Auth
		</Button>
	)
}
