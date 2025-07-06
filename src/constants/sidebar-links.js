import { AtSign, Home } from 'react-feather'
import { CATEGORIES } from './categories'
import { PUB_PAGES } from '@/lib/routes/public-pages'

export const NAV_LINKS = [
	{
		icon: Home,
		label: 'Home',
		link: PUB_PAGES.HOME
	},
	...CATEGORIES.map(cat => ({
		icon: cat.icon,
		label: cat.label,
		link: PUB_PAGES.CATEGORY(cat.slug)
	})),
	{
		icon: AtSign,
		label: 'Contact',
		link: PUB_PAGES.CONTACT
	}
]
