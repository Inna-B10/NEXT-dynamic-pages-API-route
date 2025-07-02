import clsx from 'clsx'
import { LogOut, Menu } from 'react-feather'
import { Logo } from '@/components/ui/Logo'

export function SidebarHeader({ isCollapsed, toggleSidebar }) {
	return (
		<div
			className={clsx(
				'flex items-center h-26 px-5',
				isCollapsed ? 'justify-center' : 'justify-between'
			)}
		>
			{!isCollapsed && <Logo />}
			<button
				onClick={toggleSidebar}
				className='cursor-pointer hover:text-blue'
				title={isCollapsed ? 'Open Menu' : 'Collapse sidebar'}
				aria-label={isCollapsed ? 'Open Menu' : 'Collapse sidebar'}
			>
				{isCollapsed ? <Menu /> : <LogOut style={{ transform: 'scale(-1,-1)' }} />}
			</button>
		</div>
	)
}
