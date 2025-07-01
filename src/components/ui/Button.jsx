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
					'flex items-center justify-center tracking-wider text-sm font-bold uppercase rounded hover:bg-blue-500 hover:text-yellow transition cursor-pointer',
					className,
					{
						'px-4 py-2 h-9 lg:h-10 bg-blue-400 text-white': variant === 'primary',
						'p-1 bg-transparent text-blue': variant === 'transparent',

						'rounded-full border-2 border-blue w-10 h-10 text-blue bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow focus:border-0 hover:border-yellow':
							variant === 'rounded'
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
