import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function Auth() {
	return (
		<DynamicWrapperNoChildren
			componentKey='auth'
			exportName='AuthPage'
		/>
	)
}
