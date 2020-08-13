const axios = require('axios');
const Redis = require('ioredis')
const redis = new Redis()

class tvSeriesController{
  static async getAll (req, res) {
    const series = await redis.get('tvSeries')
    if(series){
      return res.status(200).json(JSON.parse(series))
    } else {
      axios.get('http://localhost:3002/tvSeries')
        .then( async (tvSeries) => {
          await redis.set('tvSeries', JSON.stringify(tvSeries.data))
          return res.status(200).json(tvSeries.data)
        })
        .catch( (error) => {
          console.log(error);
        })
    }
  }

  static async getOne (req, res) {
    const series = await redis.get('tvSeries')
    if(series){
      const result = JSON.parse(series).filter( item => item._id == req.params.id)
      return res.status(200).json(result[0])
    } else {
      axios.get(`http://localhost:3002/tvSeries/${req.params.id}`)
        .then( (tvSeries) => {
          res.status(200).json(tvSeries.data)
        })
        .catch( (error) => {
          console.log(error);
        })
    }
  }

  static add (req, res) {
    axios.post('http://localhost:3002/tvSeries', {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    })
      .then( async (tvSeries) => {
        // bisa gini
        // await redis.del('tvSeries')
        let currentTVSeries = await redis.get('tvSeries')
        let newTVSeries = JSON.parse(currentTVSeries).concat(tvSeries.data)
        await redis.set('tvSeries', JSON.stringify(newTVSeries))
        return res.status(200).json(tvSeries.data)
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  static update( req, res) {
    axios.put(`http://localhost:3002/tvSeries/${req.params.id}`, {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    })
      .then( async (tvSeries) => {
        // await redis.del('tvSeries')
        const currentTVSeries = await redis.get('tvSeries')
        const fitlerSeries = JSON.parse(currentTVSeries).filter(series => series._id != req.params.id )
        const updatedSeries = fitlerSeries.concat(tvSeries.data)
        await redis.set('tvSeries', JSON.stringify(updatedSeries))
        res.status(200).json(tvSeries.data)
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  static delete (req, res) {
    axios.delete(`http://localhost:3002/tvSeries/${req.params.id}`)
      .then( async (tvSeries) => {
        const currentTVSeries = await redis.get('tvSeries')
        const updatedSeries = JSON.parse(currentTVSeries).filter(series => series._id != req.params.id )
        await redis.set('tvSeries', JSON.stringify(updatedSeries))
        res.status(200).json(tvSeries.data)
      })
      .catch( (error) => {
        console.log(error);
      })
  }
}

module.exports = tvSeriesController