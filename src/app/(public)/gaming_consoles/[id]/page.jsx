import { ProductPage } from '@/components/product-page/ProductPage'
import NotFoundPage from '@/app/not-found'
import { prepareGamingConsoleInfo } from '@/lib/utils/prepareGamingConsoleInfo'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default async function GamingConsole(props) {
	const params = await props.params
	const id = params.id

	const data = await gaming_consolesService.getConsoleById(id)
	if (!data) return NotFoundPage(false, 'Product')

	const { title, src, modelData, ratingData, filteredData } = prepareGamingConsoleInfo(data)

	return (
		<ProductPage
			title={title}
			src={src}
			modelData={modelData}
			ratingData={ratingData}
			filteredData={filteredData}
			id={id}
		/>
	)
}
