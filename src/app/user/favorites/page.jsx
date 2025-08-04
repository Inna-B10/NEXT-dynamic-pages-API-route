import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DynamicFavoritesPage } from './DynamicFavoritesPage'

export const metadata = {
	title: 'Favorites',
	...NO_INDEX_PAGE
}
export default function Favorites() {
	return <DynamicFavoritesPage />
}
