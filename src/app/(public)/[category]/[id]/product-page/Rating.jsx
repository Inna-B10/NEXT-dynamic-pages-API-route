import clsx from 'clsx'
import { Star } from 'react-feather'

export function Rating({ ratings }) {
	const total = ratings.reduce((sum, r) => sum + r.count, 0)

	return (
		<div className='w-full'>
			{ratings.map(({ stars, count }) => {
				const percentage = (count / total) * 100 || 0

				return (
					<div
						key={stars}
						className='flex items-center mb-2'
					>
						<div className='flex mr-2'>
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={clsx(
										'w-4 h-4 md:w-5 md:h-5',
										i < stars ? 'text-emerald-500' : 'text-gray-300'
									)}
									fill={i < stars ? 'currentColor' : 'none'}
								/>
							))}
						</div>
						<div className='w-full bg-gray-400 rounded h-1 mr-2'>
							<div
								className='bg-emerald-500 h-1 rounded'
								style={{ width: `${percentage}%` }}
							></div>
						</div>
						<div className='w-10 text-right'>{count}</div>
					</div>
				)
			})}
		</div>
	)
}
