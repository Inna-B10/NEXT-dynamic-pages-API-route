'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SignIn, SignUp } from '@clerk/nextjs'
import { Logo } from '@/components/ui/Logo'
import Spinner from '@/components/ui/Spinner'
import { useAuthMode } from '@/hooks/useAuthMode'
import styles from './clerkAuth.module.css'

const tabs = [
	{ label: 'Sign In', value: 'sign-in' },
	{ label: 'Sign Up', value: 'sign-up' }
]

export function AuthPage() {
	const searchParams = useSearchParams()
	const { mode, handleTabClick, initialRedirectUrl, isReady } = useAuthMode(searchParams)
	const [hasClerkError, setHasClerkError] = useState(false)

	if (!isReady || !mode) {
		return (
			<div className='py-50 text-center'>
				<Spinner
					size={120}
					message='Redirecting...'
				/>
			</div>
		)
	}

	return (
		<section className='w-full h-full flex flex-col mx-auto mb-6'>
			<Logo isSidebar={false} />
			<div className='w-fit min-h-[411px]  bp480:w-fit bp480:min-w-96 bg-bg p-4 bp480:p-8 bp480:border border-border rounded mx-auto flex flex-col justify-between gap-6'>
				<div className='flex justify-center gap-6'>
					{tabs.map(tab => (
						<button
							key={tab.value}
							aria-label={tab.value}
							onClick={() => {
								handleTabClick(tab.value)
							}}
							className={`px-4 py-2 cursor-pointer ${mode === tab.value ? 'font-bold text-accent border-b-2 border-accent' : ''}`}
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
