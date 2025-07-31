import { toast } from 'react-hot-toast'

export function ConfirmToast({ message, onConfirm, onCancel, toastId }) {
	return (
		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 w-screen h-screen'>
			<div className='bg-[#3f3f46] border border-white/20 p-4 rounded shadow-lg flex flex-col gap-3 w-64 z-10'>
				<p className='text-sm tracking-wide text-center'>{message}</p>
				<div className='flex justify-center gap-3 mt-2'>
					<button
						onClick={() => {
							toast.dismiss(toastId)
							onConfirm()
						}}
						className='px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded'
					>
						OK
					</button>
					<button
						onClick={() => {
							toast.dismiss(toastId)
							onCancel?.()
						}}
						className='px-3 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded'
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
