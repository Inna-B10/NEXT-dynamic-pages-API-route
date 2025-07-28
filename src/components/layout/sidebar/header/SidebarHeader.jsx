import clsx from 'clsx'
import { Menu, X } from 'react-feather'
import { Logo } from '@/components/ui/Logo'

export function SidebarHeader({ isCollapsed, toggleSidebar }) {
	return (
		<div className={clsx('flex items-center h-26 px-4', isCollapsed ? 'justify-center' : 'gap-3')}>
			<button
				onClick={toggleSidebar}
				className='cursor-pointer hover:text-accentSecondary'
				title={isCollapsed ? 'Open Menu' : 'Collapse sidebar'}
				aria-label={isCollapsed ? 'Open Menu' : 'Collapse sidebar'}
			>
				{isCollapsed ? (
					<Menu />
				) : (
					<X
						size={30}
						style={{ transform: 'scale(-1,-1)' }}
					/>
				)}
			</button>
			{!isCollapsed && <Logo />}
		</div>
	)
}
