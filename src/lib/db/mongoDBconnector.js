import { MongoClient } from 'mongodb'
import { DB_NAME, DB_URI } from '../../config/config.js'

if (!DB_URI) throw new Error('MONGODB_URI environment variable not set')

let client
let db

export async function connectToDatabase() {
	if (global._mongoClient && global._mongoDb) {
		return global._mongoDb
	}
	client = new MongoClient(DB_URI)
	await client.connect()
	db = client.db(DB_NAME)

	global._mongoClient = client
	global._mongoDb = db

	return db
}
