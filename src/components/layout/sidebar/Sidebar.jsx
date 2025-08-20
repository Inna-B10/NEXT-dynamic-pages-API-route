'use client'

import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import { useSidebar } from '@/providers/SidebarProvider'
import { NAV_LINKS } from '@/constants/sidebar-links'
import { SidebarMenu } from './menu/SidebarMenu'

export function Sidebar() {
	const { isCollapsedSidebar, toggleSidebar } = useSidebar()

	return (
		<AnimatePresence>
			<m.aside
				className='whitespace-nowrap border-r border-border bg-bg w-0 fixed top-0 left-0 bottom-0 z-50 lg:sticky lg:top-0 lg:z-0 lg:h-screen'
				animate={{ width: isCollapsedSidebar ? 56 : 250 }}
				initial={false}
				transition={{ type: 'spring', stiffness: 300, damping: 23 }}
			>
				<SidebarMenu
					menu={NAV_LINKS}
					isCollapsed={isCollapsedSidebar}
					toggleSidebar={toggleSidebar}
				/>
			</m.aside>
		</AnimatePresence>
	)
}
