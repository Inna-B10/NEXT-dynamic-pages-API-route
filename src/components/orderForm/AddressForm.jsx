import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ADDRESS_FIELDS } from '@/constants/constants'
import { Button } from '../ui/Button'
import OrderFormInput from './OrderFormInput'
import { formatPhone, formatZip } from '@/lib/utils/orderForm/orderFormFormatters'
import { createCleanedValue, formatOrderFormData } from '@/lib/utils/orderForm/orderInputHandlers'
import { addressSchema } from '@/lib/zod/addressSchema'
import { ordersService } from '@/services/client/orders.service'

export default function AddressForm({ onSubmit, isSubmitting, onClose }) {
	//register data with react-hook-form
	const {
		reset,
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(addressSchema),
		mode: 'onChange',
		defaultValues: {}
	})

	//visual formatting of inputs
	const addressFormatters = {
		phone: formatPhone,
		zip: formatZip
	}
	const handleChange = field => e => {
		setValue(field, formatOrderFormData(field, e.target.value, addressFormatters))
	}
	const cleanedValue = createCleanedValue(setValue)

	//get user's last order address if exists and set as default
	useEffect(() => {
		async function fetchAddress() {
			try {
				const res = await ordersService.getLastOrderAddress()
				reset(formatOrderFormData(res?.data || {}, addressFormatters))
			} catch (err) {
				reset(formatOrderFormData({}, addressFormatters))
			}
		}
		fetchAddress()
	}, [reset])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col space-y-4'
		>
			{ADDRESS_FIELDS.map(field => (
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

			<div className='flex flex-col gap-2 w-fit mx-auto mt-4'>
				<Button
					type='submit'
					disabled={isSubmitting}
				>
					Go to payment
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
