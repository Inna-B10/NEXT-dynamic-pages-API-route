import { NavItem } from './NavItem'
import { NAV_LINKS } from '@/data/sidebar-links'

export function Sidebar() {
	return (
		<aside className='whitespace-nowrap overflow-hidden bg-stone-500 w-1/6'>
			<NavItem menu={NAV_LINKS} />
		</aside>
	)
}
