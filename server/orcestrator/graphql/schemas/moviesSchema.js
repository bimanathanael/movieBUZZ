const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

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
      const allMovies = await axios.get(apiMovieUrl)
      console.log(allMovies.data, 'allMovies.data')
      return allMovies.data
    },
    movie: async (_,args) => {
      console.log(args._id, 'args')
      const selectedMovie = await axios.get(`${apiMovieUrl}/${args._id}`)
      return selectedMovie.data
    },
  },
  Mutation: {
    addMovie: async (_,args) => {
      console.log(args.movie,'body')
      const movie = await axios.post(apiMovieUrl,args.movie)
      return movie.data
    },
    updateMovie: async (_,args) => {
      console.log(args._id,'<<<<id')
      console.log(args.movie,'<<<<body')
      const movie = await axios.put(`${apiMovieUrl}/${args._id}`,args.movie)
      return movie.data
    },
    deleteMovie: async (_, args) => {
      console.log(args._id, 'id')
      const movie = await axios.delete(`${apiMovieUrl}/${args._id}`)
      return movie.data
    }
  }
};

module.exports = {typeDefs, resolvers} 