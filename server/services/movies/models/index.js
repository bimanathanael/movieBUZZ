const db = require('../config/mongo')
const { ObjectId } = require('mongodb')
const MovieColls = db.collection("movies") 

class MovieModel {
  static getAll() {
    return MovieColls.find().toArray()
  }

  static addOne(newOne) {
    return MovieColls.insertOne(newOne)
  }

  static async update(id, newData) {
    return MovieColls.findOneAndUpdate({ "_id": ObjectId(id)}, { $set: newData}, {returnOriginal: false})
  }

  static async delete(id) {
    return MovieColls.findOneAndDelete({ "_id": ObjectId(id) })
  }
}

module.exports = MovieModel