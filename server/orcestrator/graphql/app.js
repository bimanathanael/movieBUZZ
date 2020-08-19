const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const moviesSchema = require('./schemas/moviesSchema')
const tvSeriesSchema = require('./schemas/tvSeriesSchema')
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const typeDefs = gql`
   type Query

   type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, moviesSchema.typeDefs, tvSeriesSchema.typeDefs],
  resolvers: [moviesSchema.resolvers, tvSeriesSchema.resolvers],
})

const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen(4008).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});