import { ApolloClient, gql } from '@apollo/client'
import { GetAllAntsQuery } from '~/models/__generated__/GetAllAntsQuery'

export function fetchAnts(apolloClient: ApolloClient<object>) {
  return apolloClient.query<GetAllAntsQuery>({ query: GET_ALL_ANTS_QUERY })
}

const GET_ALL_ANTS_QUERY = gql`
  query GetAllAntsQuery {
    ants {
      name
      lengthMillimeters: length
      color
      weightMilligrams: weight
    }
  }
`
