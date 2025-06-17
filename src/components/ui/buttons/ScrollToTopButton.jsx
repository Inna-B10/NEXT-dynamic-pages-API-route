'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'react-feather'

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(window.scrollY > 300)
		}

		window.addEventListener('scroll', toggleVisibility)
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		isVisible && (
			<button
				onClick={scrollToTop}
				className='fixed bottom-6 right-6 z-50 p-3 bg-blue-500  hover:bg-blue-600 rounded-md transition-all duration-300'
				title='To top'
				aria-label='Scroll to top'
			>
				<ArrowUp
					size={26}
					className='text-light-gray font-bold'
				/>
			</button>
		)
	)
}
