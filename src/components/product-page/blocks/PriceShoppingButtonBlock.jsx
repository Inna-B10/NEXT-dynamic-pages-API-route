import { ShoppingCart } from 'react-feather'
import { Button } from '@/components/ui/Button'

export function PriceShoppingButtonBlock() {
	return (
		<div className='w-full flex flex-col gap-4 items-center pb-2 lg:w-1/2 lg:h-full lg:gap-6 lg:pb-0 lg:border-r lg:pr-4 border-dashed border-border'>
			<h3 className='text-3xl lg:text-4xl font-bold text-yellow font-nanum'>5 995,-</h3>
			<Button
				title='Add to shopping cart'
				aria-label='Add to shopping cart'
			>
				<ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
				Add to cart
			</Button>
		</div>
	)
}
