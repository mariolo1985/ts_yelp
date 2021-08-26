import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { ErrorLink } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'

const cache = new InMemoryCache()

// const headerLink = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: 'Bearer XdBapeJTleh1_IkuUCHxrkX-xupUg9uRTiMOzU2JJ70exGX2ImrqvrwlRq6do_d_ARpo2PfmVRszSZc8hGR8-kZ98oGUvTUrRmcUR0ofTdPk5tXBzB1M5QctRuknYXYx'
//     }
//   }))

//   return forward(operation)
// })

const authLink = setContext((_, { headers }) => {
  console.warn('headers: ', headers)
  return {
    headers: {
      ...headers,
      something: 'here',
      Authorization: 'Bearer XdBapeJTleh1_IkuUCHxrkX-xupUg9uRTiMOzU2JJ70exGX2ImrqvrwlRq6do_d_ARpo2PfmVRszSZc8hGR8-kZ98oGUvTUrRmcUR0ofTdPk5tXBzB1M5QctRuknYXYx'
    },
  }
})

const errorLink = new ErrorLink((error) => {
  console.error('Apollo error: ', error)
})

const httpLink = new HttpLink({
  credentials: 'include',
  uri: 'https://api.yelp.com/v3/graphql',
  fetchOptions: {
    mode: 'no-cors'
  }
})

const client = new ApolloClient({
  resolvers: {},
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache,
})

export default client
