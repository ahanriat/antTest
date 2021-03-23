import React from 'react'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '~/screens/LoginScreen'
import HomeScreen from '~/screens/HomeScreen'
import { useAuth } from '~/services/AuthService'

export type RootStackParamList = {
  HomeScreen: {}
  LoginScreen: {}
}

type ScreenName = keyof RootStackParamList

export function useNavigate() {
  return useNavigation().navigate as <T extends ScreenName>(
    screenName: T,
    params: RootStackParamList[T],
  ) => void
}

const Stack = createStackNavigator<RootStackParamList>()

export default function AppRootNavigator() {
  const { authStatus } = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          authStatus === 'authenticated' ? 'HomeScreen' : 'LoginScreen'
        }>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
