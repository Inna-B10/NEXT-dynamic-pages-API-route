import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ShoppingCartDynPage } from './ShoppingCartDynPage'

export const metadata = {
	title: 'Shopping Cart',
	...NO_INDEX_PAGE
}
export default function ShoppingCart() {
	return <ShoppingCartDynPage />
}
