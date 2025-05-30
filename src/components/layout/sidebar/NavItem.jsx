import Link from 'next/link'

export function NavItem({ menu, isCollapsed }) {
	return (
		<ul className='p-4'>
			{menu.map((data, index) => (
				<li
					key={index}
					className='hover:underline underline-offset-4 pb-2 pl-4 transition-all duration-200 hover:text-secondary cursor-pointer'
				>
					<Link
						href={data.link}
						title={`Open ${data.label} page`}
						aria-label={`Open ${data.label} page`}
					>
						{data.label}
					</Link>
				</li>
			))}
		</ul>
	)
}
