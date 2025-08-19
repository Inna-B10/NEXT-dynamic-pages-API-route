import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ADDRESS_FIELDS } from '@/constants/constants'
import { Button } from '../ui/Button'
import Spinner from '../ui/Spinner'
import OrderFormInput from './OrderFormInput'
import { formatPhone, formatZip } from '@/lib/utils/orderForm/orderForm.formatters'
import {
	createCleanedValue,
	formatOrderFormData
} from '@/lib/utils/orderForm/orderForm.handlers.js'
import { addressSchema } from '@/lib/zod/addressSchema'
import { ordersService } from '@/services/client/orders.service'

export default function AddressForm({ onSubmit, isSubmitting, onClose }) {
	const [isReady, setIsReady] = useState(false)
	/* ------------------- Register Data With React-hook-form ------------------- */
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

	/* ----------------------- Visual Formatting Of Inputs ---------------------- */
	const addressFormatters = {
		phone: formatPhone,
		zip: formatZip
	}
	const handleChange = field => e => {
		setValue(field, formatOrderFormData(field, addressFormatters, e.target.value))
	}
	const cleanedValue = createCleanedValue(setValue)

	/* ------- Get User's Last Order Address If Exists And Set As Default ------- */
	useEffect(() => {
		setIsReady(false)
		async function fetchAddress() {
			try {
				const res = await ordersService.getLastOrderAddress()
				reset(formatOrderFormData(res?.data || {}, addressFormatters))
			} catch (err) {
				reset(formatOrderFormData({}, addressFormatters))
			}
			setIsReady(true)
		}
		fetchAddress()
	}, [reset])

	if (!isReady)
		return (
			<div className='flex items-center justify-center p-10'>
				<Spinner
					size={60}
					message='Loading...'
				/>
			</div>
		)

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
