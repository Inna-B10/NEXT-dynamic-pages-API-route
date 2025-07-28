import Link from 'next/link'
import clsx from 'clsx'

export function MenuItem({ item, isActive, isCollapsed }) {
	return (
		<li>
			<Link
				href={item.link}
				title={`Open ${item.label} page`}
				aria-label={`Open ${item.label} page`}
				className={clsx('group flex gap-4 py-2', {
					'hover: cursor-default': isActive,
					'transition-all duration-200 hover:text-accentSecondary': !isActive
				})}
			>
				<item.icon
					className={clsx('min-w-6 pb-[5px]', {
						'text-accentSecondary': isCollapsed && isActive
					})}
				/>
				<span className={isActive ? 'underline underline-offset-3' : ''}>{item.label}</span>
			</Link>
		</li>
	)
}
