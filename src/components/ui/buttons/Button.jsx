export function Button({ children, isLoading, variant = 'primary', ...props }) {
	return (
		<button
			className='px-6 h-10 pt-1 w-fit flex gap-4 items-center justify-center bg-blue-400 text-white tracking-wider font-bold uppercase rounded hover:bg-blue-500 hover:text-yellow-300 transition'
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
