import { formatLabel } from '@/lib/utils/orderForm/orderFormFormatters'

export default function OrderFormInput({ field, register, handleOnchange, onBlur, errors }) {
	return (
		<>
			<span className='w-full flex justify-between items-center gap-x-2'>
				<label htmlFor={field}>{formatLabel(field)}:</label>
				<input
					{...register(field)}
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
