export function formatProductTitle(product) {
	if (product['Product Name']) return product['Product Name']
	if (product['Model']) return product['Model']
	if (product['Brand'] && product['Model Name'])
		return `${product['Brand']} ${product['Model Name']}`
	return 'Unknown product name'
}
