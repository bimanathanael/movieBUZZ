const db = require('../config/mongo')
const { ObjectId } = require('mongodb')
const MovieColls = db.collection("movies") 

class Movie {
  static getAll() {
    return MovieColls.find().toArray()
  }

  static getOne(id) {
    return MovieColls.findOne({ "_id": ObjectId(id)})
  }

  static addOne(newOne) {
    return MovieColls.insertOne(newOne)
  }

  static async update(id, newData) {
    return MovieColls.update({ "_id": ObjectId(id)}, { $set: newData})
  }

  static async delete(id) {
    return MovieColls.deleteOne({ "_id": ObjectId(id) })
  }
}

module.exports = Movie