const MongoClient = require('mongodb').MongoClient

const url = process.env.URL || 'mongodb://localhost:27017'
const dbName = process.env.dbName || 'entertainMe'

const client = new MongoClient(url, {useUnifiedTopology: true})
client.connect()

const db = client.db(dbName)

module.exports = db