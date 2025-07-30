import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'react-feather'
import { ProductCardWide } from '@/components/ProductCardWide'
import Spinner from '@/components/ui/Spinner'
import { useCart } from '@/providers/CartProvider'
import { formatProductTitle } from '@/lib/utils/formatProductTitle'

export function ShoppingCartPage() {
	const { isLoaded, user } = useUser()
	const { detailedCart, detailedCartLoading, loadDetailedCart, toggleCartItem } = useCart()

	useEffect(() => {
		if (isLoaded && user?.id) {
			loadDetailedCart()
		}
	}, [isLoaded, user?.id, loadDetailedCart])

	if (detailedCartLoading)
		return (
			<div className='z-10 absolute top-full left-1/2 translate-x-[-50%]'>
				<Spinner
					size={60}
					message='Loading...'
				/>
			</div>
		)

	return (
		<section>
			<h1>Shopping Cart</h1>

			{detailedCart.map(product => {
				const title = formatProductTitle(product)
				return (
					<div
						key={product._id}
						className='relative w-full lg:w-4/5 2xl:w-3/4 mb-8'
					>
						<ProductCardWide
							href={`/${product.categorySlug}/${product._id}`}
							title={title}
							imageSrc={product['Picture URL'] || '/images/default-image.png'}
							brand={product['Brand']}
							price={product['Price']}
						/>
						<button
							title='Remove from cart'
							aria-label='Remove from cart'
							onClick={() => toggleCartItem(product._id, product.categorySlug)}
							className='absolute bottom-2 right-2 opacity-70 hover:cursor-pointer  hover:opacity-100 transition-all duration-300 ease-in-out'
						>
							<Trash2
								size={20}
								fillOpacity={0.5}
								className='hover:fill-red-500 hover:stroke-red-500 lg:size-6'
							/>
						</button>
					</div>
				)
			})}
		</section>
	)
}
