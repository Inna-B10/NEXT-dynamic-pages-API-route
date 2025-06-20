import Image from 'next/image'
import { Heart, ShoppingCart } from 'react-feather'
import { InfoRow } from '@/components/InfoRow'
import { Rating } from '@/components/Rating'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/buttons/Button'
import { ShareButtons } from '@/components/ui/buttons/ShareButtons'
import NotFoundPage from '@/app/not-found'
import { prepareCameraInfo } from '@/lib/utils/prepareCameraInfo'
import { camerasService } from '@/services/client/cameras.service'

export default async function Camera(props) {
	const params = await props.params
	const id = params.id.split('-')

	const { data } = await camerasService.getCameraById(id[0])
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData } = prepareCameraInfo(data)

	return (
		<>
			<div className='flex flex-col gap-8 lg:gap-10 xl:gap-16 w-full max-w-[1440px] mx-auto mt-8 lg:mt-16'>
				<h1 className='text-xl bp520:text-2xl md:text-3xl font-bold text-yellow text-center'>
					{title}
				</h1>
				<div className='flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-4 justify-between w-full'>
					<div className='relative group w-full md:max-w-1/2  bg-white rounded-md aspect-[600/450]'>
						<Image
							src={src}
							alt={`Image of camera model: ${title}`}
							fill
							sizes='(max-width: 768px) 100vw, 600px'
							className='object-contain rounded-lg transition'
							priority
						/>
						<div className='absolute inset-0 pointer-events-none rounded-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
					</div>

					<div className='flex flex-col w-full md:max-w-1/2 gap-8 md:gap-4 justify-between'>
						<div className='flex flex-col justify-between p-4 lg:py-4 lg:px-6 bg-bgSecondary rounded-md'>
							{modelData.map(([key, value]) => (
								<InfoRow
									key={key}
									label={key}
									value={value}
								/>
							))}
						</div>
						<div className='bg-bgSecondary rounded-md p-4 lg:py-8 lg:px-6 w-full flex lg:flex-row gap-4 justify-between items-center'>
							<div className='w-full lg:w-1/2 lg:h-full flex flex-col gap-4 lg:gap-6 items-center pb-2 lg:pb-0 lg:border-r lg:pr-4 border-dashed border-border'>
								<h3 className='text-3xl lg:text-4xl font-bold text-yellow font-nanum'>5 995,-</h3>
								<Button
									title='Add to shopping cart'
									aria-label='Add to shopping cart'
								>
									<ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
									Add to cart
								</Button>
							</div>
							<div className='hidden w-full lg:w-1/2 lg:h-full lg:flex flex-col gap-4 lg:gap-6 justify-between items-center'>
								<ShareButtons
									pathname={`/gaming_consoles/${id}`}
									title={title}
								/>
								<Button
									title='Add to favorites'
									aria-label='Add to favorites'
								>
									<Heart className='w-5 h-5 sm:w-6 sm:h-6' /> Favorites
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col bp520:flex-row justify-between gap-4 bg-bgSecondary rounded-md lg:hidden p-4'>
					<div className='w-full bp520:w-1/2 bp520:border-r border-dashed border-border bp520:pr-4'>
						{ratingData && (
							<>
								<h2 className='text-xl bp520:text-lg md:text-xl font-bold text-yellow mb-2'>
									Rating:
								</h2>
								<div className='flex flex-col gap-4 justify-between items-center w-full'>
									<Rating ratings={ratingData} />
								</div>
							</>
						)}
					</div>
					<div className='w-full bp520:w-1/2 flex flex-col justify-between gap-8 bp520:gap-4 pb-4'>
						<div>
							<h3 className='text-xl bp520:text-lg md:text-xl font-bold text-yellow mb-4'>
								Share:
							</h3>
							<ShareButtons
								pathname={`/gaming_consoles/${id}`}
								title={title}
							/>
						</div>
						<div>
							<h3 className='text-xl bp520:text-lg md:text-xl font-bold text-yellow mb-4'>
								Favorites:
							</h3>
							<Button
								title='Add to favorites'
								aria-label='Add to favorites'
							>
								<Heart className='w-5 h-5 sm:w-6 sm:h-6' /> Save
							</Button>
						</div>
					</div>
				</div>
				<div className='w-full flex gap-4'>
					<div className='lg:w-3/4 flex flex-col justify-between p-4 lg:p-8 bg-bgSecondary rounded-md'>
						<h2 className='text-2xl font-bold text-yellow mb-4'>Product specifications:</h2>
						{filteredData.map(([key, value]) => (
							<InfoRow
								key={key}
								label={key}
								value={value}
							/>
						))}
					</div>

					{ratingData && (
						<div className='hidden lg:w-1/4 h-full lg:flex flex-col bg-bgSecondary rounded-md p-4 lg:p-8'>
							<h2 className='text-2xl font-bold text-yellow mb-6'>Rating:</h2>
							<div className='flex flex-col gap-4 justify-between items-center w-full'>
								<Rating ratings={ratingData} />
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	)
}
