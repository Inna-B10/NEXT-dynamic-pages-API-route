'use client'

import { usePathname, useRouter } from 'next/navigation'
import { User } from 'react-feather'
import { Button } from '@/components/ui/Button'

export function AuthButton() {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = () => {
		router.push(`/auth?mode=sign-in&redirect_url=${encodeURIComponent(pathname)}`)
	}

	return (
		<Button
			aria-label='Go to Authorization page'
			title='Go to Authorization page'
			onClick={handleClick}
			variant='transparent-rounded'
		>
			<User />
		</Button>
	)
}
