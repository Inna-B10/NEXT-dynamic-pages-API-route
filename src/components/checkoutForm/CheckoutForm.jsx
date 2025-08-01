import { useState } from 'react'
import { Button } from '../ui/Button'
import CheckoutFormInput from './CheckoutFormInput'

export default function CheckoutForm({ onSubmit, isSubmitting, onClose }) {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		street: '',
		city: '',
		zip: '',
		country: 'Norway'
	})

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit(formData)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col space-y-4'
		>
			<CheckoutFormInput
				setFormData={setFormData}
				value={formData.fullName}
				label='Full Name:'
				name='fullName'
			/>

			<CheckoutFormInput
				setFormData={setFormData}
				value={formData.phone}
				label='Phone:'
				name='phone'
				type='number'
			/>

			<CheckoutFormInput
				setFormData={setFormData}
				value={formData.street}
				label='Street:'
				name='street'
			/>

			<CheckoutFormInput
				setFormData={setFormData}
				value={formData.city}
				label='City:'
				name='city'
			/>

			<CheckoutFormInput
				setFormData={setFormData}
				value={formData.zip}
				label='ZIP Code:'
				name='zip'
				type='number'
			/>

			<CheckoutFormInput
				setFormData={setFormData}
				value={formData.country}
				label='Country:'
				name='country'
				disabled={true}
			/>
			<div className='flex flex-col gap-2 w-fit mx-auto'>
				<Button
					type='submit'
					disabled={isSubmitting}
					className='w-fit mx-auto'
				>
					Checkout
				</Button>
				<Button
					onClick={onClose}
					disabled={isSubmitting}
					variant='simple'
					className=''
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
