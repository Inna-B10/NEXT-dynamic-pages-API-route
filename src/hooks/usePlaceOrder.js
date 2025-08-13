import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { ordersService } from '@/services/client/orders.service'

export function usePlaceOrder({ detailedCart, clearCart, loadDetailedCart, onOrderSuccess }) {
	const [step, setStep] = useState('address')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [addressData, setAddressData] = useState(null)

	const { mutate: placeOrder } = useMutation({
		mutationFn: async () => {
			const items = detailedCart.map(item => ({
				productId: item._id,
				productName: item.productName,
				quantity: 1, //[TODO] so far no change in quantity
				price: item.price,
				categorySlug: item.categorySlug,
				imageUrl: item.imageUrl
			}))
			const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

			await ordersService.createNewOrder(items, totalPrice, addressData)
		},
		onSuccess: () => {
			clearCart()
			setStep('address')
			loadDetailedCart()
			setTimeout(onOrderSuccess, 1000)
		},
		onError: () => toast.error('Error placing order!'),
		onSettled: () => setIsSubmitting(false)
	})

	return {
		step,
		setStep,
		isSubmitting,
		setIsSubmitting,
		setAddressData,
		placeOrder
	}
}
