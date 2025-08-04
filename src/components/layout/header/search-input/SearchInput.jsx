import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchInput() {
	const [value, setValue] = useState('')
	const router = useRouter()

	const handleKeyDown = e => {
		if (e.key === 'Enter' && value.trim()) {
			router.push(`/search?query=${encodeURIComponent(value.trim())}`)
			setValue('')
		}
	}
	return (
		<label htmlFor='search'>
			<input
				type='search'
				id='search'
				placeholder='Search'
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				className='w-full min-w-40 border border-accentSecondary text-xs italic p-1.5 sm:p-2 rounded md:ml-4'
			/>
		</label>
	)
}
