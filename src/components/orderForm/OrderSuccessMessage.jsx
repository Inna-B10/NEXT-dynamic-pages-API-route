import { Dialog } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle } from 'react-feather'
import { Button } from '../ui/Button'

export function OrderSuccessMessage({ isMessageOpen, onClose }) {
	return (
		<AnimatePresence>
			<Dialog
				as='div'
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
				open={isMessageOpen}
				onClose={() => {}}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					className='w-4/5 max-w-lg bg-dialogPanel border border-white/20 p-6 rounded shadow-lg flex flex-col items-center gap-4'
				>
					<div className='text-green-500 text-center'>
						<CheckCircle className='inline mb-2' />
						<h2 className='sm:text-lg lg:text-xl tracking-wide font-bold inline'>
							&nbsp;&nbsp; Order placed successfully!
						</h2>
					</div>
					<p className='my-2 text-center'>Order confirmation has been sent to your email.</p>

					<Button
						onClick={onClose}
						variant='simple'
					>
						Ok
					</Button>
				</motion.div>
			</Dialog>
		</AnimatePresence>
	)
}
