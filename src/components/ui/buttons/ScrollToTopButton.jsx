'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
		const start = window.scrollY
		const duration = 800
		const startTime = performance.now()

		const easeOutCubic = t => 1 - Math.pow(1 - t, 3)

		const animateScroll = currentTime => {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			const ease = easeOutCubic(progress)

			window.scrollTo(0, start * (1 - ease))

			if (elapsed < duration) {
				requestAnimationFrame(animateScroll)
			}
		}

		requestAnimationFrame(animateScroll)
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					key='scrollToTop'
					onClick={scrollToTop}
					initial={{ opacity: 0, y: 50, scale: 0.8 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 50, scale: 0.8 }}
					transition={{ duration: 0.4, ease: 'easeOut' }}
					className='fixed bottom-6 right-6 z-50 p-3 bg-blue-500  hover:bg-blue-600 rounded-md transition-all duration-300'
					title='To top'
					aria-label='Scroll to top'
				>
					<ArrowUp
						size={26}
						className='text-light-gray font-bold'
					/>
				</motion.button>
			)}
		</AnimatePresence>
	)
}
