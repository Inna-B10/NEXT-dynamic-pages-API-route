import Link from 'next/link'
import { Button } from '../../ui/Button'

export default function UserMenuButton({ children, label, href, count, ...props }) {
	return (
		<Link
			href={href}
			aria-label={label}
			title={label}
			className='focus:outline-none'
			tabIndex={-1}
		>
			<Button
				aria-label={label}
				className='relative'
				variant='transparent-rounded'
				{...props}
			>
				{children}
				{/* {typeof count === 'number' && count > 0 && (
				<Badge className='absolute -top-1 -right-1 text-xs px-1 py-0.5'>
					{count}
				</Badge>
			)} */}
			</Button>
		</Link>
	)
}
