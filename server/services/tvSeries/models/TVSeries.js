const db = require('../config/mongo')
const { ObjectId } = require('mongodb')
const TVSeriesColls = db.collection("tvSeries") 

class TVSeries {
  static getAll() {
    return TVSeriesColls.find().toArray()
  }

  static getOne(id) {
    return TVSeriesColls.findOne({ "_id": ObjectId(id)})
  }

  static addOne(newOne) {
    return TVSeriesColls.insertOne(newOne)
  }

  static async update(id, newData) {
    return TVSeriesColls.findOneAndUpdate({ "_id": ObjectId(id)}, { $set: newData}, {returnOriginal: false})
  }

  static async delete(id) {
    return TVSeriesColls.findOneAndDelete({ "_id": ObjectId(id) })
  }
}

module.exports = TVSeries