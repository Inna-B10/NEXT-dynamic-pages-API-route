import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

export default function PaymentStatusOverlay({ isOverlayOpen, onSuccess, onClose }) {
	const [progress, setProgress] = useState(0)
	const [status, setStatus] = useState('loading') //'loading' | 'success'

	useEffect(() => {
		if (!isOverlayOpen) return

		setProgress(0)
		setStatus('loading')

		/* ------------------------- Progress/ring Animation ------------------------ */
		let interval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 100) {
					clearInterval(interval)
					setTimeout(() => setStatus('success'), 500)
					return 100
				}
				return prev + 4
			})
		}, 200)

		return () => clearInterval(interval)
	}, [isOverlayOpen])

	/* --------------------------- Checkmark Animation -------------------------- */
	useEffect(() => {
		if (status === 'success') {
			onSuccess?.()
			setTimeout(() => {
				onClose?.()
			}, 3300)
		}
	}, [status])

	return (
		<AnimatePresence>
			<Dialog
				as='div'
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
				open={isOverlayOpen}
				onClose={() => {}}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					className='w-4/5 max-w-lg bg-dialogPanel border border-white/20 p-6 rounded shadow-lg flex flex-col items-center gap-4'
				>
					{/* ----------------------------- Ring Animation ----------------------------- */}
					<div className='relative w-32 h-32 my-4'>
						<svg className='absolute top-0 left-0 w-full h-full'>
							<circle
								cx='64'
								cy='64'
								r='60'
								stroke='#eee'
								strokeWidth='8'
								fill='none'
							/>
							<motion.circle
								cx='64'
								cy='64'
								r='60'
								stroke='#22c55e'
								strokeWidth='8'
								fill='none'
								strokeLinecap='round'
								strokeDasharray='377'
								strokeDashoffset={377 - (progress / 100) * 377}
								transition={{ ease: 'linear', duration: 0.4 }}
							/>
						</svg>

						{/* --------------------------- Checkmark Animation -------------------------- */}
						{status === 'success' && (
							<motion.svg
								initial={{ scale: 0 }}
								animate={{ scale: 0.8 }}
								transition={{ duration: 0.5 }}
								className='absolute top-0 left-0 w-full h-full text-green-500'
								viewBox='0 0 24 24'
							>
								<path
									fill='currentColor'
									d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
								/>
							</motion.svg>
						)}
					</div>

					{/* ----------------------------- Status Message ----------------------------- */}
					{status === 'loading' && <p className='text-sm'>Processing payment...</p>}

					{status === 'success' && (
						<p className='text-lg font-semibold text-center'>Payment successful!</p>
					)}
				</motion.div>
			</Dialog>
		</AnimatePresence>
	)
}
