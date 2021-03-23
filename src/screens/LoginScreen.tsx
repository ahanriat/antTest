import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import RiseAnimation from '~/components/animations/RiseAnimation'
import ButtonPrimary from '~/components/buttons/ButtonPrimary'
import EmailInput, { isEmailValid } from '~/components/inputs/EmailInput'
import PasswordInput, {
  isPasswordValid,
} from '~/components/inputs/PasswordInput'
import CenterView from '~/components/layout/CenterView'
import KeyboardView from '~/components/layout/KeyboardView'
import MaxWidth from '~/components/layout/MaxWidth'
import { Body, H1 } from '~/components/typography/Texts'
import { useAuth } from '~/services/AuthService'

export default function LoginScreen() {
  const { reset } = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, authStatus } = useAuth()
  const passwordRef = useRef<any>()

  useEffect(() => {
    if (authStatus === 'authenticated') {
      reset({ index: 0, routes: [{ name: 'HomeScreen' }] })
    }
  }, [authStatus])

  const canLogin =
    isEmailValid(email) && isPasswordValid(password) && authStatus !== 'loading'

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
          }}>
          <CenterView>
            <RiseAnimation>
              <H1>Login</H1>
              <Body>Enter any email / password</Body>
            </RiseAnimation>
          </CenterView>
          <MaxWidth>
            <EmailInput
              style={{ marginBottom: 20 }}
              onChangeText={setEmail}
              autoFocus={true}
              onSubmitEditing={() => {
                passwordRef.current?.focus?.()
              }}
            />
            <PasswordInput
              ref={passwordRef}
              onChangeText={setPassword}
              style={{ marginBottom: 20 }}
              onSubmitEditing={() => canLogin && login({ email, password })}
            />
            <ButtonPrimary
              label={authStatus === 'loading' ? 'Almost there' : 'Login'}
              onPress={() => canLogin && login({ email, password })}
              disabled={!canLogin}
              style={{ marginBottom: 12 }}
            />
          </MaxWidth>
        </View>
      </KeyboardView>
    </SafeAreaView>
  )
}
