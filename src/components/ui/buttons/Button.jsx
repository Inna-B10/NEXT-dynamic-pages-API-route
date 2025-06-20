export function Button({ children, isLoading, variant = 'primary', ...props }) {
	return (
		<button
			className='px-4 py-2 h-9 gap-2 lg:h-10 w-full flex items-center justify-center bg-blue-400 text-white tracking-wider text-sm font-bold uppercase rounded hover:bg-blue-500 hover:text-yellow transition cursor-pointer'
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
