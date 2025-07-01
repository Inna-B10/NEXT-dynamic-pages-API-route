'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function Onboarding() {
	const { isSignedIn, user } = useUser()
	const [userChecked, setUserChecked] = useState(false)

	useEffect(() => {
		if (!isSignedIn || !user || userChecked) {
			sessionStorage.removeItem('lastAuthMode')
			sessionStorage.removeItem('lastRedirectUrl')
			return
		}

		const checkUser = async () => {
			try {
				console.log('Checking user creation...')
				const res = await fetch('/api/user/check-or-create', { method: 'POST' })
				if (res.ok) {
					const text = await res.text()
					console.log('Server response:', text)
				} else {
					console.warn('Error response from server:', res.status)
				}
			} catch (err) {
				console.error('Error while calling /check-or-create:', err)
			} finally {
				setUserChecked(true)
				sessionStorage.removeItem('lastAuthMode')
				sessionStorage.removeItem('lastRedirectUrl')
			}
		}

		checkUser()
	}, [isSignedIn, user, userChecked])

	return null
}
