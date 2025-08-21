'use client'

import { useUser } from '@clerk/nextjs'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'

/**
 * Universal toggle button component (e.g., for adding/removing items from favorites or cart).
 *
 * Uses a provided hook to check and toggle the state of an item by its ID and category.
 *
 * @param {Object} props
 * @param {string} props.itemId - The ID of the item.
 * @param {string} props.category - The category of the item (contextual).
 * @param {string} [props.className] - Additional CSS classes for the button.
 * @param {string} [props.variant] - Button variant, e.g., 'icon' or 'default'.
 * @param {React.ReactNode} [props.icon] - Custom icon to display inside the button. If not provided, uses defaultIcon.
 * @param {Function} props.useHook - Hook that returns an object with state check and toggle functions.
 * @param {string} props.checkFnName - Name of the function from the hook to check if the item is active.
 * @param {string} props.toggleFnName - Name of the function from the hook to toggle the item's state.
 * @param {React.ComponentType} props.defaultIcon - Default SVG icon component to display if no custom icon is given.
 * @param {string} props.text - Descriptive text used in titles and aria-labels (e.g., "favorites", "cart").
 *
 * @returns {JSX.Element} A button component with add/remove toggle functionality.
 */

export function ToggleItemButton({
	itemId,
	category,
	className,
	variant,
	icon,
	useHook,
	checkFnName,
	toggleFnName,
	defaultIcon: DefaultIcon,
	text
}) {
	const { isSignedIn } = useUser()
	const hookData = useHook()

	const isAdded = hookData[checkFnName](itemId)
	const toggle = hookData[toggleFnName]
	return (
		<Button
			title={
				isSignedIn
					? isAdded
						? `Remove from ${text}`
						: `Add to ${text}`
					: `Sign in to add to ${text}`
			}
			aria-label={
				isSignedIn
					? isAdded
						? `Remove from ${text}`
						: `Add to ${text}`
					: `Sign in to add to ${text}`
			}
			aria-pressed={isAdded}
			className={className}
			variant={variant}
			disabled={!isSignedIn}
			onClick={isSignedIn ? () => toggle(itemId, category) : undefined}
		>
			{icon ? (
				icon
			) : (
				<DefaultIcon
					fillOpacity='0.5'
					className={clsx(
						'min-w-4 w-5 sm:min-w-6  hover:opacity-100 transition-all duration-400 ease-in-out',
						{
							'fill-current': isAdded,
							'opacity-70': !isAdded && variant === 'icon'
						}
					)}
				/>
			)}
			{variant !== 'icon' && (isAdded ? 'Remove' : `Add to ${text}`)}
		</Button>
	)
}
