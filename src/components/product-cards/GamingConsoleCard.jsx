import { ProductCard } from './ProductCard'

export function GamingConsoleCard({ item, index }) {
	const title =
		item['Product Name'] ||
		item['Alternate names'] ||
		(item['Brand'] && item['Model'] ? `${item['Brand']} ${item['Model']}` : 'No Product name')

	return (
		<ProductCard
			href={`/gaming_consoles/${item._id}`}
			title={title}
			imageSrc={item['Picture URL']}
			brand={item['Brand']}
			showIndexInUrl={false}
		/>
	)
}
