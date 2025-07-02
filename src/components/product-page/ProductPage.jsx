import Image from 'next/image'
import { Footer } from '../layout/Footer'
import { InfoRow } from './InfoRow'
import { PriceShoppingButtonBlock } from './blocks/PriceShoppingButtonBlock'
import RatingBlock from './blocks/RatingBlock'
import { ShareFavoritesBlock } from './blocks/ShareFavoritesBlock'

export function ProductPage({ title, src, id, modelData, ratingData, filteredData }) {
	return (
		<>
			<div className='flex flex-col gap-8 lg:gap-10 xl:gap-16 w-full max-w-[1440px] mx-auto mt-8 lg:mt-16'>
				{/* ---------------------------------- Title ---------------------------------- */}
				<h1 className='text-xl bp520:text-2xl md:text-3xl font-bold text-yellow text-center'>
					{title}
				</h1>

				{/*//* --------------------------------- Main Block1 --------------------------------- */}
				<div className='flex flex-col md:flex-row gap-8 lg:gap-10 justify-between w-full'>
					{/*//# ---------------------------------- Left Side - Image */}
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

					{/*//# ---------------------------------- Right Side --------------------------------- */}

					<div className='flex flex-col w-full md:max-w-1/2 gap-8 md:gap-4 justify-between'>
						{/*//# -------------------------------- ModelData block */}
						<div className='flex flex-col justify-between p-4 lg:py-4 lg:px-6 bg-bgSecondary rounded-md'>
							{modelData.map(([key, value]) => (
								<InfoRow
									key={key}
									label={key}
									value={value}
								/>
							))}
						</div>

						{/*//# ---------------------------------- Price block  */}
						<div className='bg-bgSecondary rounded-md p-4 lg:py-8 lg:px-6 w-full flex lg:flex-row gap-4 justify-between items-center'>
							<PriceShoppingButtonBlock />
							<ShareFavoritesBlock
								variant='bigScreen'
								title={title}
								id={id}
							/>
						</div>
					</div>
				</div>

				{/*//* --------------------------------- Main Block2 (hidden)--------------------------------- */}
				<div className='flex flex-col sm:flex-row justify-between gap-8 sm:gap-4 sm:bg-bgSecondary rounded-md lg:hidden sm:p-4'>
					{ratingData && <RatingBlock ratingData={ratingData} />}
					<ShareFavoritesBlock
						title={title}
						id={id}
					/>
				</div>

				{/*//* ------------------------------- Main Block3 ------------------------------ */}
				<div className='w-full flex gap-4 lg:gap-10'>
					{/*//# ----------------------------- Specifications */}
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
					{/*//# ------------------------------- RatingData */}
					{ratingData && (
						<RatingBlock
							variant='bigScreen'
							ratingData={ratingData}
						/>
					)}
				</div>
			</div>
			<Footer />
		</>
	)
}
