import { Rating } from '../Rating'

export default function RatingBlock({ variant, ratingData }) {
	if (variant === 'bigScreen') {
		/* -------------------------------- BigScreen ------------------------------- */
		return (
			<div className='hidden lg:flex flex-col w-1/4 h-full bg-bgSecondary rounded-md p-8'>
				<h3 className='text-2xl font-bold text-khaki mb-6'>Rating:</h3>
				<div className='flex flex-col gap-4 justify-between items-center w-full'>
					<Rating ratings={ratingData} />
				</div>
			</div>
		)
	} else {
		/* --------------------------- Small/Medium Screen -------------------------- */
		return (
			<div className='w-full bg-bgSecondary rounded-md p-4 sm:w-1/2 sm:p-0 sm:pr-4 sm:border-r border-dashed border-border'>
				<h3 className='text-xl sm:text-lg md:text-xl font-bold text-khaki mb-2'>Rating:</h3>
				<div className='flex flex-col gap-4 justify-between items-center w-full'>
					<Rating ratings={ratingData} />
				</div>
			</div>
		)
	}
}
