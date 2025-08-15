import Image from 'next/image'
import Link from 'next/link'
import { FormatPrice } from '@/lib/utils/formatPrice'

export function ProductCard({ href, title, imageSrc, brand, price }) {
	return (
		<Link
			href={href}
			title={`${title} - open product's page`}
			aria-label={`${title} - open product's page`}
			className='inline-block'
		>
			<div className='group flex flex-col h-full justify-between rounded-md border border-border bg-bgSecondary font-semibold bp480:text-sm tracking-wide md:text-base lg:text-lg lg:tracking-normal hover:scale-[1.02] transition-transform duration-300 ease-in-out transform-gpu hover:[transform:scale(1.02)] hover:[will-change:transform]'>
				<div>
					<div className='relative w-full aspect-[268/201] bg-white rounded-t-md'>
						<Image
							src={imageSrc}
							alt={`Image of product: ${title}`}
							fill
							sizes='(max-width: 768px) 100vw, 268px'
							className='object-contain transition rounded-t-lg'
							priority
						/>
						<div className='absolute inset-0 pointer-events-none rounded-t-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
					</div>
					<p className='p-4 text-accentSecondary bg-bgSecondary'>{title}</p>
				</div>
				<div className='flex flex-col p-4 pt-0 bg-bgSecondary rounded-b-md'>
					{brand && <p className='text-dark-gray group-hover:text-foreground'>Brand: {brand}</p>}
					<p className='text-dark-gray group-hover:text-foreground'>
						Price: <span className='font-bold font-nanum'>{FormatPrice(price, 'display')}</span>
					</p>
				</div>
			</div>
		</Link>
	)
}
