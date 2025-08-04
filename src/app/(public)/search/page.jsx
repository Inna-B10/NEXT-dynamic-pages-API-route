import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DynamicSearchPage } from './DynamicSearchPage'

export const metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}
export default function Search() {
	return <DynamicSearchPage />
}
