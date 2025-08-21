import { Trash2 } from 'react-feather'
import { ToggleCartButton } from './ToggleCartButton'
import { ToggleFavoriteButton } from './ToggleFavoriteButton'

export function ProductActionButtons({ itemId, category, trashFor }) {
	const trashIcon = (
		<Trash2
			fillOpacity={0.5}
			className='min-w-4 w-5 sm:min-w-6 hover:fill-red-500 stroke-red-500 opacity-70 hover:opacity-100 transition-all duration-400 ease-in-out'
		/>
	)

	const favoriteIcon = trashFor !== 'cart' ? trashIcon : undefined
	const cartIcon = trashFor === 'cart' ? trashIcon : undefined

	return (
		<div className='absolute bottom-4 right-2 flex gap-2 text-accent'>
			{trashFor === 'cart' ? (
				<>
					<ToggleFavoriteButton
						itemId={itemId}
						category={category}
						variant='icon'
						icon={favoriteIcon}
					/>
					<ToggleCartButton
						itemId={itemId}
						category={category}
						variant='icon'
						icon={cartIcon}
					/>
				</>
			) : (
				<>
					<ToggleCartButton
						itemId={itemId}
						category={category}
						variant='icon'
						icon={cartIcon}
					/>
					<ToggleFavoriteButton
						itemId={itemId}
						category={category}
						variant='icon'
						icon={favoriteIcon}
					/>
				</>
			)}
		</div>
	)
}
