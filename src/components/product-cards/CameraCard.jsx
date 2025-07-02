import { ProductCard } from './ProductCard'

export function CameraCard({ item, index }) {
	return (
		<ProductCard
			href='/cameras'
			title={item.productName ? item.productName : item.model}
			slug={item.modelName}
			imageSrc={item.image}
			brand={item.brand}
			index={index}
			showIndexInUrl={true}
		/>
	)
}
