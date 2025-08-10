import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ADDRESS_FIELDS } from '@/constants/constants'
import { Button } from '../ui/Button'
import Spinner from '../ui/Spinner'
import OrderFormInput from './OrderFormInput'
import { isDev } from '@/lib/utils/isDev'
import { formatPhone, formatZip } from '@/lib/utils/orderForm/orderFormFormatters'
import { createCleanedValue, createHandleChange } from '@/lib/utils/orderForm/orderInputHandlers'
import { addressSchema } from '@/lib/zod/addressSchema'
import { ordersService } from '@/services/client/orders.service'

export default function AddressForm({ onSubmit, isSubmitting, onClose }) {
	const [defaultAddress, setDefaultAddress] = useState(null)
	const [loading, setLoading] = useState(true)

	//register data with react-hook-form
	const formMethods = useForm({
		resolver: zodResolver(addressSchema),
		mode: 'onChange',
		defaultValues: {}
	})

	//get user's last order address if exists and set as default
	useEffect(() => {
		async function fetchAddress() {
			try {
				const res = await ordersService.getLastOrderAddress()
				if (res?.data) {
					setDefaultAddress(res.data)
					formMethods.reset(res.data) // update form with values from the server
				} else {
					setDefaultAddress({ country: 'Norway' }) // set default country
					formMethods.reset({ country: 'Norway' }) // send default value to input
				}
			} catch (err) {
				if (isDev()) {
					console.error(err)
				}
				setDefaultAddress({ country: 'Norway' })
				formMethods.reset({ country: 'Norway' })
			} finally {
				setLoading(false)
			}
		}

		fetchAddress()
	}, [])

	//visual formatting of inputs
	const formatters = {
		phone: formatPhone,
		zip: formatZip
	}

	const handleChange = createHandleChange(formMethods.setValue, formatters)
	const cleanedValue = createCleanedValue(formMethods.setValue)

	return (
		<>
			{/* while getting address */}
			{loading && (
				<div className='z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
					<Spinner
						size={60}
						message='Loading...'
					/>
				</div>
			)}

			{/* render address form */}
			{!loading && (
				<form
					onSubmit={formMethods.handleSubmit(onSubmit)}
					className='flex flex-col space-y-4'
				>
					{ADDRESS_FIELDS.map(field => (
						<div
							key={field}
							className='mb-6'
						>
							<OrderFormInput
								field={field}
								register={formMethods.register}
								handleOnchange={handleChange}
								errors={formMethods.formState.errors}
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
			)}
		</>
	)
}
