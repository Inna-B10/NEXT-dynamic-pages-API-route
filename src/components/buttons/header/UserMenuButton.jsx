import Link from 'next/link'
import clsx from 'clsx'

export function UserMenuButton({
	href,
	title,
	ariaLabel,
	icon,
	badgeCount,
	asDiv = false,
	isActiveIcon = false,
	children
}) {
	const content = (
		<div
			className={clsx(
				'relative flex items-center justify-center rounded-full bp520:border-2 transition-all',
				isActiveIcon
					? 'border-accent text-accent'
					: 'border-turquoise text-turquoise hover:border-accent  hover:text-accent'
			)}
			style={{
				width: 'clamp(28px, 6vw, 40px)',
				height: 'clamp(28px, 6vw, 40px)'
			}}
			title={title}
			aria-label={ariaLabel}
		>
			{icon}
			{badgeCount && badgeCount > 0 ? (
				<span className='absolute rounded-full -bottom-1.5 -right-1.5 w-5 h-5 bg-accent content-center text-center text-black text-xs font-semibold'>
					{badgeCount}
				</span>
			) : (
				''
			)}
			{children}
		</div>
	)

	// return without Link if asDiv === true
	if (asDiv || !href) return content

	return <Link href={href}>{content}</Link>
}
