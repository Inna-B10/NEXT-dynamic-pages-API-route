'use client'

import { useSidebar } from '@/providers/SidebarProvider'
import { NavHeader } from './NavHeader'
import { NavItem } from './NavItem'
import { NAV_LINKS } from '@/data/sidebar-links'

export function Sidebar() {
	const { isCollapsedSidebar, toggleSidebar } = useSidebar()

	return (
		<aside
			className={`whitespace-nowrap overflow-hidden border-r border-border my-4 ${isCollapsedSidebar ? 'w-16' : 'w-1/6'}`}
		>
			<NavHeader
				isCollapsed={isCollapsedSidebar}
				toggleSidebar={toggleSidebar}
			/>
			<NavItem
				menu={NAV_LINKS}
				isCollapsed={isCollapsedSidebar}
			/>
		</aside>
	)
}
