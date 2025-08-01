import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CheckoutForm from '../CheckoutForm'
import { ordersService } from '@/services/client/orders.service'

export default function PlaceOrderButton({ detailedCart, loadDetailedCart, clearCart }) {
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
		},
		onError: () => {
			toast.error('Error placing order!')
		},
		onSettled: () => setIsSubmitting(false)
	})

	return (
		<CheckoutForm
			onSubmit={address => {
				setIsSubmitting(true)
				placeOrder(address)
			}}
			isSubmitting={isSubmitting}
		/>
	)
}
