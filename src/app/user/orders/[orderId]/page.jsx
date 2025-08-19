import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = {
	title: 'Order Details',
	...NO_INDEX_PAGE
}

export default async function OrderDetails(props) {
	const params = await props.params
	const { orderId } = params

	return (
		<DynamicWrapperNoChildren
			componentKey='order-details'
			exportName='OrderDetailsPage'
			orderId={orderId}
		/>
	)
}
