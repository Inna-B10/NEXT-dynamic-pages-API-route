'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { Menu, X } from 'react-feather'
import { MenuItem } from './MenuItem'

export function SidebarMenu({ menu, isCollapsed, toggleSidebar }) {
	const pathname = usePathname()
	return (
		<nav className='overflow-hidden'>
			<ul className='mt-4 p-4 space-y-3'>
				<li>
					<button
						onClick={toggleSidebar}
						className='cursor-pointer hover:text-accentSecondary w-full'
						title={isCollapsed ? 'Open Menu' : 'Collapse sidebar'}
						aria-label={isCollapsed ? 'Open Menu' : 'Collapse sidebar'}
					>
						{isCollapsed ? <Menu /> : <X className='float-right -mr-1' />}
					</button>
				</li>
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
