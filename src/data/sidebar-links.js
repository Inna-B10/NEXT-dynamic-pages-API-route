import { AtSign, Camera, Home, Package } from 'react-feather'
import { PUB_PAGES } from '@/config/public-pages'

export const NAV_LINKS = [
	{
		icon: Home,
		label: 'Home',
		link: PUB_PAGES.HOME
	},
	{
		icon: Camera,
		label: 'Cameras',
		link: PUB_PAGES.CAMERAS()
	},
	{
		icon: Package,
		label: 'Items',
		link: PUB_PAGES.ITEMS()
	},
	{
		icon: AtSign,
		label: 'Contact',
		link: PUB_PAGES.CONTACT
	}
]
