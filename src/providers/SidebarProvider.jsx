import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(undefined)

export function SidebarProvider({ children }) {
	const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false)

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
