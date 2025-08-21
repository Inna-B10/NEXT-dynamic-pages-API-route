import Link from 'next/link'
import clsx from 'clsx'

export function MenuItem({ item, isActive, isCollapsed }) {
	return (
		<li>
			<Link
				href={item.link}
				title={`Open ${item.label} page`}
				aria-label={`Open ${item.label} page`}
				className='group flex gap-4 py-2 transition-colors duration-300 hover:text-turquoise'
			>
				<item.icon
					className={clsx('min-w-6 pb-[5px]', {
						'text-turquoise': isActive
					})}
				/>
				<span className={isActive ? 'underline underline-offset-4 text-turquoise' : ''}>
					{item.label}
				</span>
			</Link>
		</li>
	)
}
