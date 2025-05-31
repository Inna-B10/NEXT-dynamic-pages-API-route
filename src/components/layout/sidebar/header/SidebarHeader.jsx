import clsx from 'clsx'
import { LogOut, Menu } from 'react-feather'

export function SidebarHeader({ isCollapsed, toggleSidebar }) {
	return (
		<div
			className={clsx(
				'flex items-center h-26 px-5',
				isCollapsed ? 'justify-center' : 'justify-between'
			)}
		>
			{!isCollapsed && <h2 className='text-2xl'>SiteName</h2>}
			<button
				onClick={toggleSidebar}
				className='cursor-pointer hover:text-blue'
			>
				{isCollapsed ? <Menu /> : <LogOut style={{ transform: 'scale(-1,-1)' }} />}
			</button>
		</div>
	)
}
