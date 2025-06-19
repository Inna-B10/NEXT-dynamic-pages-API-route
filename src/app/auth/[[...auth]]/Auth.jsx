'use client'

import { Logo } from '@/components/Logo'
import { SignIn, SignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './clerkAuth.module.css'

const tabs = [
	{ label: 'Sign In', value: 'sign-in' },
	{ label: 'Sign Up', value: 'sign-up' }
]

export function Auth() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const modeParam = searchParams.get('mode')
	const initialMode = modeParam === 'sign-up' ? 'sign-up' : 'sign-in'
	const [mode, setMode] = useState(initialMode)

	useEffect(() => {
		if (modeParam === 'sign-up' || modeParam === 'sign-in') {
			setMode(modeParam)
		}
	}, [modeParam])

	const handleTabClick = newMode => {
		router.push(`?mode=${newMode}`, { scroll: false, shallow: true }) //refresh URL without reloading page
	}

	return (
		<section className='w-full h-full flex flex-col mx-auto mb-6'>
			<Logo isSidebar={false} />
			<div className='w-fit min-h-[411px]  xs:w-fit xs:min-w-96 bg-bg p-4 xs:p-8 xs:border border-border rounded mx-auto flex flex-col justify-between gap-6'>
				<div className='flex justify-center gap-6'>
					{tabs.map(tab => (
						<button
						key={tab.value}
						onClick={() => handleTabClick(tab.value)}
						className={`px-4 py-2 ${mode === tab.value ? 'font-bold text-yellow border-b-2 border-yellow' : ''}`}
					>
						{tab.label}
					</button>
					))}
				</div>
				<div className={styles.clerkContainer}>
					{/*
					//NB default route:
					//NB	path='/auth'
					//NB  routing='path' 
 
					//NB custom route:
					//NB routing='hash' //no path needed 
					 */}
					{mode === 'sign-in' 
					? <SignIn routing='hash' />
				  : <SignUp routing='hash' />
					}
				</div>
			</div>
		</section>
	)
}
