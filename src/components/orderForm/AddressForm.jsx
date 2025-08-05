import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'
import OrderFormInput from './OrderFormInput'
import { formatPhone, formatZip } from '@/lib/utils/orderFormFormatters'
import { addressSchema } from '@/lib/zod/addressSchema'

export default function AddressForm({ onSubmit, isSubmitting, onClose }) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(addressSchema),
		mode: 'onChange',
		defaultValues: {
			first_name: '',
			last_name: '',
			phone: '',
			street: '',
			city: '',
			zip: '',
			country: 'Norway'
		}
	})

	const handlePhoneChange = e => {
		const formatted = formatPhone(e.target.value)
		setValue('phone', formatted)
	}

	const handleZipChange = e => {
		const formatted = formatZip(e.target.value)
		setValue('zip', formatted)
	}

	const handleOnchange = field => e => {
		if (field === 'phone') handlePhoneChange(e)
		if (field === 'zip') handleZipChange(e)
		return
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col space-y-4'
		>
			{['first_name', 'last_name', 'phone', 'street', 'city', 'zip', 'country'].map(field => (
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
