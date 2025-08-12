'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

/**
 * Dynamically imports and renders a component by its name.
 *
 * Uses React's `useMemo` and Next.js dynamic import to load the component only on the client side,
 * with a fallback loading indicator. It tries to resolve the component export by:
 * named export matching `btnName`, then default export, then the whole module.
 *
 * @param {Object} props
 * @param {string} props.btnName - The exact name of the component file and export to dynamically import.
 * @param {Object} [props.props] - Props to pass down to the dynamically imported component.
 *
 * @returns {JSX.Element|null} The dynamically loaded component with passed props, or null if btnName is falsy.
 */

export function DynamicBtn({ btnName, ...props }) {
	const Component = useMemo(() => {
		if (!btnName) return null

		return dynamic(
			() =>
				import(`./${btnName}`).then(mod => {
					// first trying to take the named export, then default, then the whole module
					return mod[btnName] ?? mod.default ?? mod
				}),
			{
				ssr: false,
				loading: () => <SkeletonLoader />
			}
		)
	}, [btnName])

	if (!btnName) return null
	const Comp = Component
	return <Comp {...props} />
}

/**
 * Wrapper around DynamicBtn to explicitly pass common button-related props.
 *
 * @param {Object} props
 * @param {string} props.btnName - The name of the button component to load dynamically.
 * @param {string} [props.itemId] - ID of the item (passed to the dynamic button). Required for toggle buttons.
 * @param {string} [props.category] - Category of the item (passed to the dynamic button). Required for toggle buttons.
 * @param {string} [props.className] - CSS classes for styling the button.
 * @param {string} [props.variant] - Variant style of the button, e.g. 'icon'.
 * @param {React.ReactNode} [props.icon] - Custom icon to display in the button.
 * @param {string} [props.title] - Title/tooltip for the share buttons. Required for share buttons.
 *
 * @returns {JSX.Element|null} The dynamically loaded button component with given props.
 */
export function DynamicButton({ itemId, category, className, variant, icon, btnName, title }) {
	return (
		<DynamicBtn
			itemId={itemId}
			category={category}
			className={className}
			variant={variant}
			icon={icon}
			btnName={btnName}
			title={title}
		/>
	)
}
