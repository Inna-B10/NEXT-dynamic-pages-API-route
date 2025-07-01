import { SignedIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { Heart, ShoppingBag } from 'react-feather'
import NavButton from '../buttons/header/NavButton'
import { UserMenu } from '../buttons/header/UserMenu'

export async function Header() {
	const user = await auth()

	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<input
					type='search'
					placeholder='search'
					className='w-full outline-0 border border-blue text-xs italic p-2 rounded md:ml-4'
				/>
			</div>
			<div className='flex items-center gap-4 md:pr-4'>
				<SignedIn>
					<NavButton
						label='Open List of Favorites'
						href='/favorites'
						// count={favoritesCount}
					>
						<Heart />
					</NavButton>
				</SignedIn>
				<NavButton
					label='Open Shopping Cart'
					href='/shopping-cart'
					// count={cartCount}
				>
					<ShoppingBag />
				</NavButton>
				<UserMenu isAuthenticated={user?.isAuthenticated} />
			</div>
		</section>
	)
}
