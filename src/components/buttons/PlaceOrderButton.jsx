import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CheckoutForm from '../checkoutForm/CheckoutForm'
import { Button } from '../ui/Button'
import { ordersService } from '@/services/client/orders.service'

export default function PlaceOrderButton({ detailedCart, loadDetailedCart, clearCart }) {
	const [isOpen, setIsOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { mutate: placeOrder } = useMutation({
		mutationFn: async address => {
			const items = detailedCart.map(item => ({
				productId: item._id,
				quantity: 1, //[TODO] so far no change in quantity
				price: item.price ? item.price : 5995,
				categorySlug: item.categorySlug
			}))
			const totalPrice = detailedCart.reduce(
				(sum, item) => sum + (item.price ? item.price : 5995),
				0
			)

			await ordersService.createNewOrder(items, totalPrice, address)
		},
		onSuccess: () => {
			toast.success('Order placed successfully!')
			loadDetailedCart()
			clearCart()
			setIsOpen(false)
		},
		onError: () => {
			toast.error('Error placing order!')
		},
		onSettled: () => setIsSubmitting(false)
	})
	const handleSubmit = address => {
		setIsSubmitting(true)
		placeOrder(address)
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
				onClose={() => !isSubmitting && setIsOpen(false)}
				className='relative z-50'
			>
				<div
					className='fixed inset-0 bg-black/50'
					aria-hidden='true'
				/>
				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<DialogPanel className='w-full max-w-xl bg-[#3f3f46] border border-white/20 p-6 rounded shadow-lg'>
						<DialogTitle className='text-xl text-accent text-center font-bold mb-4'>
							Delivery Address
						</DialogTitle>
						<CheckoutForm
							onSubmit={handleSubmit}
							isSubmitting={isSubmitting}
							onClose={() => setIsOpen(false)}
						/>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	)
}
