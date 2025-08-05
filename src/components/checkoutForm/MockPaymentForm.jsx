import { useState } from 'react'
import { Button } from '../ui/Button'
import CheckoutFormInput from './CheckoutFormInput'

export function MockPaymentForm({ onSubmit, isSubmitting, onClose }) {
	const [card, setCard] = useState({
		card_number: '',
		expiry: '',
		cvc: ''
	})

	const handleChange = e => {
		const { name, value } = e.target
		setCard(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col space-y-4'
		>
			<CheckoutFormInput
				value={card.card_number}
				name='card_number'
				id='card_number'
				type='number'
				label='Card Number:'
				disabled={isSubmitting}
				required
				onChange={handleChange}
			/>
			<CheckoutFormInput
				value={card.expiry}
				name='expiry'
				id='expiry'
				label='Expiry:'
				placeholder='MM/YY'
				disabled={isSubmitting}
				required
				onChange={handleChange}
			/>

			<CheckoutFormInput
				value={card.cvc}
				name='cvc'
				id='cvc'
				type='number'
				label='CVC:'
				disabled={isSubmitting}
				required
				onChange={handleChange}
			/>

			<div className='flex flex-col gap-2 w-fit mx-auto'>
				<Button
					type='submit'
					disabled={isSubmitting}
				>
					Pay
				</Button>
				<Button
					onClick={onClose}
					disabled={isSubmitting}
					variant='simple'
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
