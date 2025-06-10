import path from 'path'
import { readJsonFile } from '@/lib/readJsonFile'

// const FILE_PATH = './src/data/cameras.json'
const FILE_PATH = path.join(process.cwd(), 'src', 'data', 'cameras.json')

export async function getFullData() {
	const data = await readJsonFile(FILE_PATH)
	return data
}

// leave only the necessary fields
export async function getPreviewData() {
	const data = await readJsonFile(FILE_PATH)

	const filtered = data.map(item => ({
		productName: item['Product Name'],
		model: item['Model'],
		modelName: item['Model Name'],
		brand: item['Brand'],
		series: item['Series'],
		color: item['Color'],
		dimensions: item['Dimensions(WxHxD)'],
		display: item['Display Size'],
		image: item['Picture URL'],
		url: item['url']
	}))
	return filtered
}
