import Image from 'next/image'
import Link from 'next/link'
import { FormatPrice } from '@/lib/utils/formatPrice'

export function ProductCardWide({ href, title, imageSrc, brand, price }) {
	return (
		<Link
			href={href}
			title={`${title} - open product's page`}
			aria-label={`${title} - open product's page`}
			className='inline-block w-full'
		>
			<div className='flex w-full text-sm font-semibold border rounded-md group border-border bg-bgSecondary md:text-base lg:text-lg'>
				<div className='relative min-w-1/3 sm:min-w-[150px] bg-white rounded-l-md'>
					<Image
						src={imageSrc}
						alt={`Image of product: ${title}`}
						fill
						sizes='(max-width: 520px) 100vw, 130px'
						className='object-contain transition rounded-l-lg'
						priority
					/>
					<div className='absolute inset-0 pointer-events-none rounded-l-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
				</div>
				<div className='flex flex-col w-full gap-4 p-4 justify-evenly'>
					<div className='flex justify-between sm:text-base'>
						{brand && (
							<p>
								Brand:
								<br /> {brand}
							</p>
						)}
						<p>
							Price:
							<br /> <span className='font-bold font-nanum'>{FormatPrice(price, 'display')}</span>
						</p>
					</div>
					<p className='content-center pr-8 text-accentSecondary bg-bgSecondary'>{title}</p>
				</div>
			</div>
		</Link>
	)
}
