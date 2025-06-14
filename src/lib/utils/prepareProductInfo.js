import { newDownsize } from './remoteImageSize'

const excludedFields = ['Picture URL', 'Price in India', 'url', '_id', 'Total Ratings']
const ratingFields = ['1 Stars', '2 Stars', '3 Stars', '4 Stars', '5 Stars']
const modelFields = [
	'Product Name',
	'Brand',
	'Model',
	'Alternate names',
	'Console Family',
	'Console Type',
	'Release Date',
	'Release Year',
	'Launched'
]

export function prepareProductInfo(data, newSize = 640) {
	const src = newDownsize(data['Picture URL'], newSize)
	const title = data['Product Name']
		? data['Product Name']
		: data['Alternate names']
			? data['Alternate names']
			: data['Brand'] && data['Model']
				? data['Brand'] + ' ' + data['Model']
				: 'No Product name'

	const modelData = Object.entries(data).filter(([key, _]) => modelFields.includes(key))
	const ratingData = Object.entries(data).filter(([key, _]) => ratingFields.includes(key))

	const filteredData = Object.entries(data).filter(
		([key, _]) =>
			!excludedFields.includes(key) && !modelFields.includes(key) && !ratingFields.includes(key)
	)

	return { title, src, modelData, ratingData, filteredData }
}
