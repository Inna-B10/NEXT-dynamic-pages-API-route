import Image from 'next/image'
import { Heart, ShoppingCart } from 'react-feather'
import { InfoRow } from '@/components/InfoRow'
import { Rating } from '@/components/Rating'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/buttons/Button'
import { ShareButtons } from '@/components/ui/buttons/ShareButtons'
import NotFoundPage from '@/app/not-found'
import { prepareProductInfo } from '@/lib/utils/prepareProductInfo'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default async function page(props) {
	const params = await props.params
	const id = params.id

	const data = await gaming_consolesService.getConsoleById(id)
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData } = prepareProductInfo(data)

	return (
		<>
			<div className='flex flex-col gap-16 w-full max-w-[1280px] mx-auto mt-16'>
				<h1 className='text-3xl font-bold text-yellow-300 text-center'>{title}</h1>
				<div className='flex gap-10 w-full'>
					<div className='relative group rounded-md w-[600px] h-[450px] overflow-hidden bg-bgSecondary'>
						<Image
							src={src}
							alt={`Image of camera model: ${title}`}
							fill
							//TODO change sizes for adaptive layout
							sizes='(max-width: 768px) 100vw, 600px'
							className='w-full h-auto object-contain object-center rounded-md transition'
							priority
						/>
						<div className='absolute inset-0 pointer-events-none rounded-md shadow-[inset_0_0_60px_#2C343B]'></div>
					</div>

					<div className='flex flex-col w-full gap-4 justify-between min-w-[380px] max-w-[600px]'>
						<div className='flex flex-col justify-between px-4 py-2 bg-bgSecondary rounded-md'>
							{modelData.map(([key, value]) => (
								<InfoRow
									key={key}
									label={key}
									value={value}
								/>
							))}
						</div>
						<div className='bg-bgSecondary rounded-md p-4 w-full flex gap-4 justify-between items-center'>
							<div className='w-1/2 h-full flex flex-col gap-6 items-center py-4 border-r border-dashed border-border '>
								<h3 className='text-4xl font-bold text-yellow-300 ml-4 font-[family-name:var(--font-nanum)]'>
									5 995,-
								</h3>
								<Button
									title='Add to shopping cart'
									aria-label='Add to shopping cart'
								>
									<ShoppingCart size={24} />
									Add to cart
								</Button>
							</div>
							<div className='w-1/2 h-full py-4 flex flex-col gap-6 justify-between items-center'>
								<div className='flex justify-between gap-6'>
									<ShareButtons
										pathname={`/gaming_consoles/${id}`}
										title={title}
									/>
								</div>
								<Button
									title='Add to favorites'
									aria-label='Add to favorites'
								>
									<Heart size={24} /> Favorites
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full flex gap-10'>
					<div className='w-2/3'>
						<h2 className='text-2xl font-bold text-yellow-300 mb-4 pl-4'>
							Product specifications:
						</h2>
						<div className='flex flex-col justify-between p-4 bg-bgSecondary rounded-md'>
							{filteredData.map(([key, value]) => (
								<InfoRow
									key={key}
									label={key}
									value={value}
								/>
							))}
						</div>
					</div>
					<div className='w-1/3 flex flex-col justify-between gap-6'>
						{ratingData && (
							<div>
								<h2 className='text-2xl font-bold text-yellow-300 mb-4 pl-4'>Rating:</h2>
								<div className='bg-bgSecondary rounded-md px-4 py-6 flex flex-col gap-4 justify-between items-center w-full'>
									<Rating ratings={ratingData} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
