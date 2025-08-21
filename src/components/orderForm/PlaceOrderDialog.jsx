import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import AddressForm from './AddressForm'
import { MockPaymentForm } from './MockPaymentForm'

export function PlaceOrderDialog({
	isOpen,
	step,
	isSubmitting,
	onAddressSubmit,
	onPaymentSubmit,
	onClose
}) {
	return (
		<Dialog
			open={isOpen && !isSubmitting}
			onClose={() => {}}
			className='relative z-50'
		>
			<div
				className='fixed inset-0 bg-black/50'
				aria-hidden='true'
			/>
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<DialogPanel className='w-full max-w-xl bg-dialogPanel border border-white/20 p-6 rounded shadow-lg'>
					<DialogTitle className='text-xl text-accent text-center font-bold mb-4'>
						{step === 'address' ? 'Delivery Address' : 'Mock Payment'}
					</DialogTitle>

					{/* ---------------------------------- Forms --------------------------------- */}
					{step === 'address' && (
						<AddressForm
							onSubmit={onAddressSubmit}
							isSubmitting={isSubmitting}
							onClose={onClose}
						/>
					)}
					{step === 'payment' && !isSubmitting && (
						<MockPaymentForm
							onSubmit={onPaymentSubmit}
							isSubmitting={isSubmitting}
							onClose={onClose}
						/>
					)}
				</DialogPanel>
			</div>
		</Dialog>
	)
}
