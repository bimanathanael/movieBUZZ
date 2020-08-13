const axios = require('axios');
const Redis = require('ioredis')
const redis = new Redis()

class moviesController{
  static async getAll (req, res) {
    const movies = await redis.get('movies')
    if(movies){
      return res.status(200).json(JSON.parse(movies))
    } else {
      axios.get('http://localhost:3001/movies')
        .then( async (allMovie) => {
          await redis.set('movies', JSON.stringify(allMovie.data))
          return res.status(200).json(allMovie.data)
        })
        .catch( (error) => {
          console.log(error);
        })
    }
  }

  static async getOne (req, res) {
    const movies = await redis.get('movies')
    if(movies){
      const result = JSON.parse(movies).filter( item => item._id == req.params.id)
      return res.status(200).json(result[0])
    } else {
      axios.get(`http://localhost:3001/movies/${req.params.id}`)
        .then( (movie) => {
          res.status(200).json(movie.data)
        })
        .catch( (error) => {
          console.log(error);
        })
    }
  }

  static add (req, res) {
    axios.post('http://localhost:3001/movies', {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    })
      .then( async (movie) => {
        // bisa gini
        // await redis.del('movies')
        let currentMovies = await redis.get('movies')
        let newMovie = JSON.parse(currentMovies).concat(movie.data)
        await redis.set('movies', JSON.stringify(newMovie))
        return res.status(200).json(movie.data)
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  static update( req, res) {
    axios.put(`http://localhost:3001/movies/${req.params.id}`, {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    })
      .then( async (movie) => {
        // await redis.del('movies')
        const currentMovies = await redis.get('movies')
        const filterMovies = JSON.parse(currentMovies).filter(movie => movie._id != req.params.id )
        const updatedMovies = filterMovies.concat(movie.data)
        await redis.set('movies', JSON.stringify(updatedMovies))
        res.status(200).json(movie.data)
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  static delete (req, res) {
    axios.delete(`http://localhost:3001/movies/${req.params.id}`)
      .then( async (allMovie) => {
        const currentMovies = await redis.get('movies')
        const updatedMovies = JSON.parse(currentMovies).filter(movie => movie._id != req.params.id )
        await redis.set('movies', JSON.stringify(updatedMovies))
        res.status(200).json(allMovie.data)
      })
      .catch( (error) => {
        console.log(error);
      })
  }
}

module.exports = moviesController