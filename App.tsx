import React from 'react'
import { ApolloAppProvider } from './src/providers/ApolloProvider'
import { AppInitProvider } from './src/providers/AppInitProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppRootNavigator from '~/navigation/AppRootNavigator'

export default function App() {
  return (
    <ApolloAppProvider>
      <SafeAreaProvider>
        <AppInitProvider>
          <AppRootNavigator />
        </AppInitProvider>
      </SafeAreaProvider>
    </ApolloAppProvider>
  )
}
