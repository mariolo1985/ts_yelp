import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import client from './apollo/ApolloClient'

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('app')
)