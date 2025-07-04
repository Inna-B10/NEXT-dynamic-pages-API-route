import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Grid, Heart, ShoppingBag } from 'react-feather'
import { AuthButton } from '../buttons/header/AuthButton'
import NavButton from '../buttons/header/NavButton'
import { Button } from '../ui/Button'

export async function Header() {
	const user = await currentUser()
	const role = user?.publicMetadata?.role
	console.log('role: ', role)
	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<input
					type='search'
					placeholder='search'
					className='w-full outline-0 border border-blue text-xs italic p-2 rounded md:ml-4'
				/>
			</div>
			<div className='flex items-center gap-4 md:pr-4 max-w-[250px]'>
				{role === 'admin' && (
					<div className='flex items-center justify-center rounded-full border-2 border-blue w-10 h-10 text-blue hover:border-yellow hover:bg-blue-500 hover:text-yellow'>
						<NavButton
							label='Open Admin Panel'
							href='/admin'
						>
							<Grid />
						</NavButton>
					</div>
				)}
				<SignedIn>
					<div className='flex items-center justify-center rounded-full border-2 border-blue w-10 h-10 text-blue hover:border-yellow hover:bg-blue-500 hover:text-yellow'>
						<NavButton
							label='Open List of Favorites'
							href='/user/favorites'
							// count={favoritesCount}
						>
							<Heart />
						</NavButton>
					</div>
				</SignedIn>
				<div className='flex items-center justify-center rounded-full border-2 border-blue w-10 h-10 text-blue hover:border-yellow hover:bg-blue-500 hover:text-yellow'>
					<NavButton
						label='Open Shopping Cart'
						href='/user/shopping-cart'
						// count={cartCount}
					>
						<ShoppingBag />
					</NavButton>
				</div>
				<div className='flex items-center justify-center rounded-full border-2 border-blue w-10 h-10 text-blue hover:border-yellow hover:bg-blue-500 hover:text-yellow'>
					<SignedIn>
						<Button
							aria-label='Open Profile'
							title='Open Profile'
							variant='transparent-rounded'
						>
							<UserButton />
						</Button>
					</SignedIn>
					<SignedOut>
						<AuthButton />
					</SignedOut>
				</div>
			</div>
		</section>
	)
}
