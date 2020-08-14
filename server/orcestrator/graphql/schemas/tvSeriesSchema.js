const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

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
      const allSeriesRedis = await redis.get("tvSeries")
      try {
        if(allSeriesRedis){
          return JSON.parse(allSeriesRedis)
        } 
        const allTVSeries = await axios.get(apiTVSeriesUrl)
        await redis.set("tvSeries", JSON.stringify(allTVSeries.data))
        console.log(allTVSeries.data, 'allTVSeries.data')
        return allTVSeries.data
      } catch (error) {
        return error
      }
    },
    tvSeries: async (_,args) => {
      const allSeriesRedis = await redis.get("tvSeries")
      try {
        if(allSeriesRedis){
          console.log(JSON.parse(allSeriesRedis))
          const selectedSeries = JSON.parse(allSeriesRedis).filter(series => series._id == args._id) 
          return selectedSeries[0]
        } 
        console.log(args._id, 'args')
        const selectedSeries = await axios.get(`${apiTVSeriesUrl}/${args._id}`)
        return selectedSeries.data
      } catch (error) {
        return error
      }
    },
  },
  Mutation: {
    addSeries: async (_,args) => {
      console.log(args.series,'body')
      const series = await axios.post(apiTVSeriesUrl,args.series)
      const allSeriesRedis = await redis.get("tvSeries")
      const newData = JSON.parse(allSeriesRedis).concat(series.data)
      await redis.set("tvSeries", JSON.stringify(newData))
      return series.data
    },
    updateSeries: async (_,args) => {
      console.log(args._id,'<<<<id')
      console.log(args.series,'<<<<body')
      const series = await axios.put(`${apiTVSeriesUrl}/${args._id}`,args.series)
      const allSeriesRedis = await redis.get('tvSeries')
      const newData = JSON.parse(allSeriesRedis).filter(series => series._id != args._id )
      const updatedSeries = newData.concat(series.data)
      await redis.set('tvSeries', JSON.stringify(updatedSeries))
      console.log(series.data)
      return series.data
    },
    deleteSeries: async (_, args) => {
      console.log(args._id, 'id')
      const series = await axios.delete(`${apiTVSeriesUrl}/${args._id}`)
      const allSeriesRedis = await redis.get('tvSeries')
      const newData = JSON.parse(allSeriesRedis).filter(series => series._id != args._id )
      await redis.set('tvSeries', JSON.stringify(newData))
      return series.data
    }
  }
};

module.exports = {typeDefs, resolvers} 