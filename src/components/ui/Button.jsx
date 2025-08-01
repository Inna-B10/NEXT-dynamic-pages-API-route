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
					'flex items-center justify-center gap-2 tracking-wider text-sm text-nowrap font-bold uppercase rounded transition-all cursor-pointer disabled:bg-dark-gray disabled:hover:text-foreground disabled:text-foreground',
					className,
					{
						'px-4 py-2 h-9 lg:h-10 border-none bg-accentSecondary-dark text-accent text-shadow-md hover:bg-accentSecondary hover:text-accent':
							variant === 'primary',
						'': variant === 'icon',
						'border border-dark-gray bg-bgSecondary px-4 py-2 text-xs hover:border-white hover:text-white':
							variant === 'simple',
						'border border-border bg-bgSecondary px-4 py-2 text-xs hover:text-red-500 hover:border-red-500':
							variant === 'warn'
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
