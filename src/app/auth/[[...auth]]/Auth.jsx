'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SignIn, SignUp } from '@clerk/nextjs'
import { Logo } from '@/components/Logo'

export function Auth() {
	const searchParams = useSearchParams()
	const router = useRouter()

	const modeParam = searchParams.get('mode')
	const initialMode = modeParam === 'sign-up' ? 'sign-up' : 'sign-in'
	const [mode, setMode] = useState(initialMode)

	useEffect(() => {
		setMode(modeParam === 'sign-up' ? 'sign-up' : 'sign-in')
	}, [modeParam])

	const handleTabClick = newMode => {
		router.push(`?mode=${newMode}`, { scroll: false, shallow: true }) //refresh URL without reloading page
	}

	return (
		<section className='w-full h-screen flex flex-col mx-auto'>
			<Logo isSidebar={false} />
			<div className='w-fit bg-bg p-8 border border-border rounded mx-auto'>
				<div className='flex justify-center gap-6'>
					<button
						onClick={() => handleTabClick('sign-in')}
						className={`px-4 py-2 ${mode === 'sign-in' ? 'font-bold text-yellow border-b-2 border-yellow' : ''}`}
					>
						Sign In
					</button>
					<button
						onClick={() => handleTabClick('sign-up')}
						className={`px-4 py-2 ${mode === 'sign-up' ? 'font-bold  text-yellow-300 border-b-2 border-yellow' : ''}`}
					>
						Sign Up
					</button>
				</div>
				<div>
					{/*
					//NB default route:
					//NB	path='/auth'
					//NB  routing='path' 
 
					//NB custom route:
					//NB routing='hash' //no path needed 
					 */}
					{mode === 'sign-in' ? (
						<SignIn
							routing='hash'
							appearance={{
								elements: {
									footer: { display: 'none' },
									cardBox: { boxShadow: 'none' },
									card: { background: '#161A1D' },
									socialButtonsBlockButton__google: {
										background: '#7CBAFD'
									},
									socialButtonsBlockButtonText__google: {
										color: 'black',
										letterSpacing: '1px',
										fontWeight: 'bold'
									},
									headerTitle: { color: '#7CBAFD', marginBottom: '0.5rem', fontSize: '1.5rem' },
									formButtonPrimary: { color: 'black', letterSpacing: '1px', fontWeight: 'bold' },
									buttonArrowIcon: { color: 'black', opacity: 1 }
								}
							}}
						/>
					) : (
						<SignUp
							routing='hash'
							appearance={{
								elements: {
									footer: { display: 'none' },
									cardBox: { boxShadow: 'none' },
									card: { background: '#161A1D' },
									socialButtonsBlockButton__google: {
										background: '#7CBAFD'
									},
									socialButtonsBlockButtonText__google: {
										color: 'black',
										letterSpacing: '1px',
										fontWeight: 'bold'
									},
									headerTitle: { color: '#7CBAFD', marginBottom: '0.5rem', fontSize: '1.5rem' },
									formButtonPrimary: { color: 'black', letterSpacing: '1px', fontWeight: 'bold' },
									buttonArrowIcon: { color: 'black', opacity: 1 }
								}
							}}
						/>
					)}
				</div>
			</div>
		</section>
	)
}
