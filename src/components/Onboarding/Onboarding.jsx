import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'

export default function Onboarding() {
	if (typeof window === 'undefined') return null

	const { isSignedIn, user, isLoaded } = useUser()

	useEffect(() => {
		if (!isLoaded || !isSignedIn || !user) return

		const alreadyChecked = sessionStorage.getItem('userChecked')
		if (alreadyChecked === 'true') return

		const checkUser = async () => {
			try {
				const res = await fetch('/api/user/check-or-create', { method: 'POST' })

				if (res.ok) {
					toast.success('Welcome! You are signed in')
				} else {
					if (isDev()) {
						console.error('Error authenticating:', res)
					}
					toast.error(`Error authenticating: ${res.status}`)
				}
			} catch (error) {
				if (isDev()) {
					console.error('Error authenticating:', error)
				}
				toast.error('Error authenticating!')
			} finally {
				sessionStorage.setItem('userChecked', 'true')
				sessionStorage.removeItem('lastAuthMode')
				sessionStorage.removeItem('lastRedirectUrl')
			}
		}

		checkUser()
	}, [isLoaded, isSignedIn, user])

	// reset userChecked if not signed in
	useEffect(() => {
		if (!isLoaded) return // wait until Clerk loads

		if (!isSignedIn) {
			sessionStorage.removeItem('userChecked')
		}
	}, [isSignedIn])

	return null
}
