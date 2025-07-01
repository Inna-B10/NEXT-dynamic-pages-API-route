import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuthMode() {
	const router = useRouter()
	const [mode, setMode] = useState(null) //sign-in or sign-up
	const [initialRedirectUrl, setInitialRedirectUrl] = useState('/')
	const [isReady, setIsReady] = useState(false)

	// If the user is returning from an OAuth flow, the `mode` param may not be set,
	// needs to check if it's set in the search params.
	// If it's not set, it's likely because the user is returning from an OAuth flow,
	// and we need to try to get the mode from sessionStorage.
	useEffect(() => {
		if (typeof window === 'undefined') return

		const url = new URL(window.location.href)

		//get mode from URL or sessionStorage
		const urlMode = url.searchParams.get('mode')
		const savedMode = sessionStorage.getItem('lastAuthMode')

		//get redirect_url
		const urlRedirect = url.searchParams.get('redirect_url')
		const savedRedirect = sessionStorage.getItem('lastRedirectUrl')

		//save redirect URL to state/sessionStorage
		if (urlRedirect) {
			setInitialRedirectUrl(urlRedirect)
			sessionStorage.setItem('lastRedirectUrl', urlRedirect)
		} else if (savedRedirect) {
			setInitialRedirectUrl(savedRedirect)
		} else {
			setInitialRedirectUrl('/')
		}

		//set mode
		if (urlMode === 'sign-in' || urlMode === 'sign-up') {
			setMode(urlMode)
			sessionStorage.setItem('lastAuthMode', urlMode)
			setIsReady(true)
		} else {
			// if the mode is not set (f.ex typed url /auth)
			const fallbackMode = savedMode || 'sign-in'
			setMode(fallbackMode)
			sessionStorage.setItem('lastAuthMode', fallbackMode)

			//recover redirect_url
			const redirect = urlRedirect || savedRedirect || '/'

			const query = new URLSearchParams()
			query.set('mode', fallbackMode)
			query.set('redirect_url', redirect)

			router.replace(`/auth?${query.toString()}`)
		}
	}, [])

	// ------------------------- Tab Switching (saving Redirect_url)
	const handleTabClick = newMode => {
		if (newMode === mode) return
		sessionStorage.setItem('lastAuthMode', newMode)

		const redirect = initialRedirectUrl || sessionStorage.getItem('lastRedirectUrl') || '/'
		const query = new URLSearchParams()
		query.set('mode', newMode)
		query.set('redirect_url', redirect)

		router.push(`?${query.toString()}`, { scroll: false, shallow: true }) //refresh URL without reloading page
		setMode(newMode)
	}
	return {
		mode,
		handleTabClick,
		initialRedirectUrl,
		isReady
	}
}
