import { newDownsize } from './remoteImageSize'

const excludedFields = ['Picture URL', 'Price in India', 'url', 'Total Ratings', 'Product Name']
const ratingFields = ['1 Stars', '2 Stars', '3 Stars', '4 Stars', '5 Stars']
const modelFields = [
	'Brand',
	'Series',
	'Model',
	'Model Name',
	'Model Number',
	'Alternate names',
	'Launched'
]

export function prepareCameraInfo(data, newSize = 640) {
	const src = newDownsize(data['Picture URL'], newSize)
	const title = data['Product Name']
		? data['Product Name']
		: data['Alternate names'] || data['Model Name']
			? data['Alternate names'] || data['Model Name']
			: data['Brand'] && data['Model']
				? data['Brand'] + ' ' + data['Model']
				: 'No Product name'

	const modelData = Object.entries(data).filter(([key, _]) => modelFields.includes(key))
	const ratings = Object.entries(data).filter(([key, _]) => ratingFields.includes(key))
	const normalizedRatings = ratings.map(([starsStr, countStr]) => {
		const stars = parseInt(starsStr)
		const count = parseInt(countStr)
		return { stars, count }
	})

	const filteredData = Object.entries(data).filter(
		([key, _]) =>
			!excludedFields.includes(key) && !modelFields.includes(key) && !ratingFields.includes(key)
	)

	return { title, src, modelData, ratingData: normalizedRatings, filteredData }
}
