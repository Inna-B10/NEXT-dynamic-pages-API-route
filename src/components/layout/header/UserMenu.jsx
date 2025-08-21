import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import { match } from 'path-to-regexp'
import { Grid, Heart, ShoppingBag, User } from 'react-feather'
import { UserMenuButton } from '@/components/buttons/header/UserMenuButton'
import { useCart } from '@/providers/CartProvider'
import { useFavorites } from '@/providers/FavoritesProvider'

//[TODO] change icon and move to ui component
const DotIcon = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
			fill='currentColor'
		>
			<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
		</svg>
	)
}

export function UserMenu() {
	const pathname = usePathname()
	const isProtected = pathname.startsWith('/user')

	const { user } = useUser()
	const role = user?.publicMetadata?.role

	const { favorites, loadingFav } = useFavorites()
	const { cartItems, loadingCart } = useCart()

	const isActiveIcon = href => !!match(href, { end: false })(pathname)
	return (
		<div className='flex items-center gap-2 bp520:gap-4 max-w-[250px] ml-auto'>
			{role === 'admin' && (
				<UserMenuButton
					href='/admin'
					title='Open Admin Panel'
					ariaLabel='Open Admin Panel'
					icon={<Grid className='w-2/3 h-2/3' />}
					isActiveIcon={isActiveIcon('/admin')}
				/>
			)}
			{loadingCart ? (
				<UserMenuButton
					icon={<ShoppingBag className='w-2/3 h-2/3' />}
					asDiv
					title='Shopping Cart'
				/>
			) : (
				<UserMenuButton
					href='/user/shopping-cart'
					title='Open Shopping Cart'
					ariaLabel='Open Shopping Cart'
					icon={<ShoppingBag className='w-2/3 h-2/3' />}
					badgeCount={cartItems?.length}
					isActiveIcon={isActiveIcon('/user/shopping-cart')}
				/>
			)}
			{loadingFav ? (
				<UserMenuButton
					icon={<Heart className='w-2/3 h-2/3' />}
					asDiv
					title='Favorites'
				/>
			) : (
				<UserMenuButton
					href='/user/favorites'
					title='Open List of Favorites'
					ariaLabel='Open List of Favorites'
					icon={<Heart className='w-2/3 h-2/3' />}
					badgeCount={favorites?.length}
					isActiveIcon={isActiveIcon('/user/favorites')}
				/>
			)}
			{user ? (
				<UserMenuButton
					title='Open User Menu'
					ariaLabel='Open User Menu'
					asDiv
					icon={
						<UserButton
							afterSignOutUrl={isProtected ? '/' : pathname}
							appearance={{
								elements: {
									avatarImage: 'p-[2px] sm:p-0 rounded-full bg-bg'
								}
							}}
						>
							<UserButton.MenuItems>
								{/* --------------------- Custom Link In Clerk User Menu --------------------- */}
								<UserButton.Link
									appearance={{
										elements: {
											'cl-button__custom-menutItem-0': 'text-turquoise hover:text-turquoise'
										}
									}}
									label='My orders'
									labelIcon={<DotIcon />}
									href='/user/orders'
								/>
								<UserButton.Action label='manageAccount' />
							</UserButton.MenuItems>
						</UserButton>
					}
				/>
			) : (
				<UserMenuButton
					href={`/auth?mode=sign-in&redirect_url=${encodeURIComponent(pathname)}`}
					title='Go to Authorization page'
					ariaLabel='Go to Authorization page'
					icon={<User className='w-2/3 h-2/3' />}
				/>
			)}
		</div>
	)
}
