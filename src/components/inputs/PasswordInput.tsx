import React, { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

interface PasswordInputProps extends TextInputProps {}

const PasswordInput = forwardRef((props: PasswordInputProps, ref: any) => {
  return (
    <TextInput
      {...props}
      style={[{ fontSize: 18 }, props.style]}
      ref={ref}
      textContentType={'password'}
      clearButtonMode="never"
      placeholder={'******'}
      secureTextEntry={true}
    />
  )
})

export default PasswordInput

export function isPasswordValid(password: string) {
  return password.length > 4
}
