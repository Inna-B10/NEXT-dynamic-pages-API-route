import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AuthButton } from '../ui/buttons/AuthButton'

export function Header() {
	return (
		<section className='flex justify-between items-center h-20 lg:h-30 border-b border-border mx-4'>
			<div className='w-1/2 sm:1/3'>
				<input
					type='search'
					placeholder='search'
					className='w-full outline-0 border border-blue text-xs italic p-2 rounded md:ml-4'
				/>
			</div>
			<div className='flex items-center gap-2 md:pr-4'>
				<SignedOut>
					<AuthButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</section>
	)
	// return (
	// 	<section className='flex justify-between items-center w-full h-30 border-b border-border mx-4'>
	// 		<h1 className='text-4xl inline text-blue'>Products Catalog</h1>
	// 		<div>
	// 			<input
	// 				type='search'
	// 				placeholder='search'
	// 				className='w-100 outline-0 border border-blue text-xs italic p-2 rounded'
	// 			/>
	// 		</div>
	// 	</section>
	// )
}
