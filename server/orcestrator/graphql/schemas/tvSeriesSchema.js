const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type TVSeries {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    allTVSeries: [TVSeries]
    tvSeries(_id: String): TVSeries
  }

  input seriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Mutation {
    addSeries(series: seriesInput): TVSeries
    updateSeries(_id: String, series: seriesInput): TVSeries
    deleteSeries(_id: String): TVSeries
  }
`;

const apiTVSeriesUrl = 'http://localhost:3002/tvSeries'

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    allTVSeries: async () => {
      const allTVSeries = await axios.get(apiTVSeriesUrl)
      console.log(allTVSeries.data, 'allTVSeries.data')
      return allTVSeries.data
    },
    tvSeries: async (_,args) => {
      console.log(args._id, 'args')
      const selectedSeries = await axios.get(`${apiTVSeriesUrl}/${args._id}`)
      return selectedSeries.data
    },
  },
  Mutation: {
    addSeries: async (_,args) => {
      console.log(args.series,'body')
      const series = await axios.post(apiTVSeriesUrl,args.series)
      return series.data
    },
    updateSeries: async (_,args) => {
      console.log(args._id,'<<<<id')
      console.log(args.series,'<<<<body')
      const series = await axios.put(`${apiTVSeriesUrl}/${args._id}`,args.series)
      console.log(series.data)
      return series.data
    },
    deleteSeries: async (_, args) => {
      console.log(args._id, 'id')
      const series = await axios.delete(`${apiTVSeriesUrl}/${args._id}`)
      return series.data
    }
  }
};

module.exports = {typeDefs, resolvers} 