const Movie = require('../models/Movie')

class moviesController{
  static async getAll (req, res) {
    const allMovie = await Movie.getAll()
    return res.status(200).json(allMovie)
  }

  static async add (req, res) {
    const newOne = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: Number((+req.body.popularity).toFixed(1)),
      tags: req.body.tags.split(','),
    }
    const addOne = await Movie.addOne(newOne)
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
    const doUpdate = await Movie.update(req.params.id, updateData)
    return res.status(200).json(doUpdate)
  }

  static async delete (req, res) {
    const doDelete = await Movie.delete(req.params.id)
    return res.status(200).json(doDelete)
  }
}

module.exports = moviesController