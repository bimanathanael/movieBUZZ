const tvSeries = require('../models/TVSeries')

class tvSeriesController{
  static async getAll (req, res) {
    const allSeries = await tvSeries.getAll()
    return res.status(200).json(allSeries)
  }

  static async add (req, res) {
    const newOne = { ... req.body}
    const addOne = await tvSeries.addOne(newOne)
    return res.status(201).json(addOne.ops[0])
  }

  static async update( req, res) {
    const updateData = { ... req.body}
    const doUpdate = await tvSeries.update(req.params.id, updateData)
    return res.status(200).json(doUpdate)
  }

  static async delete (req, res) {
    const doDelete = await tvSeries.delete(req.params.id)
    return res.status(200).json(doDelete)
  }
}

module.exports = tvSeriesController