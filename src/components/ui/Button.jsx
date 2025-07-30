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
					'flex items-center justify-center gap-2 tracking-wider text-sm text-nowrap font-bold uppercase rounded transition-all cursor-pointer disabled:bg-dark-gray disabled:hover:text-foreground disabled:text-foreground border-none',
					className,
					{
						'px-4 py-2 h-9 lg:h-10 bg-accentSecondary-dark text-accent text-shadow-md hover:bg-accentSecondary hover:text-accent':
							variant === 'primary'
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
