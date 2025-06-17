'use client'

import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { useSidebar } from '@/providers/SidebarProvider'
import { NAV_LINKS } from '@/constants/sidebar-links'
import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menu/SidebarMenu'

export function Sidebar() {
	const { isCollapsedSidebar, toggleSidebar } = useSidebar()

	return (
		<AnimatePresence>
			<m.aside
				className='whitespace-nowrap overflow-hidden border-r border-border my-4 w-0'
				animate={{ width: isCollapsedSidebar ? 56 : 250 }}
				initial={false}
				transition={{ type: 'spring', stiffness: 300, damping: 23 }}
			>
				<SidebarHeader
					isCollapsed={isCollapsedSidebar}
					toggleSidebar={toggleSidebar}
				/>

				<SidebarMenu
					menu={NAV_LINKS}
					isCollapsed={isCollapsedSidebar}
				/>
			</m.aside>
		</AnimatePresence>
	)
}
