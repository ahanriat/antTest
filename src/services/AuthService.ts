import { createState, useState } from '@hookstate/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sleep } from '~/utils/toolbox'

const ASYNCSTORAGE_AUTH_KEY = 'ASYNCSTORAGE_AUTH_KEY'

const AuthStore = createState<{
  authStatus: 'unauthenticated' | 'loading' | 'authenticated' | 'error'
}>({ authStatus: 'unauthenticated' })

export async function initAuth() {
  const authStatus =
    (await AsyncStorage.getItem(ASYNCSTORAGE_AUTH_KEY)) || 'unauthenticated'
  AuthStore.set({
    authStatus:
      authStatus === 'authenticated' ? 'authenticated' : 'unauthenticated',
  })
}

export async function login(props: { email: string; password: string }) {
  AuthStore.set({
    authStatus: 'loading',
  })
  await sleep(1000) // simulate backend call
  AuthStore.set({
    authStatus: 'authenticated',
  })
  AsyncStorage.setItem(ASYNCSTORAGE_AUTH_KEY, 'authenticated')
}

export async function logout() {
  AuthStore.set({
    authStatus: 'unauthenticated',
  })
  AsyncStorage.setItem(ASYNCSTORAGE_AUTH_KEY, 'unauthenticated')
}

export function useAuth() {
  const { authStatus } = useState(AuthStore)
  return {
    authStatus: authStatus.get(),
    login,
  }
}
