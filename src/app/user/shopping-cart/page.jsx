import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = {
	title: 'Shopping Cart',
	...NO_INDEX_PAGE
}

export default function ShoppingCart() {
	return (
		<DynamicWrapperNoChildren
			componentKey='shopping-cart'
			exportName='ShoppingCartPage'
		/>
	)
}
