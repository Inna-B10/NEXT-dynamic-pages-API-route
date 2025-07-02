import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Button({
	children,
	isLoading,
	className,
	variant = 'primary',
	icon: Icon,
	...props
}) {
	return (
		<button
			className={twMerge(
				clsx(
					'flex items-center justify-center tracking-wider text-sm font-bold uppercase rounded hover:bg-blue-500 hover:text-yellow transition cursor-pointer focus:outline-none',
					className,
					{
						'px-4 py-2 h-9 lg:h-10 bg-blue-400 text-white': variant === 'primary',
						'bg-transparent': variant === 'transparent',

						'bg-transparent rounded-full': variant === 'transparent-rounded'
					}
				)
			)}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{Icon && <Icon />}
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
