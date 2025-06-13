import NotFoundPage from '@/app/not-found'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default async function page(props) {
	const params = await props.params
	const id = params.id

	const data = await gaming_consolesService.getConsoleById(id)
	console.log('data: ', data)
	if (!data) return NotFoundPage(false, 'Product')

	const title = data['Product Name']
		? data['Product Name']
		: data['Alternate names']
			? data['Alternate names']
			: data['Brand'] && data['Model']
				? data['Brand'] + ' ' + data['Model']
				: 'No Product name'

	return (
		<>
			<h1>{title}</h1>
		</>
	)
}
