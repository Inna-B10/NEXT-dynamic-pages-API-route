import cn from 'clsx'

export function OrderRow({ isActive, label, value, children }) {
	return (
		<p>
			<span className={cn('font-semibold', isActive ? 'text-accentSecondary' : 'text-muted')}>
				{label}
			</span>

			{value || children}
		</p>
	)
}
