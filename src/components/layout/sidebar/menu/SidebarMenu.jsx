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
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isCollapsed: isCollapsed
					}
					return (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
