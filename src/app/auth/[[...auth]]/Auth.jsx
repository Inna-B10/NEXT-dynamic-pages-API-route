'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SignIn, SignUp } from '@clerk/nextjs'
import { Logo } from '@/components/Logo'
import Spinner from '@/components/ui/Spinner'
import styles from './clerkAuth.module.css'

const tabs = [
	{ label: 'Sign In', value: 'sign-in' },
	{ label: 'Sign Up', value: 'sign-up' }
]

export function Auth() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const [mode, setMode] = useState(null) //sign-in or sign-up
	const [hasClerkError, setHasClerkError] = useState(false) //redirect after authorization

	// ------------------------- Save Redirect_url Once
	const initialRedirectUrl = useMemo(() => {
		if (typeof window === 'undefined') return '/'
		return searchParams.get('redirect_url') || '/'
	}, [])

	// ------------------------- Save Mode Before Login/register
	useEffect(() => {
		// If the user is returning from an OAuth flow, the `mode` param may not be set,
		// so we need to check if it's set in the search params.
		// If it's not set, it's likely because the user is returning from an OAuth flow,
		// and we need to try to get the mode from sessionStorage.

		let modeParam = typeof window !== 'undefined' ? searchParams.get('mode') : null
		if (modeParam !== 'sign-in' && modeParam !== 'sign-up') {
			// If the mode is not set (f.ex typed url /auth)
			modeParam = 'sign-in'
			router.replace(`/auth?mode=sign-in&redirect_url=${encodeURIComponent(initialRedirectUrl)}`)
		}
		// save mode in sessionStorage before redirecting to OAuth
		sessionStorage.setItem('lastAuthMode', modeParam)
		setMode(modeParam)

		// If mode is missing (after return from OAuth), try to get it from sessionStorage
		const savedMode = sessionStorage.getItem('lastAuthMode')

		if (savedMode === 'sign-in' || savedMode === 'sign-up') {
			// If we found a saved mode in sessionStorage, redirect to the correct
			// tab (sign-in or sign-up).
			const query = new URLSearchParams()
			query.set('mode', savedMode)
			if (initialRedirectUrl) query.set('redirect_url', initialRedirectUrl)
			router.replace(`?${query.toString()}`, { scroll: false })
			return
		}
	}, [searchParams])

	// ------------------------- Tab Switching (saving Redirect_url)
	const handleTabClick = newMode => {
		sessionStorage.setItem('lastAuthMode', newMode)

		const query = new URLSearchParams()
		query.set('mode', newMode)
		if (initialRedirectUrl) query.set('redirect_url', initialRedirectUrl)

		router.push(`?${query.toString()}`, { scroll: false, shallow: true }) //refresh URL without reloading page
	}

	if (!mode)
		return (
			<div className='py-50 text-center'>
				<Spinner
					size={120}
					message='Redirecting...'
				/>
			</div>
		)

	return (
		<section className='w-full h-full flex flex-col mx-auto mb-6'>
			<Logo isSidebar={false} />
			<div className='w-fit min-h-[411px]  bp480:w-fit bp480:min-w-96 bg-bg p-4 bp480:p-8 bp480:border border-border rounded mx-auto flex flex-col justify-between gap-6'>
				<div className='flex justify-center gap-6'>
					{tabs.map(tab => (
						<button
							key={tab.value}
							aria-label={tab.value}
							onClick={() => handleTabClick(tab.value)}
							className={`px-4 py-2 cursor-pointer ${mode === tab.value ? 'font-bold text-yellow border-b-2 border-yellow' : ''}`}
						>
							{tab.label}
						</button>
					))}
				</div>
				{/* -------------------------- Clerk Auth Components ------------------------- */}
				<div className={styles.clerkContainer}>
					{hasClerkError ? (
						<p className='text-red-600 text-center'>
							Error loading authorization form. Please try again later.
						</p>
					) : mode === 'sign-in' ? (
						<SignIn
							path='/auth'
							routing='path'
							forceRedirectUrl={initialRedirectUrl}
							onLoadError={() => setHasClerkError(true)}
							onSessionExpired={() => setHasClerkError(true)}
						/>
					) : (
						<SignUp
							path='/auth'
							routing='path'
							forceRedirectUrl={initialRedirectUrl}
							onLoadError={() => setHasClerkError(true)}
							onSessionExpired={() => setHasClerkError(true)}
						/>
					)}
				</div>
			</div>
		</section>
	)
}
