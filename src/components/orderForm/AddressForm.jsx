import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ADDRESS_FIELDS } from '@/constants/constants'
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

	//visual formatting of inputs
	const formatters = {
		phone: formatPhone,
		zip: formatZip
	}

	const handleChange = field => e => {
		const rawValue = e.target.value
		const formatterFunction = formatters[field]
		const formattedValue = formatterFunction ? formatterFunction(rawValue) : rawValue
		setValue(field, formattedValue)
	}

	const cleanedValue = value => e => {
		const rawValue = e.target.value.trim().replace(/\s+/g, ' ')
		setValue(value, rawValue)
	}

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
