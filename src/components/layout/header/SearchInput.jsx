import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function SearchInput() {
	const [value, setValue] = useState('')
	const router = useRouter()

	const handleSubmit = e => {
		e.preventDefault()
		if (value.trim().length >= 2) {
			router.push(`/search?query=${encodeURIComponent(value.trim())}`)
			setValue('')
		} else {
			toast.error('Missing or too short query\n Minimum length: 2 symbols')
			setValue('')
		}
	}
	return (
		<form
			onSubmit={handleSubmit}
			className='w-full'
		>
			<label htmlFor='search'>
				<input
					type='search'
					id='search'
					placeholder='Search'
					required
					value={value}
					onChange={e => setValue(e.target.value)}
					className='w-full min-w-40 border border-accentSecondary text-xs italic p-1.5 sm:p-2 bp896:text-sm rounded'
				/>
			</label>
		</form>
	)
}
