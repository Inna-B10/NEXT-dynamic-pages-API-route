import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

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
					<DialogPanel className='bg-[#3f3f46] border border-white/20 p-4 rounded w-64'>
						<DialogTitle className='text-sm text-center'>{message}</DialogTitle>
						<div className='mt-4 flex justify-center gap-3'>
							<button
								onClick={() => {
									onConfirm()
									onClose()
								}}
								className='px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded'
							>
								OK
							</button>
							<button
								onClick={onClose}
								className='px-3 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded'
							>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</Transition>
	)
}
