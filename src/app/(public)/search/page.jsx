import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = {
	title: 'Search',
	...NO_INDEX_PAGE
}
export default function Search() {
	return (
		<DynamicWrapperNoChildren
			componentKey='search'
			exportName='SearchPage'
		/>
	)
}
