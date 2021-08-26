import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchByTerm from './gql/SearchByTerm.gql'

const App = () => {
  const { data, loading } = useQuery(SearchByTerm, {
    variables: {
      term: 'dinner'
    }
  })

  console.log({ data, loading })
  return (
    <div>Hello world</div>
  )
}

export default App