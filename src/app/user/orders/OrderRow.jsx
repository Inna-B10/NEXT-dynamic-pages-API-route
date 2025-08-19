import cn from 'clsx'

export function OrderRow({ isActive, label, value, children }) {
	return (
		<p>
			<span
				className={cn(
					'font-semibold text-nowrap',
					isActive ? 'text-accentSecondary' : 'text-muted'
				)}
			>
				{label}
			</span>

			{value || children}
		</p>
	)
}
