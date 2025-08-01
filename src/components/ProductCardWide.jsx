import Image from 'next/image'
import Link from 'next/link'

export function ProductCardWide({ href, title, imageSrc, brand, price = '5995,-' }) {
	return (
		<Link
			href={href}
			title={`${title} - open product's page`}
			aria-label={`${title} - open product's page`}
			className='inline-block w-full'
		>
			<div className='flex group w-full rounded-md border border-border bg-bgSecondary font-semibold text-sm md:text-base lg:text-lg lg:tracking-normal'>
				<div className='relative min-w-1/3 sm:min-w-[150px]  bg-white rounded-l-md'>
					<Image
						src={imageSrc}
						alt={`Image of product: ${title}`}
						fill
						sizes='(max-width: 520px) 100vw, 130px'
						className='object-contain rounded-l-lg transition'
						priority
					/>
					<div className='absolute inset-0 pointer-events-none rounded-l-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
				</div>
				<div className='flex flex-col justify-evenly w-full p-4 gap-4'>
					<div className='flex justify-between sm:text-base'>
						{brand && (
							<p>
								Brand:
								<br /> {brand}
							</p>
						)}
						<p>
							Price:
							<br /> <span className='font-nanum font-bold'>{price}</span>
						</p>
					</div>
					<p className='text-accentSecondary content-center pr-8 bg-bgSecondary'>{title}</p>
				</div>
			</div>
		</Link>
	)
}
