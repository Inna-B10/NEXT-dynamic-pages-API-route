import Image from 'next/image'
import { InfoRow } from '@/components/InfoRow'
import NotFoundPage from '@/app/not-found'
import { prepareProductInfo } from '@/lib/utils/prepareProductInfo'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default async function page(props) {
	const params = await props.params
	const id = params.id

	const data = await gaming_consolesService.getConsoleById(id)
	// console.log('data: ', data)
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData } = prepareProductInfo(data)
	return (
		<div className='flex flex-col items-center w-full h-full'>
			<h1 className='my-16 text-4xl font-bold text-yellow-300 '>{title}</h1>
			<div className='flex gap-16'>
				<div className='flex flex-col gap-10'>
					<div className='relative group rounded-md'>
						<Image
							src={src}
							alt={`Image of camera model: ${title}`}
							width={640}
							height={640}
							className='w-full h-auto object-contain rounded-md transition'
							priority
						/>

						<div className='absolute inset-0 pointer-events-none rounded-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
					</div>
					{ratingData && (
						<ul>
							{ratingData.map(([key, value]) => (
								<li key={key}>
									{key}: {value}
								</li>
							))}
						</ul>
					)}
				</div>
				<div className='flex flex-col w-full gap-4 max-w-1/2'>
					{/* <h2 className='text-2xl font-bold text-yellow-300 pl-4'>Model:</h2> */}
					<div className='w-full flex flex-col justify-between p-4 bg-bgSecondary rounded-md'>
						{modelData.map(([key, value]) => (
							<InfoRow
								key={key}
								label={key}
								value={value}
							/>
						))}
					</div>
					<h2 className='text-2xl font-bold text-yellow-300 pl-4 mt-6'>Info:</h2>
					<div className='w-full flex flex-col justify-between p-4 bg-bgSecondary rounded-md'>
						{filteredData.map(([key, value]) => (
							<InfoRow
								key={key}
								label={key}
								value={value}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
