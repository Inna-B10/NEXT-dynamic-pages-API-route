import { MongoClient } from 'mongodb'
import { DB_NAME, DB_URI } from '@/constants/constants'

if (!DB_URI) throw new Error('MONGODB_URI environment variable not set')

const client = new MongoClient(DB_URI)

export async function connectToDatabase() {
	await client.connect()
	return client.db(DB_NAME)
}
