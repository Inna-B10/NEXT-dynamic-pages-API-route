import Link from 'next/link'
import clsx from 'clsx'
import { LogOut, Menu } from 'react-feather'
import { SITE_NAME } from '@/constants/constants'

export function SidebarHeader({ isCollapsed, toggleSidebar }) {
	return (
		<div
			className={clsx(
				'flex items-center h-26 px-5',
				isCollapsed ? 'justify-center' : 'justify-between'
			)}
		>
			{!isCollapsed && (
				<Link
					href='/'
					title={`${SITE_NAME} - homepage`}
					aria-label={`${SITE_NAME} - homepage`}
				>
					<h2 className='text-2xl'>SiteLogo</h2>
				</Link>
			)}
			<button
				onClick={toggleSidebar}
				className='cursor-pointer hover:text-blue'
			>
				{isCollapsed ? <Menu /> : <LogOut style={{ transform: 'scale(-1,-1)' }} />}
			</button>
		</div>
	)
}
