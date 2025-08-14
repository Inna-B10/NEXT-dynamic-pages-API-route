'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import Spinner from './ui/Spinner'

/**
 * Mapping of component keys to dynamic import functions.
 * Each key corresponds to a React component (usually a page or UI widget)
 * that is loaded dynamically without children support.
 */
const componentImports = {
	'shopping-cart': () => import('@/app/user/shopping-cart/ShoppingCartPage'),
	favorites: () => import('@/app/user/favorites/FavoritesPage'),
	search: () => import('@/app/(public)/search/SearchPage'),
	infiniteList: () => import('@/app/(public)/[category]/InfiniteList'),
	'search-input': () => import('@/components/layout/header/SearchInput'),
	onboarding: () => import('@/components/Onboarding/Onboarding'),
	auth: () => import('@/app/auth/[[...auth]]/AuthPage'),
	orders: () => import('@/app/user/orders/OrdersPage')
}

/**
 * An universal dynamic loader for React components that do NOT have children.
 *
 * Props:
 * @param {string} componentKey - Key to identify which component to dynamically load from `componentImports`.
 * @param {string} [exportName='default'] - The named export to load from the imported module (defaults to 'default').
 * @param {string} [page='true'] - If 'true', shows a loading spinner while the component loads; otherwise no loader.
 * @param {...any} props - Additional props forwarded to the dynamically loaded component.
 *
 * Usage:
 * <DynamicWrapperNoChildren componentKey="search-input" page="false" />
 *
 * This will dynamically import and render the SearchInput component without children.
 * The loading spinner is optional and controlled via the `page` prop.
 */
export function DynamicWrapperNoChildren({
	componentKey,
	exportName = 'default',
	page = 'true',
	...props
}) {
	const importFn = componentImports[componentKey]

	if (!importFn) throw new Error(`Unknown page key: ${componentKey}`)

	const PageComponent = useMemo(() => {
		return dynamic(
			() => importFn().then(mod => mod[exportName] ?? mod.default ?? Object.values(mod)[0]),
			{
				ssr: false,
				loading:
					page === 'true'
						? () => (
								<Spinner
									size={60}
									message='Loading...'
								/>
							)
						: () => null
			}
		)
	}, [componentKey, exportName, page])

	return <PageComponent {...props} />
}
