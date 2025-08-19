import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = {
	title: 'My Orders',
	...NO_INDEX_PAGE
}
export default function Orders() {
	return (
		<DynamicWrapperNoChildren
			componentKey='orders'
			exportName='OrdersPage'
		/>
	)
}
