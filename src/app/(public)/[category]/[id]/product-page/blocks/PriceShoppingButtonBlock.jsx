import { DynamicButton } from '@/components/buttons/DynamicButton'
import { FormatPrice } from '@/lib/utils/formatPrice'

export function PriceShoppingButtonBlock({ price, itemId, category }) {
	return (
		<div className='flex flex-col items-center w-full gap-4 pb-2 border-dashed lg:w-1/2 lg:h-full lg:gap-6 lg:pb-0 lg:border-r lg:pr-4 border-border'>
			<h2 className='text-3xl font-bold lg:text-4xl text-accent font-nanum'>
				{FormatPrice(price, 'display')}
			</h2>

			<DynamicButton
				itemId={itemId}
				category={category}
				btnName='ToggleCartButton'
				className='w-full sm:w-1/2 md:w-full'
			/>
		</div>
	)
}
