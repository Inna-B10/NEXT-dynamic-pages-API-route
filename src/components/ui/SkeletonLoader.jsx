import { twMerge } from 'tailwind-merge'

export function SkeletonLoader({ className = '' }) {
	return <div className={twMerge('bg-gray-400 rounded animate-pulse h-9 w-full', className)} />
}
