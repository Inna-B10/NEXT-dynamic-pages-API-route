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
				className='whitespace-nowrap border-r border-border bg-bg fixed top-0 left-0 bottom-0 w-0 z-50'
				animate={{ width: isCollapsedSidebar ? 56 : 200 }}
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
