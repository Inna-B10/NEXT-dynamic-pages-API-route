'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'

export default function Onboarding() {
	const { isSignedIn, user } = useUser()
	// const [userChecked, setUserChecked] = useState(false)

	useEffect(() => {
		if (!isSignedIn || !user) return

		const alreadyChecked = sessionStorage.getItem('userChecked')
		if (alreadyChecked === 'true') return
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
	}, [isSignedIn, user])

	useEffect(() => {
		if (!isSignedIn) {
			sessionStorage.removeItem('userChecked')
		}
	}, [isSignedIn])

	return null
}
