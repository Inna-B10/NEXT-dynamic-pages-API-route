'use client'

import { useSidebar } from '@/providers/SidebarProvider'
import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menu/SidebarMenu'
import { NAV_LINKS } from '@/data/sidebar-links'

export function Sidebar() {
	const { isCollapsedSidebar, toggleSidebar } = useSidebar()

	return (
		<aside
			className={`whitespace-nowrap overflow-hidden border-r border-border my-4 ${isCollapsedSidebar ? 'w-14' : 'w-1/6'}`}
		>
			<SidebarHeader
				isCollapsed={isCollapsedSidebar}
				toggleSidebar={toggleSidebar}
			/>

			<SidebarMenu
				menu={NAV_LINKS}
				isCollapsed={isCollapsedSidebar}
			/>
		</aside>
	)
}
