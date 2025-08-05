import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import OrderFormInput from './OrderFormInput'
import { formatCardNumber, formatCvc, formatExpiry } from '@/lib/utils/orderFormFormatters'
import { paymentSchema } from '@/lib/zod/paymentSchema'

export function MockPaymentForm({ onSubmit, isSubmitting, onClose }) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(paymentSchema),
		mode: 'onChange',
		defaultValues: {
			card_number: '',
			expiry: '',
			cvc: ''
		}
	})

	const handleCardChange = e => {
		const formatted = formatCardNumber(e.target.value)
		setValue('card_number', formatted)
	}
	const handleExpiryChange = e => {
		const formatted = formatExpiry(e.target.value)
		setValue('expiry', formatted)
	}
	const handleCvcChange = e => {
		const formatted = formatCvc(e.target.value)
		setValue('cvc', formatted)
	}
	const handleOnchange = field => e => {
		if (field === 'card_number') handleCardChange(e)
		if (field === 'expiry') handleExpiryChange(e)
		if (field === 'cvc') handleCvcChange(e)
		return
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col space-y-4'
		>
			{['card_number', 'expiry', 'cvc'].map(field => (
				<div
					key={field}
					className='mb-6'
				>
					<OrderFormInput
						field={field}
						register={register}
						handleOnchange={handleOnchange}
						errors={errors}
					/>
				</div>
			))}

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
