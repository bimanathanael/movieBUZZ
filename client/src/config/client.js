import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4008/',
  cache: new InMemoryCache()
});
