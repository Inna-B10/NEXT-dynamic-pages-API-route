import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Button } from './Button'

export function ConfirmDialog({ open, onClose, onConfirm, message }) {
	return (
		<Transition
			show={open}
			as={Fragment}
		>
			<Dialog
				as='div'
				className='relative z-[9999]'
				onClose={onClose}
			>
				<TransitionChild
					as={Fragment}
					enter='ease-out duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black/60' />
				</TransitionChild>

				<div className='fixed inset-0 flex items-center justify-center'>
					<DialogPanel className='bg-dialogPanel border border-white/20 p-4 rounded w-64'>
						<DialogTitle className='text-center text-sm lg:text-base lg:tracking-wider'>
							{message}
						</DialogTitle>
						<div className='mt-4 flex justify-center gap-3'>
							<Button
								onClick={() => {
									onConfirm()
									onClose()
								}}
								variant='red'
							>
								OK
							</Button>
							<Button
								onClick={onClose}
								variant='simple'
							>
								Cancel
							</Button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</Transition>
	)
}
