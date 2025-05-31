import { readJsonFile } from '@/utils/fileUtils'

const FILE_PATH = './src/data/cameras.json'

export async function getAllData() {
	const data = await readJsonFile(FILE_PATH)
	return data
}
