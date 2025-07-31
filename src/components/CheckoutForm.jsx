import { useState } from 'react'
import { Button } from './ui/Button'

export default function CheckoutForm({ onSubmit, isSubmitting }) {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		street: '',
		city: '',
		zip: '',
		country: 'Norway'
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(formData)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			<input
				name='fullName'
				required
				onChange={handleChange}
				value={formData.fullName}
				placeholder='Full Name'
			/>
			<input
				name='phone'
				required
				onChange={handleChange}
				value={formData.phone}
				placeholder='Phone'
			/>
			<input
				name='street'
				required
				onChange={handleChange}
				value={formData.street}
				placeholder='Street'
			/>
			<input
				name='city'
				required
				onChange={handleChange}
				value={formData.city}
				placeholder='City'
			/>
			<input
				name='zip'
				required
				onChange={handleChange}
				value={formData.zip}
				placeholder='ZIP Code'
			/>
			<input
				name='country'
				onChange={handleChange}
				value={formData.country}
				placeholder='Country'
			/>
			<Button
				type='submit'
				disabled={isSubmitting}
			>
				Checkout
			</Button>
		</form>
	)
}
