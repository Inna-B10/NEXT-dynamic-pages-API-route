export default function CheckoutFormInput({
	setFormData,
	value,
	label,
	name,
	required = true,
	disabled = false,
	type = 'text'
}) {
	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	return (
		<span className='w-full flex justify-between items-center gap-x-2'>
			<label
				htmlFor={name}
				className='text-nowrap'
			>
				{label}
			</label>
			<input
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				required={required}
				disabled={disabled}
				className='w-3/4 outline-0 border border-dark-gray p-1 rounded'
			/>
		</span>
	)
}
