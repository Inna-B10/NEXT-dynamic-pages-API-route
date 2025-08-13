import { useState } from 'react'
import { usePlaceOrder } from '@/hooks/usePlaceOrder'
import { OrderSuccessMessage } from '../orderForm/OrderSuccessMessage'
import PaymentStatusOverlay from '../orderForm/PaymentStatusOverlay'
import { PlaceOrderDialog } from '../orderForm/PlaceOrderDialog'
import { Button } from '../ui/Button'

export default function PlaceOrderButton({
	detailedCart,
	loadDetailedCart,
	clearCart,
	onOrderSuccess
}) {
	const [showOverlay, setShowOverlay] = useState(false)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	const { step, setStep, isSubmitting, setIsSubmitting, setAddressData, placeOrder } =
		usePlaceOrder({ detailedCart, clearCart, loadDetailedCart, onOrderSuccess })

	return (
		<>
			<Button
				onClick={() => setIsFormOpen(true)}
				className='float-right'
			>
				Place Order
			</Button>

			{/* -------------------------- Show Order Dialog -------------------------- */}
			<PlaceOrderDialog
				isOpen={isFormOpen}
				step={step}
				isSubmitting={isSubmitting}
				onAddressSubmit={form => {
					setAddressData(form)
					setStep('payment')
				}}
				onPaymentSubmit={() => {
					setIsSubmitting(true)
					setShowOverlay(true)
				}}
				onClose={() => {
					if (!isSubmitting) {
						setIsFormOpen(false)
						setStep('address')
					}
				}}
			/>

			{/* -------------------------- Show Payment Process -------------------------- */}
			<PaymentStatusOverlay
				isOverlayOpen={showOverlay}
				onSuccess={() => {
					placeOrder()
					setIsFormOpen(false)
				}}
				onClose={() => setShowOverlay(false)}
			/>

			{/* -------------------------- Show Success Message -------------------------- */}
			<OrderSuccessMessage
				isMessageOpen={showSuccessMessage}
				onClose={() => setShowSuccessMessage(false)}
			/>
		</>
	)
}
