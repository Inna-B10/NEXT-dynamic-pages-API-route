import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import AddressForm from '../orderForm/AddressForm'
import { MockPaymentForm } from '../orderForm/MockPaymentForm'
import { Button } from '../ui/Button'
import { ordersService } from '@/services/client/orders.service'

export default function PlaceOrderButton({ detailedCart, loadDetailedCart, clearCart }) {
	const [isOpen, setIsOpen] = useState(false)
	const [step, setStep] = useState('address') // 'address' | 'payment'
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [addressData, setAddressData] = useState(null)

	const { mutate: placeOrder } = useMutation({
		mutationFn: async () => {
			const items = detailedCart.map(item => ({
				productId: item._id,
				productName: item.productName,
				quantity: 1, //[TODO] so far no change in quantity
				price: item.price ? item.price : 5995,
				categorySlug: item.categorySlug
			}))
			const totalPrice = detailedCart.reduce(
				(sum, item) => sum + (item.price ? item.price : 5995),
				0
			)

			await ordersService.createNewOrder(items, totalPrice, addressData)
		},
		onSuccess: () => {
			//[TODO] change toast to headless ui +confirm email
			toast.success('Order placed successfully!')
			loadDetailedCart()
			clearCart()
			setIsOpen(false)
			setStep('address')
		},
		onError: () => {
			toast.error('Error placing order!')
		},
		onSettled: () => setIsSubmitting(false)
	})

	const handleAddressSubmit = form => {
		setAddressData(form)
		setStep('payment')
	}

	const handlePaymentSubmit = async () => {
		setIsSubmitting(true)
		toast.loading('Processing payment...', { id: 'payment' })
		await new Promise(resolve => setTimeout(resolve, 2000))
		toast.success('Payment successful!', { id: 'payment' })
		placeOrder()
	}

	const handleClose = () => {
		if (!isSubmitting) {
			setIsOpen(false)
			setStep('address')
		}
	}

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className='float-right'
			>
				Place Order
			</Button>

			<Dialog
				open={isOpen}
				onClose={handleClose}
				className='relative z-50'
			>
				<div
					className='fixed inset-0 bg-black/50'
					aria-hidden='true'
				/>
				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<DialogPanel className='w-full max-w-xl bg-[#3f3f46] border border-white/20 p-6 rounded shadow-lg'>
						<DialogTitle className='text-xl text-accent text-center font-bold mb-4'>
							{step === 'address' ? 'Delivery Address' : 'Mock Payment'}
						</DialogTitle>
						{step === 'address' && (
							<AddressForm
								onSubmit={handleAddressSubmit}
								isSubmitting={isSubmitting}
								onClose={handleClose}
							/>
						)}
						{step === 'payment' && (
							<MockPaymentForm
								onSubmit={handlePaymentSubmit}
								isSubmitting={isSubmitting}
								onClose={handleClose}
							/>
						)}
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}
