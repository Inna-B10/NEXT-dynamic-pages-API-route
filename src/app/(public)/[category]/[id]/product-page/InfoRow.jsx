export function InfoRow({ label, value }) {
	return (
		<div className='flex justify-between py-2 border-b border-dashed border-border last:border-none'>
			<span className='font-semibold w-1/3 mr-4 whitespace-break-spaces'>{label}:</span>
			<span className='text-right w-2/3 whitespace-break-spaces'>{value}</span>
		</div>
	)
}
