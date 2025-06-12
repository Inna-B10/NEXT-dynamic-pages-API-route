import { promises as fs } from 'fs'

export async function readJsonFile(path) {
	const data = await fs.readFile(path, 'utf-8')
	return JSON.parse(data)
}
