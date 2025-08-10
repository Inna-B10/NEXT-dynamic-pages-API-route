import { useEffect, useRef } from 'react'
import { formatLabel } from '@/lib/utils/orderForm/orderFormFormatters'

export default function OrderFormInput({ field, register, handleOnchange, onBlur, errors }) {
	const inputRef = useRef(null)

	//autofocus on first input of each form
	useEffect(() => {
		if (field === 'first_name' || field === 'card_number') {
			inputRef.current?.focus()
		}
	}, [field])

	const { ref, ...rest } = register(field) //get ref from react-hook-form

	return (
		<>
			<span className='w-full flex justify-between items-center gap-x-2'>
				<label htmlFor={field}>{formatLabel(field)}:</label>
				<input
					{...rest}
					id={field}
					autoComplete='true'
					ref={el => {
						ref(el) // send to react-hook-form
						inputRef.current = el // and to our ref
					}}
					onChange={handleOnchange(field)}
					onBlur={onBlur(field)}
					disabled={field === 'country'}
					placeholder={field === 'expiry' ? 'mm/yy' : ''}
					className='w-3/4 outline-0 border border-dark-gray p-1 rounded'
				/>
			</span>
			<p className='text-red-400 text-sm'>{errors[field]?.message}</p>
		</>
	)
}
