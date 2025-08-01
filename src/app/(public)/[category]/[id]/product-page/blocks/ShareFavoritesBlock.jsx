import { ShareButtons } from '@/components/buttons/ShareButtons'
import { ToggleFavoriteButton } from '@/components/buttons/ToggleFavoriteButton'

export function ShareFavoritesBlock({ title, id, variant, category }) {
	if (variant === 'bigScreen') {
		/* --------------------------- BigScreen (>=1024px) -------------------------- */
		return (
			<div className='hidden lg:flex w-1/2 h-full flex-col gap-6 justify-between items-center'>
				<ShareButtons title={title} />

				<ToggleFavoriteButton
					itemId={id}
					category={category}
					className={'w-full'}
				/>
			</div>
		)
	} else {
		/* --------------------------- Small/Medium Screen -------------------------- */
		return (
			<div className='w-full bg-bgSecondary rounded-md p-4 pb-6 flex flex-col justify-between gap-6 sm:w-1/2 sm:p-0 sm:pb-4 sm:gap-4'>
				<div>
					<h3 className='text-xl sm:text-lg md:text-xl font-bold text-accent mb-4'>Share:</h3>
					<ShareButtons title={title} />
				</div>
				<div>
					<h3 className='text-xl sm:text-lg md:text-xl font-bold text-accent mb-4'>Favorites:</h3>

					<ToggleFavoriteButton
						itemId={id}
						category={category}
						className={'w-full'}
					/>
				</div>
			</div>
		)
	}
}
