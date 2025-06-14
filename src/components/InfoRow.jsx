export function InfoRow({ label, value }) {
	return (
		<div className='flex justify-between py-2 border-b border-dashed border-border last:border-none'>
			<span className='font-semibold w-1/3 mr-4'>{label}:</span>
			<span className='text-right'>{value}</span>
		</div>
	)
}
