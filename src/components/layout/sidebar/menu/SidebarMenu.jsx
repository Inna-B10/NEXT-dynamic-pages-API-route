'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { MenuItem } from './MenuItem'

export function SidebarMenu({ menu, isCollapsed }) {
	const pathname = usePathname()
	return (
		<nav className='overflow-hidden'>
			<ul className='p-4'>
				{menu.map(menuItem => {
					const isActive = !!match(menuItem.link, { end: false })(pathname)
					return (
						<MenuItem
							key={menuItem.label}
							item={menuItem}
							isActive={isActive}
							isCollapsed={isCollapsed}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
