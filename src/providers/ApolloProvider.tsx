import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://guarded-shore-81814.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})

export function ApolloAppProvider(props: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
