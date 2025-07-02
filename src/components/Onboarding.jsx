'use client'

import { useEffect } from 'react'
import { useAuth, useSession, useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'

export default function Onboarding() {
	if (typeof window === 'undefined') return null

	const auth = useAuth() // ID, sessionId и токен

	useSession() // инфо о сессии
	const session = useSession()
	console.log('auth', auth, 'session', session)
	const { isSignedIn, user, isLoaded } = useUser() // данные о пользователе

	useEffect(() => {
		console.log('checking user onboarding start')
		if (!isLoaded || !isSignedIn || !user) return

		console.log('checking if already checked')
		const alreadyChecked = sessionStorage.getItem('userChecked')
		if (alreadyChecked === 'true') return

		console.log('start fetching user data')
		const checkUser = async () => {
			try {
				const res = await fetch('/api/user/check-or-create', { method: 'POST' })

				if (res.ok) {
					// toast only on first creation or check
					toast.success('Welcome! You are signed in')
				} else {
					console.log(res)
					toast.error(`Error authenticating: ${res.status}`)
				}
			} catch (err) {
				toast.error('Error authenticating!')
				console.error(err)
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
			console.log('resetting userChecked')
			sessionStorage.removeItem('userChecked')
		}
	}, [isSignedIn])

	return null
}
