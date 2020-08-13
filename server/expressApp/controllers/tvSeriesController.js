const tvSeries = require('../models/TVSeries')

class tvSeriesController{
  static async getAll (req, res) {
    const allSeries = await tvSeries.getAll()
    return res.status(200).json(allSeries)
  }

  static async add (req, res) {
    const newOne = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: Number((+req.body.popularity).toFixed(1)),
      tags: req.body.tags.split(','),
    }
    const addOne = await tvSeries.addOne(newOne)
    return res.status(201).json(addOne)
  }

  static async update( req, res) {
    const updateData = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: Number((+req.body.popularity).toFixed(1)),
      tags: req.body.tags.split(','),
    }
    const doUpdate = await tvSeries.update(req.params.id, updateData)
    return res.status(200).json(doUpdate)
  }

  static async delete (req, res) {
    const doDelete = await tvSeries.delete(req.params.id)
    return res.status(200).json(doDelete)
  }
}

module.exports = tvSeriesController