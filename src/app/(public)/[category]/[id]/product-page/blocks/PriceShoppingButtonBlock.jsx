import { ToggleCartButton } from '@/components/buttons/ToggleCartButton'

export function PriceShoppingButtonBlock({ price = '5995,-', itemId, category }) {
	return (
		<div className='w-full flex flex-col gap-4 items-center pb-2 lg:w-1/2 lg:h-full lg:gap-6 lg:pb-0 lg:border-r lg:pr-4 border-dashed border-border'>
			<h3 className='text-3xl lg:text-4xl font-bold text-accent font-nanum'>{price}</h3>

			<ToggleCartButton
				itemId={itemId}
				category={category}
				className='w-full sm:w-1/2 md:w-full'
			/>
		</div>
	)
}
