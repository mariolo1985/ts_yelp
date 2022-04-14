import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error"

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  console.warn('headers: ', headers)
  return {
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/graphql',
      authorization: 'Bearer XdBapeJTleh1_IkuUCHxrkX-xupUg9uRTiMOzU2JJ70exGX2ImrqvrwlRq6do_d_ARpo2PfmVRszSZc8hGR8-kZ98oGUvTUrRmcUR0ofTdPk5tXBzB1M5QctRuknYXYx'
    },
  }
})

const errorLink = onError((error) => {
  console.error('Apollo error: ', error)
})

const httpLink = createHttpLink({
  uri: 'https://api.yelp.com/v3/graphql',
  credentials: 'include'
})

const client = new ApolloClient({
  resolvers: {},
  link: from([authLink, errorLink, httpLink]),
  cache,
})

export default client
