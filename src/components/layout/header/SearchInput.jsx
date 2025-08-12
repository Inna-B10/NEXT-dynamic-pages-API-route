import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchInput() {
	const [value, setValue] = useState('')
	const router = useRouter()

	const handleSubmit = e => {
		e.preventDefault()
		if (value.trim()) {
			router.push(`/search?query=${encodeURIComponent(value.trim())}`)
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
					value={value}
					onChange={e => setValue(e.target.value)}
					className='w-full min-w-40 border border-accentSecondary text-xs italic p-1.5 sm:p-2 rounded md:ml-4'
				/>
			</label>
		</form>
	)
}
