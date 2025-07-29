import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { Grid, Heart, ShoppingBag } from 'react-feather'
import { useCart } from '@/providers/CartProvider'
import { useFavorites } from '@/providers/FavoritesProvider'
import { AuthButton } from '../buttons/header/AuthButton'

export function Header() {
	const { user } = useUser()
	const role = user?.publicMetadata?.role

	const { favorites, loadingFav } = useFavorites()
	const { cartItems, loadingCart } = useCart()

	if (loadingFav || loadingCart) return null

	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<input
					type='search'
					placeholder='search'
					className='w-full min-w-40 outline-0 border border-accentSecondary text-xs italic p-1.5 sm:p-2 rounded md:ml-4'
				/>
			</div>
			<div className='flex items-center gap-4 md:pr-4 max-w-[250px]'>
				{role === 'admin' && (
					<Link
						href='/admin'
						title='Open Admin Panel'
						aria-label='Open Admin Panel'
						className='content-center rounded-full border border-accentSecondary hover:border-accent text-accentSecondary hover:text-accent transition-all'
						style={{
							width: 'clamp(28px, 6vw, 40px)',
							height: 'clamp(28px, 6vw, 40px)',
							borderWidth: 'clamp(1px, 0.3vw, 2px)'
						}}
					>
						<Grid className='m-auto w-2/3 h-2/3' />
					</Link>
				)}
				<Link
					href='/user/favorites'
					title='Open List of Favorites'
					aria-label='Open List of Favorites'
					className='relative content-center rounded-full border border-accentSecondary hover:border-accent text-accentSecondary hover:text-accent transition-all'
					style={{
						width: 'clamp(28px, 6vw, 40px)',
						height: 'clamp(28px, 6vw, 40px)',
						borderWidth: 'clamp(1px, 0.3vw, 2px)'
					}}
				>
					<Heart className='m-auto w-2/3 h-2/3' />
					{favorites?.length > 0 && (
						<span className='absolute rounded-full -bottom-1.5 -right-1.5 w-5 h-5 bg-accent content-center text-center text-black text-xs font-semibold '>
							{favorites?.length}
						</span>
					)}
				</Link>
				<Link
					href='/user/shopping-cart'
					title='Open Shopping Cart'
					aria-label='Open Shopping Cart'
					className='relative rounded-full content-center border border-accentSecondary hover:border-accent text-accentSecondary hover:text-accent transition-all'
					style={{
						width: 'clamp(28px, 6vw, 40px)',
						height: 'clamp(28px, 6vw, 40px)',
						borderWidth: 'clamp(1px, 0.3vw, 2px)'
					}}
				>
					<ShoppingBag className='m-auto w-2/3 h-2/3' />
					{cartItems?.length > 0 && (
						<span className='absolute rounded-full -bottom-1.5 -right-1.5 w-5 h-5 bg-accent content-center text-center text-black text-xs font-semibold '>
							{cartItems?.length}
						</span>
					)}
				</Link>
				<SignedIn>
					<div
						className='flex justify-center items-center rounded-full border border-accentSecondary hover:border-accent text-accentSecondary hover:text-accent transition-all'
						style={{
							width: 'clamp(28px, 6vw, 40px)',
							height: 'clamp(28px, 6vw, 40px)',
							borderWidth: 'clamp(1px, 0.3vw, 2px)'
						}}
					>
						<UserButton
							title='Open User Menu'
							aria-label='Open User Menu'
							appearance={{
								elements: {
									avatarImage: 'p-[2px] sm:p-0 rounded-full bg-bg'
								}
							}}
						/>
					</div>
				</SignedIn>
				<SignedOut>
					<AuthButton />
				</SignedOut>
			</div>
		</section>
	)
}
