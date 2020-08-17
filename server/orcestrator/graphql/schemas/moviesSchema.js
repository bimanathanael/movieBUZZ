const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    movies: [Movie]
    movie(_id: String): Movie
  }

  input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addMovie(movie: MovieInput): Movie
    updateMovie(_id: String, movie: MovieInput): Movie
    deleteMovie(_id: String): Movie
  }
`;

const apiMovieUrl = 'http://localhost:3001/movies'

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    movies: async () => {
      const allMoviesRedis = await redis.get("movies")
      try {
        if(allMoviesRedis){
          return JSON.parse(allMoviesRedis)
        } 
        const allMovies = await axios.get(apiMovieUrl)
        await redis.set("movies", JSON.stringify(allMovies.data))
        return allMovies.data
      } catch (error) {
        return error
      }
    },
    movie: async (_,args) => {
      const allMoviesRedis = await redis.get("movies")
      try {
        if(allMoviesRedis){
          const selectedMovie = JSON.parse(allMoviesRedis).filter(movie => movie._id == args._id) 
          return selectedMovie[0]
        } 
        const selectedMovie = await axios.get(`${apiMovieUrl}/${args._id}`)
        return selectedMovie.data
      } catch (error) {
        return error
      }
    },
  },
  Mutation: {
    addMovie: async (_,args) => {
      const movie = await axios.post(apiMovieUrl,args.movie)
      const allMoviesRedis = await redis.get("movies")
      const newData = JSON.parse(allMoviesRedis).concat(movie.data)
      await redis.set("movies", JSON.stringify(newData))
      return movie.data
    },
    updateMovie: async (_,args) => {
      console.log(args._id,'<<<<id')
      console.log(args.movie,'<<<<body')
      const movie = await axios.put(`${apiMovieUrl}/${args._id}`,args.movie)
      const allMoviesRedis = await redis.get('movies')
      const newData = JSON.parse(allMoviesRedis).filter(movie => movie._id != args._id )
      const updateMovie = newData.concat(movie.data)
      await redis.set('movies', JSON.stringify(updateMovie))
      return movie.data
    },
    deleteMovie: async (_, args) => {
      console.log(args._id, 'id')
      const movie = await axios.delete(`${apiMovieUrl}/${args._id}`)
      const allMoviesRedis = await redis.get('movies')
      const newData = JSON.parse(allMoviesRedis).filter(movie => movie._id != args._id )
      await redis.set('movies', JSON.stringify(newData))
      return movie.data
    }
  }
};

module.exports = {typeDefs, resolvers} 