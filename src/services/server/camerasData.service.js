import path from 'path'
import { readJsonFile } from '@/lib/utils/readJsonFile'

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
		image: item['Picture URL']
	}))
	return filtered
}

export async function getCameraDataById(index) {
	const data = await readJsonFile(FILE_PATH)
	return data?.[index]
}
