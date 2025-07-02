'use client'

import { usePathname, useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { User } from 'react-feather'
import { Button } from '@/components/ui/Button'

export function UserMenu({ isAuthenticated }) {
	const router = useRouter()
	const pathname = usePathname()

	const handleClick = () => {
		router.push(`/auth?mode=sign-in&redirect_url=${encodeURIComponent(pathname)}`)
	}

	return (
		<div>
			{isAuthenticated ? (
				<Button
					aria-label='Open Profile'
					title='Open Profile'
					variant='rounded'
				>
					<UserButton />
				</Button>
			) : (
				<Button
					aria-label='Go to Authorization page'
					title='Go to Authorization page'
					onClick={handleClick}
					variant='rounded'
				>
					<User />
				</Button>
			)}
		</div>
	)
}
