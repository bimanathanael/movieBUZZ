const Movie = require('../models')

class moviesController{
  static async getAll (req, res) {
    const allMovie = await Movie.getAll()
    return res.status(200).json(allMovie)
  }

  static async add (req, res) {
    const newOne = { ... req.body}
    const addOne = await Movie.addOne(newOne)
    return res.status(201).json(addOne.ops[0])
  }

  static async update( req, res) {
    const updateData = { ... req.body}
    const doUpdate = await Movie.update(req.params.id, updateData)
    return res.status(200).json(doUpdate.value)
  }

  static async delete (req, res) {
    const doDelete = await Movie.delete(req.params.id)
    return res.status(200).json(doDelete)
  }
}

module.exports = moviesController