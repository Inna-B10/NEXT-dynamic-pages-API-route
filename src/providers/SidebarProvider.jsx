'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SidebarContext = createContext(undefined)

export function SidebarProvider({ children }) {
	const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(() => {
		if (typeof window !== 'undefined' && window.innerWidth < 1024) return true
		return false
	})
	const pathname = usePathname()

	//screen<1024px - fixed, z-50, auto-collapsed
	//screen>=1024px - static, z-0, user controlled

	// collapse panel after transition if width is less than 1024px
	useEffect(() => {
		if (typeof window !== 'undefined' && window.innerWidth < 1024) {
			setIsCollapsedSidebar(true)
		}
	}, [pathname])

	const toggleSidebar = () => {
		setIsCollapsedSidebar(prev => !prev)
	}

	return (
		<SidebarContext.Provider value={{ isCollapsedSidebar, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	)
}

export function useSidebar() {
	const context = useContext(SidebarContext)
	if (!context) throw new Error('useSidebar must be used within SidebarProvider')
	return context
}
