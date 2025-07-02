import { Loader } from 'react-feather'

export default function Spinner({ size, message = '' }) {
	return (
		<div className='flex flex-col items-center justify-center  w-full py-10'>
			<Loader
				size={size}
				className='mx-auto mt-10 animate-spin'
			/>
			<p className='text-gray-400 text-sm'>{message}</p>
		</div>
	)
}
