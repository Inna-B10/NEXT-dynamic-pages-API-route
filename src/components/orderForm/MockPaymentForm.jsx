import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PAYMENT_FIELDS } from '@/constants/constants'
import { Button } from '../ui/Button'
import OrderFormInput from './OrderFormInput'
import {
	formatCardNumber,
	formatCvc,
	formatExpiry
} from '@/lib/utils/orderForm/orderFormFormatters'
import { createCleanedValue, createHandleChange } from '@/lib/utils/orderForm/orderInputHandlers'
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

	//visual formatting of inputs
	const formatters = {
		card_number: formatCardNumber,
		expiry: formatExpiry,
		cvc: formatCvc
	}

	const handleChange = createHandleChange(setValue, formatters)
	const cleanedValue = createCleanedValue(setValue)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col space-y-4'
		>
			{PAYMENT_FIELDS.map(field => (
				<div
					key={field}
					className='mb-6'
				>
					<OrderFormInput
						field={field}
						register={register}
						handleOnchange={handleChange}
						errors={errors}
						onBlur={() => cleanedValue(field)}
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
